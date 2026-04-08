# CLI Development in Go

## Cobra: Command Structure

```go
// RIGHT: structured command hierarchy
var rootCmd = &cobra.Command{
    Use:   "myapp",
    Short: "My application",
    PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
        return initConfig() // runs before all subcommands
    },
}

var serveCmd = &cobra.Command{
    Use:   "serve",
    Short: "Start the server",
    Args:  cobra.NoArgs, // validates no positional args
    RunE: func(cmd *cobra.Command, args []string) error {
        port, _ := cmd.Flags().GetInt("port")
        return startServer(port)
    },
}

func init() {
    // Persistent flags: inherited by subcommands
    rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file path")

    // Local flags: only for this command
    serveCmd.Flags().IntP("port", "p", 8080, "server port")
    serveCmd.Flags().String("host", "localhost", "server host")

    // Required flags
    serveCmd.MarkFlagRequired("port") // error if missing

    rootCmd.AddCommand(serveCmd)
}
```

### Args Validators

| Validator | Behavior |
|-----------|----------|
| `cobra.NoArgs` | Error if any args |
| `cobra.ExactArgs(n)` | Exactly n args |
| `cobra.MinimumNArgs(n)` | At least n args |
| `cobra.MaximumNArgs(n)` | At most n args |
| `cobra.RangeArgs(min, max)` | Between min and max |

### Shell Completions

```go
// Generate completions
rootCmd.GenBashCompletionFile("completions.bash")
rootCmd.GenZshCompletionFile("completions.zsh")

// Dynamic completion for flag values
cmd.RegisterFlagCompletionFunc("output", func(cmd *cobra.Command, args []string, toComplete string) ([]string, cobra.ShellCompDirective) {
    return []string{"json", "yaml", "table"}, cobra.ShellCompDirectiveNoFileComp
})
```

## Viper: Configuration

```go
func initConfig() error {
    if cfgFile != "" {
        viper.SetConfigFile(cfgFile)
    } else {
        viper.SetConfigName("config")        // config.yaml, config.json, etc.
        viper.SetConfigType("yaml")
        viper.AddConfigPath(".")
        viper.AddConfigPath("$HOME/.myapp")
    }

    viper.SetEnvPrefix("MYAPP")              // MYAPP_PORT, MYAPP_HOST
    viper.AutomaticEnv()
    viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_")) // db.host -> MYAPP_DB_HOST

    if err := viper.ReadInConfig(); err != nil {
        if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
            return err
        }
    }
    return nil
}

// Bind cobra flag to viper
viper.BindPFlag("port", serveCmd.Flags().Lookup("port"))
```

**Priority order** (highest to lowest): explicit Set > flag > env > config > key/value store > default.

```go
// WRONG: viper keys are case-insensitive
viper.Set("MyKey", "value")
viper.GetString("mykey") // returns "value" -- keys lowercased internally

// RIGHT: always use lowercase keys
viper.Set("mykey", "value")
```

## Standard flag Package

Use when Cobra is overkill (single-command tools, scripts).

```go
func main() {
    port := flag.Int("port", 8080, "server port")
    verbose := flag.Bool("v", false, "verbose output")
    flag.Parse() // MUST call -- without this, all flags have zero values

    // WRONG: forgetting flag.Parse()
    // port will always be 8080, -port=9090 silently ignored
}
```

## Bubbletea: TUI Framework

```go
// Model-Update-View pattern
type model struct {
    choices  []string
    cursor   int
    selected map[int]struct{}
}

func (m model) Init() tea.Cmd { return nil }

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.KeyMsg:
        switch msg.String() {
        case "q", "ctrl+c":
            return m, tea.Quit
        case "up", "k":
            if m.cursor > 0 { m.cursor-- }
        case "down", "j":
            if m.cursor < len(m.choices)-1 { m.cursor++ }
        case "enter", " ":
            if _, ok := m.selected[m.cursor]; ok {
                delete(m.selected, m.cursor)
            } else {
                m.selected[m.cursor] = struct{}{}
            }
        }
    }
    return m, nil
}

func (m model) View() string {
    s := "Select items:\n\n"
    for i, choice := range m.choices {
        cursor := " "
        if m.cursor == i { cursor = ">" }
        checked := " "
        if _, ok := m.selected[i]; ok { checked = "x" }
        s += fmt.Sprintf("%s [%s] %s\n", cursor, checked, choice)
    }
    return s + "\nq to quit\n"
}
```

## Charm Libraries

```go
// lipgloss: styling
var style = lipgloss.NewStyle().
    Bold(true).
    Foreground(lipgloss.Color("#FF6600")).
    Border(lipgloss.RoundedBorder()).
    Padding(0, 1)

fmt.Println(style.Render("styled text"))

// huh: interactive forms
form := huh.NewForm(
    huh.NewGroup(
        huh.NewInput().Title("Name").Value(&name),
        huh.NewSelect[string]().Title("Role").
            Options(huh.NewOption("Admin", "admin"), huh.NewOption("User", "user")).
            Value(&role),
        huh.NewConfirm().Title("Continue?").Value(&confirm),
    ),
)
if err := form.Run(); err != nil { log.Fatal(err) }
```

## Output Formatting

```go
// Table output with tabwriter
w := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', 0)
fmt.Fprintln(w, "NAME\tSTATUS\tAGE")
fmt.Fprintln(w, "web-1\tRunning\t3d")
fmt.Fprintln(w, "web-2\tStopped\t1h")
w.Flush()

// JSON output
enc := json.NewEncoder(os.Stdout)
enc.SetIndent("", "  ")
enc.Encode(data)

// Conditional formatting
if isTerminal(os.Stdout) {
    printColorized(data)
} else {
    printPlain(data) // piped output: no ANSI codes
}
```

## Exit Codes & Signal Handling

```go
// Convention: 0=success, 1=general error, 2=usage error
func main() {
    if err := rootCmd.Execute(); err != nil {
        os.Exit(1)
    }
}

// Signal handling for cleanup
func run() error {
    ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
    defer stop()

    srv := startServer()
    <-ctx.Done()
    // graceful shutdown
    shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    return srv.Shutdown(shutdownCtx)
}
```

## Common Pitfalls

| Pitfall | Error/Symptom | Fix |
|---------|---------------|-----|
| Missing `flag.Parse()` | Flags always default values | Call `flag.Parse()` before reading |
| Viper case sensitivity | Key not found | Use lowercase keys consistently |
| Cobra command `Use` with spaces | Subcommand not matched | `Use` first word is command name |
| No `RunE` on parent cmd | `myapp` does nothing | Add `RunE` or set `rootCmd.Run` |
| Raw `os.Exit` in defer chain | Defers skipped | Return error, exit in `main()` only |
