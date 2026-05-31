# Terminal Portfolio (CLI App)

This package contains the command-line interface (CLI) version of my portfolio. As a systems engineer who spends 100% of my time in Vim and terminal workflows, I built this interface for users who prefer `tty` over graphical operating systems.

Instead of a standard local script, this application is wrapped in a custom SSH server, allowing anyone to securely interact with the TUI without installing any dependencies or using a web browser.

---

## Design Philosophy & Architecture

While the web app focuses on graphical UI/UX laws, the CLI app focuses on Developer Experience (DX), performance, and state management.

- **Keyboard-First:** Navigate through experience, projects, and skills entirely without a mouse using standard arrow keys or Vim bindings (`j`/`k`).
- **Green Phosphor Aesthetic:** A meticulously styled TUI referencing classic CRT mainframes using custom Lip Gloss rendering.
- **Stateful MVU:** Implements the strict Model-View-Update pattern (The Elm Architecture) to handle complex UI states and routing without DOM manipulation.
- **Concurrent Networking:** Uses Go's Goroutines to handle multiple simultaneous SSH connections without blocking the main UI thread.

---

## Technical Stack

| Layer | Technology |
|---|---|
| Language | Go |
| TUI Framework | Bubble Tea |
| Styling | Lip Gloss |
| SSH Server | Wish |

---

## Installation & Usage

To run the local SSH server during development:

```bash
cd apps/cli
go mod tidy
go run .
```

Once the server is running, open a secondary terminal window and connect to it locally:

```bash
ssh localhost -p 2222
```
