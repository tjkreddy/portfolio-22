# portfolio-22

A high-fidelity, interactive Text User Interface (TUI) portfolio built entirely in Go. 

Instead of hosting a traditional web-based resume, this application allows users, recruiters, and fellow engineers to explore my work by interacting directly with a custom-built CLI application. Ultimately, this will be served over SSH, bypassing the browser entirely.

## Key Features

* Interactive Navigation: Fully navigable menus using standard keyboard inputs (Up/Down/Enter) or Vim-style bindings (j/k) to explore projects, technical skills, and contact information.
* Stateful TUI: Implements the Model-View-Update (MVU) pattern to manage complex UI states, built on The Elm Architecture.
* Systems-Minded: Designed as a performant, single-binary application demonstrating an understanding of state management and terminal emulation outside the standard web DOM.

## Technical Stack

* Language: Go
* TUI Framework: Bubble Tea
* Styling: Lip Gloss
* SSH Server: Wish

## Running Locally

Currently, the application runs as a local terminal UI. 

1. Clone the repository:
   git clone https://github.com/tjkreddy/portfolio-22.git
   cd portfolio-22

2. Install dependencies:
   go mod tidy

3. Run the application:
   go run main.go

4. In another terminal run:
   ssh localhost -p 2222

## About the Author

Jugal Kishore Reddy Thangella
* GitHub: @tjkreddy
* Focus: Backend Systems, Full-Stack Development, CLI Tooling
