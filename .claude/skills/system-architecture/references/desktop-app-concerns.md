# Desktop App Architecture Concerns

## Native OS Integration

### File System Access

| Scope | API | Security |
|-------|-----|----------|
| App data dir | `app_data_dir()` | Always safe |
| App config dir | `app_config_dir()` | Always safe |
| User-selected paths | File dialog / drag-drop | Scoped access |
| Arbitrary paths | Requires `fs` scope in allowlist | Security risk |

**Rule:** Never request broad FS access. Use scoped paths. Let the user pick via native dialogs.

### Clipboard, Notifications, Shortcuts

| Feature | macOS | Windows | Linux |
|---------|-------|---------|-------|
| Clipboard | Full support | Full support | X11: xclip; Wayland: wl-copy |
| Notifications | Notification Center | Action Center | libnotify (varies by DE) |
| Global shortcuts | Works, needs accessibility permission | Works | X11: works; Wayland: broken |
| Deep links | URL scheme via Info.plist | Registry-based | .desktop file handler |

**Failure mode:** Global shortcuts silently fail on macOS without accessibility permission. Detect and prompt user.

---

## Tray Icon

| OS | Behavior | Pitfall |
|----|----------|---------|
| macOS | Menu bar icon (top-right). Template images for dark/light mode. | Non-template icons look wrong in dark mode |
| Windows | System tray (bottom-right). Supports balloon notifications. | Icon hidden by default in overflow area |
| Linux | AppIndicator (Ubuntu/GNOME), StatusNotifier (KDE). | No universal standard. Some DEs have no tray support at all |

**Decision:** Tray icon should be optional, not required for core functionality.

---

## Auto-Start (Launch on Login)

| OS | Mechanism | Notes |
|----|-----------|-------|
| macOS | Login Items via SMAppService (modern) or LaunchAgent plist | App Sandbox requires SMAppService API |
| Windows | Registry `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | Antivirus may flag registry writes |
| Linux | `~/.config/autostart/app.desktop` file | XDG spec, works on most DEs |

**Failure mode:** Auto-start entry persists after uninstall. Include cleanup in uninstaller.

---

## Single Instance

**Pattern:** Attempt to bind a local socket/named pipe on startup. If bind fails, another instance is running -- send argv to existing instance and exit.

| Approach | Pros | Cons |
|----------|------|------|
| Lock file | Simple | Stale lock after crash |
| Named pipe/socket | Reliable, allows IPC | More code |
| Tauri single-instance plugin | Built-in | Plugin dependency |

**Recommendation:** Use Tauri single-instance plugin. It handles deep link forwarding automatically.

---

## Window Management

| Feature | When to Use | Pitfall |
|---------|-------------|---------|
| Frameless window | Custom titlebar design | Must implement drag region, window controls manually |
| Always-on-top | Floating widgets, PiP | User annoyance if overused |
| Transparent window | Overlays, widgets | Performance cost; Linux Wayland support spotty |
| Multi-window | Detachable panels | Shared state sync complexity; use event bus |

**Failure mode:** Frameless windows lose native resize/minimize on some Linux WMs. Always provide keyboard alternatives.

---

## File Handling

### Drag-and-Drop
- Register drop zone in webview via HTML5 drag events
- Tauri provides `tauri://file-drop` event for native file drops
- Validate file type/size before processing

### File Associations
| OS | Registration | Notes |
|----|-------------|-------|
| macOS | `Info.plist` UTI declarations | Requires notarized app |
| Windows | NSIS/WiX registry entries | Need ProgId registration |
| Linux | `.desktop` file MimeType field | `update-desktop-database` after install |

---

## Native Dialogs

```
Decision: Native dialog vs custom UI?
- File open/save -> ALWAYS native (trust, accessibility, OS integration)
- Confirmation -> Native for destructive actions, custom for inline
- Directory picker -> ALWAYS native
- Complex forms -> Custom UI
```

---

## Persistent Storage

### Per-OS Paths

