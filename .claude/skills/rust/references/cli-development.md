# CLI Development in Rust

## Clap v4 Derive API

```rust
use clap::{Parser, Subcommand, Args, ValueEnum};

#[derive(Parser)]
#[command(name = "mytool", version, about = "A CLI tool")]
struct Cli {
    /// Config file path
    #[arg(short, long, default_value = "config.toml")]
    config: String,

    /// Verbosity level (-v, -vv, -vvv)
    #[arg(short, long, action = clap::ArgAction::Count)]
    verbose: u8,

    /// Read from env var
    #[arg(long, env = "MY_API_KEY")]
    api_key: Option<String>,

    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Deploy the application
    Deploy(DeployArgs),
    /// Show status
    Status {
        #[arg(short, long)]
        json: bool,
    },
}

#[derive(Args)]
struct DeployArgs {
    /// Target environment
    #[arg(value_enum)]
    env: Environment,
}

#[derive(Clone, ValueEnum)]
enum Environment {
    Dev,
    Staging,
    Prod,
}
```

### Global Args vs Subcommand Args

```rust
// WRONG: global arg not propagated
#[derive(Parser)]
struct Cli {
    #[arg(long)]
    verbose: bool,       // only works BEFORE subcommand
    #[command(subcommand)]
    cmd: Cmd,
}

// RIGHT: use global = true
#[derive(Parser)]
struct Cli {
    #[arg(long, global = true)]
    verbose: bool,       // works before OR after subcommand
    #[command(subcommand)]
    cmd: Cmd,
}
```

## Shell Completions (clap_complete)

```rust
use clap_complete::{generate, Shell};

fn print_completions(shell: Shell, cmd: &mut clap::Command) {
    generate(shell, cmd, cmd.get_name().to_string(), &mut std::io::stdout());
}

// In main or a `completions` subcommand:
let mut cmd = Cli::command();
print_completions(Shell::Bash, &mut cmd);
```

## dialoguer - Interactive Prompts

```rust
use dialoguer::{Confirm, Input, Select, MultiSelect, Password};

// Confirmation
let proceed = Confirm::new().with_prompt("Continue?").default(true).interact()?;

// Text input with validation
let port: u16 = Input::new()
    .with_prompt("Port")
    .default(8080)
    .validate_with(|input: &u16| {
        if *input > 1024 { Ok(()) } else { Err("Must be > 1024") }
    })
    .interact_text()?;

// Selection
let options = &["Dev", "Staging", "Prod"];
let selection = Select::new().with_prompt("Environment").items(options).default(0).interact()?;

// Multi-select
let chosen = MultiSelect::new().with_prompt("Features").items(options).interact()?;

// Password
let pass = Password::new().with_prompt("Password").with_confirmation("Confirm", "Mismatch").interact()?;
```

## indicatif - Progress Bars

```rust
use indicatif::{ProgressBar, ProgressStyle, MultiProgress};

// Simple progress bar
let pb = ProgressBar::new(100);
pb.set_style(ProgressStyle::default_bar()
    .template("{spinner:.green} [{bar:40.cyan/blue}] {pos}/{len} ({eta})")
    .unwrap()
    .progress_chars("#>-"));
for _ in 0..100 { pb.inc(1); }
pb.finish_with_message("done");

// Spinner for indeterminate work
let sp = ProgressBar::new_spinner();
sp.set_message("Loading...");
sp.enable_steady_tick(std::time::Duration::from_millis(100));
// ... work ...
sp.finish_with_message("Complete");

// Multiple parallel progress bars
let mp = MultiProgress::new();
let pb1 = mp.add(ProgressBar::new(50));
let pb2 = mp.add(ProgressBar::new(100));
```

## console - Terminal Colors and Styling

```rust
use console::{style, Term, Emoji};

println!("{} Processing...", style("INFO").green().bold());
println!("{} Something failed", style("ERROR").red().bold());
println!("{} {}", Emoji("✅", "[OK]"), style("Done").green());

let term = Term::stdout();
term.clear_screen()?;
term.write_line("Hello")?;
```

## Config Management

### figment (multi-source, used by Rocket)

```rust
use figment::{Figment, providers::{Format, Toml, Env, Serialized}};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct Config {
    port: u16,
    host: String,
    debug: bool,
}

impl Default for Config {
    fn default() -> Self { Self { port: 8080, host: "localhost".into(), debug: false } }
}

// Layers: defaults < config file < env vars (higher = higher priority)
let config: Config = Figment::new()
    .merge(Serialized::defaults(Config::default()))
    .merge(Toml::file("config.toml"))
    .merge(Env::prefixed("APP_"))
    .extract()?;
```

## Output Formatting

### Tables with tabled

```rust
use tabled::{Table, Tabled};

#[derive(Tabled)]
struct Server {
    name: String,
    status: String,
    uptime: String,
}

let data = vec![
    Server { name: "web-1".into(), status: "running".into(), uptime: "3d".into() },
];
println!("{}", Table::new(data));
```

### JSON output pattern

```rust
if args.json {
    println!("{}", serde_json::to_string_pretty(&result)?);
} else {
    println!("{}", Table::new(&result));
}
```

## Exit Code Conventions

| Code | Meaning | Usage |
|------|---------|-------|
| `0` | Success | Normal completion |
| `1` | General error | Runtime failures |
| `2` | Usage error | Invalid args, bad input |
| `130` | SIGINT | Ctrl+C interrupted |

```rust
use std::process::ExitCode;

fn main() -> ExitCode {
    match run() {
        Ok(_) => ExitCode::SUCCESS,
        Err(e) if e.is_usage_error() => ExitCode::from(2),
        Err(_) => ExitCode::FAILURE,
    }
}
```

## Signal Handling

```rust
// Simple: ctrlc crate
ctrlc::set_handler(move || {
    eprintln!("\nInterrupted, cleaning up...");
    std::process::exit(130);
})?;

// Async: tokio::signal
use tokio::signal;

tokio::select! {
    result = server.run() => result?,
    _ = signal::ctrl_c() => {
        eprintln!("Shutting down...");
    }
}
```

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Using builder API when derive is cleaner | Prefer `#[derive(Parser)]` for most CLIs |
| Missing required arg shows generic error | Add `#[arg(required = true)]` or use non-Option type |
| `#[arg(long)]` on `is_verbose: bool` | Creates `--is-verbose`; rename field or use `#[arg(long = "verbose")]` |
| Forgetting `#[command(subcommand)]` | Subcommands won't be recognized; clap silently ignores |
| Blocking stdin in piped context | Check `atty::is(Stream::Stdin)` before interactive prompts |
| Progress bar garbles output when piped | Use `ProgressBar::hidden()` when not a TTY |
