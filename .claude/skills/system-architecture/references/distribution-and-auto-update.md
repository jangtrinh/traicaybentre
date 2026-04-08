# Distribution and Auto-Update

## Build Targets

| OS | Format | Use Case | Tool |
|----|--------|----------|------|
| macOS | `.dmg` | Standard distribution, drag-to-install | `tauri build` |
| macOS | `.pkg` | Enterprise/MDM deployment | `pkgbuild` |
| macOS | `.app` (in .tar.gz) | Auto-updater payload | `tauri build` |
| Windows | `.exe` (NSIS) | Standard installer, fast builds | `tauri build` |
| Windows | `.msi` (WiX) | Enterprise/GPO deployment | `tauri build --bundles msi` |
| Linux | `.AppImage` | Universal, no install required | `tauri build` |
| Linux | `.deb` | Debian/Ubuntu repos | `tauri build` |
| Linux | `.rpm` | Fedora/RHEL repos | `tauri build --bundles rpm` |
| Linux | Flatpak | Sandboxed, cross-distro | Manual config |
| Linux | Snap | Ubuntu-centric, auto-update | Manual config |

### Format Decision Tree
```
Enterprise deployment? -> MSI (Windows) / PKG (macOS)
Broad Linux compat?    -> AppImage
Distro package repo?   -> deb + rpm
Simple user install?   -> DMG (macOS) / NSIS (Windows)
```

---

## Code Signing

### macOS

| Step | What | Required? |
|------|------|-----------|
| Developer ID cert | Signs the binary | Yes, for distribution outside App Store |
| Hardened Runtime | Enables security protections | Yes, required for notarization |
| Notarization | Apple scans binary server-side | Yes, mandatory since macOS 10.15 |
| Stapling | Attaches notarization ticket to binary | Yes, for offline verification |

**Process:**
1. Build with `codesign --sign "Developer ID Application: ..."` and `--options runtime`
2. Submit to `notarytool submit`
3. Wait for approval (seconds to minutes; can timeout)
4. Staple with `xcrun stapler staple`

**Failure modes:**
- Notarization rejects unsigned dylibs inside bundle -- sign every binary including sidecars
- Hardened Runtime blocks JIT -- add entitlement if needed
- CI timeout -- use `--wait` with timeout flag, retry on failure

### Windows

| Aspect | Details |
|--------|---------|
| Certificate type | EV (Extended Validation) recommended; OV works but SmartScreen warns |
| HSM requirement | EV certs now require hardware security module (cloud HSM like Azure SignTool) |
| SmartScreen | Reputation-based; new certs trigger warnings until reputation builds |
| Timestamp | Always timestamp signatures (RFC 3161) to survive cert expiry |

**Process:**
1. Obtain EV cert from CA (DigiCert, Sectigo, etc.)
2. Sign with `signtool sign /fd SHA256 /tr http://timestamp.digicert.com /td SHA256`
3. Or use `AzureSignTool` for cloud HSM signing in CI

**Failure modes:**
- HSM connection fails in CI -- retry with backoff, have fallback signing server
- SmartScreen blocks new cert -- submit for manual review, or wait for reputation
- Unsigned installer -- Windows Defender may quarantine

### Linux

| Aspect | Details |
|--------|---------|
| OS enforcement | None. No signing required. |
| AppImage signing | Optional GPG signing via `--sign` |
| Package repos | deb/rpm repos can be GPG signed |
| User trust | Users expect checksums (SHA256) at minimum |

---

## Auto-Updater Architecture

### Tauri Updater Plugin Flow

```
App starts -> Check update endpoint -> Compare versions
  -> No update: done
  -> Update available:
     1. Download signed archive from URL in manifest
     2. Verify signature against embedded public key
     3. Extract and replace binary
     4. Prompt restart (or auto-restart)
```

### Update Manifest (JSON)

```json
{
  "version": "1.2.0",
  "notes": "Bug fixes and performance improvements",
  "pub_date": "2026-03-29T00:00:00Z",
  "platforms": {
    "darwin-aarch64": {
      "url": "https://releases.example.com/app-1.2.0-aarch64.tar.gz",
      "signature": "base64-encoded-signature"
    },
    "darwin-x86_64": { "url": "...", "signature": "..." },
    "linux-x86_64": { "url": "...", "signature": "..." },
    "windows-x86_64": { "url": "...", "signature": "..." }
  }
}
```

**Key rules:**
- MUST sign update payloads with Tauri's key pair (separate from OS code signing)
- MUST serve manifest over HTTPS
- MUST include all platform targets in manifest

### Delta Updates