| Directory | macOS | Windows | Linux |
|-----------|-------|---------|-------|
| App data | `~/Library/Application Support/{app}` | `%APPDATA%\{app}` | `~/.local/share/{app}` |
| Config | `~/Library/Application Support/{app}` | `%APPDATA%\{app}` | `~/.config/{app}` |
| Cache | `~/Library/Caches/{app}` | `%LOCALAPPDATA%\{app}\cache` | `~/.cache/{app}` |
| Logs | `~/Library/Logs/{app}` | `%LOCALAPPDATA%\{app}\logs` | `~/.local/share/{app}/logs` |

**Rule:** Always use Tauri path resolver APIs. Never hardcode paths.

**Failure mode:** App data lost on update if stored in app bundle directory (macOS) or install dir (Windows).

---

## Keyboard Shortcuts

| Convention | macOS | Windows/Linux |
|------------|-------|---------------|
| Copy | Cmd+C | Ctrl+C |
| Quit | Cmd+Q | Alt+F4 |
| Preferences | Cmd+, | Ctrl+, (no standard) |
| Undo | Cmd+Z | Ctrl+Z |

**Implementation:** Abstract modifier key. Map `CmdOrCtrl` at runtime. Tauri accelerators support this.

**Global vs Local:**
- **Global:** Registered with OS. Works when app is not focused. Use sparingly (media keys, quick capture).
- **Local:** Only when app window is focused. Preferred for most shortcuts.

---

## Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Screen reader | Semantic HTML, ARIA labels, live regions |
| Keyboard nav | Visible focus indicators, tab order, skip links |
| High contrast | Respect `prefers-contrast` media query |
| Reduced motion | Respect `prefers-reduced-motion` |
| Font scaling | Use relative units (rem), test at 200% zoom |

**Failure mode:** Custom titlebar breaks screen reader if not properly labeled with ARIA roles.

---

## Desktop vs Web Behavior Differences

| Behavior | Web | Desktop |
|----------|-----|---------|
| Back button | Browser history | No concept; must implement or omit |
| Right-click | Browser context menu | Must build custom or disable |
| Text selection | Default on | Often disabled in app UI, enabled in content |
| Scroll | Overscroll bounce (mobile) | Native scroll behavior |
| Focus | Tab between page elements | Window-level focus matters |
| Links | Open in same/new tab | Must intercept, open in default browser |

---

## Per-OS Quirks

### macOS
- **Notarization:** Mandatory for distribution outside App Store. Async process, can timeout.
- **App Sandbox:** Required for App Store. Limits FS access, network, hardware.
- **Universal Binary:** Build for both `aarch64-apple-darwin` and `x86_64-apple-darwin`. Use `lipo` to combine.
- **Quirk:** App nap can throttle background work. Use `NSProcessInfo` to prevent.

### Windows
- **WebView2:** Based on Edge. Runtime must be present. Use Evergreen bootstrapper for install.
- **NSIS vs WiX:** NSIS = simpler, faster builds. WiX = MSI format, GPO-friendly enterprise deployment.
- **SmartScreen:** Unsigned or new apps trigger warning. EV cert + reputation reduces this.
- **Quirk:** DPI scaling varies per monitor. Test multi-monitor setups.

### Linux
- **Distro fragmentation:** Test on Ubuntu (GNOME), Fedora (GNOME), Arch (varies), KDE-based.
- **Wayland vs X11:** Global shortcuts, screen capture, window positioning differ or break.
- **WebKitGTK:** Tauri uses WebKitGTK on Linux. Version varies by distro. Ubuntu 22.04 ships older version.
- **Quirk:** No single packaging format works everywhere. Ship AppImage for broad compat, deb/rpm for repos.

### OS Quirk Decision Matrix

| Issue | Impact | Mitigation |
|-------|--------|------------|
| macOS notarization timeout | Blocks release | Retry logic in CI, cache notarization |
| Windows WebView2 missing | App won't start | Bundle Evergreen bootstrapper |
| Linux WebKitGTK old | Missing web features | Document minimum version, degrade gracefully |
| Wayland global shortcuts | Feature broken | Detect Wayland, disable feature with explanation |