| Strategy | Pros | Cons |
|----------|------|------|
| Full binary | Simple, reliable | Large download |
| Binary diff (bsdiff) | Small download (~10-30% of full) | Complex build pipeline |
| Component update | Only changed DLLs/dylibs | High complexity |

**Recommendation:** Start with full binary. Add delta only if update size causes user complaints.

---

## Update Strategies

| Strategy | When | Risk |
|----------|------|------|
| Background download + prompt | Default for most apps | User ignores prompt |
| Silent update on quit | Non-critical updates | Longer shutdown |
| Forced update | Security patches, breaking API | User frustration |
| Staged rollout (1% -> 10% -> 100%) | High-risk updates | Complexity in manifest server |

### Decision Matrix

```
Security fix?         -> Forced update
Breaking backend API? -> Forced update with grace period
Normal release?       -> Background download + prompt
High-risk change?     -> Staged rollout
```

---

## CI/CD Pipeline

### GitHub Actions + tauri-action

**Matrix build configuration:**

| Target | Runner | Rust Target Triple |
|--------|--------|--------------------|
| macOS ARM | `macos-latest` (M-series) | `aarch64-apple-darwin` |
| macOS Intel | `macos-13` | `x86_64-apple-darwin` |
| Windows x64 | `windows-latest` | `x86_64-pc-windows-msvc` |
| Linux x64 | `ubuntu-22.04` | `x86_64-unknown-linux-gnu` |

### Sidecar Compilation

Sidecars (bundled binaries like Python, Node scripts compiled with PyInstaller/pkg) must be pre-built per target:

```
Pre-build step per platform:
1. Compile sidecar for target triple
2. Place in src-tauri/binaries/sidecar-{target-triple}[.exe]
3. Tauri bundles correct sidecar automatically
```

**Failure mode:** Sidecar compiled on wrong architecture -- binary crashes at runtime. Always cross-compile or build in CI matrix.

### Pipeline Stages
```
1. Lint + Test (all platforms in parallel)
2. Build sidecar per platform
3. Build Tauri app per platform (signs + notarizes)
4. Upload artifacts to release
5. Update manifest endpoint
6. Smoke test: download and verify on each platform
```

---

## Distribution Channels

| Channel | Pros | Cons |
|---------|------|------|
| GitHub Releases | Free, integrated with CI | No analytics, manual manifest |
| CrabNebula Cloud | Tauri-native, auto-manifest, analytics | Paid service |
| Custom update server | Full control | Build and maintain yourself |
| Mac App Store | Discovery, trust | Sandbox restrictions, 30% cut, review delays |
| Microsoft Store | Discovery, auto-update | MSIX packaging, review process |

---

## Versioning Strategy

| Component | Format | Example |
|-----------|--------|---------|
| Release version | semver | `1.2.3` |
| Build metadata | semver+meta | `1.2.3+build.456` |
| Pre-release | semver-pre | `1.3.0-beta.1` |
| Channel | label | `stable`, `beta`, `nightly` |

**Rule:** Cargo.toml version, tauri.conf.json version, and package.json version must stay in sync. Automate with a release script.

---

## Rollback Strategy

| Approach | Implementation | Limitation |
|----------|---------------|------------|
| Keep previous version | Rename old binary before update | Disk space |
| Auto-rollback on crash | Detect repeated crash-on-start, revert | Must define crash threshold |
| Manual rollback | User downloads previous version | Requires hosted archive |
| Version pinning | User opts out of auto-update | Misses security patches |

**Recommended:** Keep N-1 version. If app crashes 3 times within 60s of update, auto-revert and report.

---

## Size Optimization

| Technique | Savings | Risk |
|-----------|---------|------|
| Strip debug symbols | 30-50% | No stack traces in crash reports |
| `opt-level = "s"` (size) | 10-20% | Slight perf decrease |
| Disable unused Tauri features | Varies | Must audit feature flags |
| UPX compression | 50-70% | Some antivirus flag UPX; macOS notarization fails |
| `codegen-units = 1` + LTO | 10-20% | Slower build |

**Warning:** Do NOT use UPX on macOS (breaks notarization) or on Windows (antivirus false positives). Use only for Linux if needed.

---

## Common Pitfalls

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Unsigned binary on macOS | "App is damaged" dialog | Sign + notarize in CI |
| Notarization timeout | CI job hangs/fails | Add timeout + retry logic |
| WebView2 missing on Windows | White screen or crash | Bundle Evergreen bootstrapper |
| Auto-updater URL change | Updates silently stop | Version the URL schema; old clients must reach new endpoint |
| Manifest not updated | Users stuck on old version | Automate manifest generation in CI |
| Cross-platform line endings | Signature verification fails | Normalize in build script |
| Sidecar wrong platform | Crash on start | CI matrix builds each target triple |
