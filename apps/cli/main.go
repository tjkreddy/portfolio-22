package main

import (
    "context"
	"errors"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/ssh"
	"github.com/charmbracelet/wish"
	bm "github.com/charmbracelet/wish/bubbletea"
	lm "github.com/charmbracelet/wish/logging"
)

// 1. We define a custom message type. This is the "note" the alarm clock hands us.
type tickMsg time.Time

// 2. We define a command function to start the alarm clock.
func tick() tea.Cmd {
    // tea.Tick takes a duration, and a function that returns our custom message
    return tea.Tick(time.Second*4, func(t time.Time) tea.Msg {
        return tickMsg(t)
    })
}


type Project struct {
    title string
    Description string
	bootMessages []string
}


type model struct {
    projects []Project
    cursor int
    showDetails bool
    width int
    height int
    booting bool
    bootIndex int
    bootMessages []string
}

var (
	// The classic terminal green
	retroGreen = lipgloss.Color("#33FF00")
    darkGreen  = lipgloss.Color("#005500") // For less important text
    

	appStyle = lipgloss.NewStyle().Margin(1, 2)

	// Selected items get the bright green and a bold weight
	selectedItemStyle = lipgloss.NewStyle().
				Foreground(retroGreen).
				Bold(true)

	// Unselected items get a darker, dimmed green
	itemStyle = lipgloss.NewStyle().Foreground(darkGreen)

	// Project Titles
	titleStyle = lipgloss.NewStyle().
			Foreground(retroGreen).
			Bold(true).
			Underline(true).
			MarginBottom(1)

	// The description box gets a green border and text
	descriptionStyle = lipgloss.NewStyle().
				Width(50).
				Foreground(retroGreen).
				Border(lipgloss.RoundedBorder()).
				BorderForeground(retroGreen).
				Padding(1, 2)

	helpStyle = lipgloss.NewStyle().
			Foreground(darkGreen).
			Italic(true).
			MarginTop(1)
)



func (m model) Init() tea.Cmd {
   return tick()
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd){

    switch msg := msg.(type) {
        case tickMsg:
            if m.booting{
                m.bootIndex++
            }
            if len(m.bootMessages) <= m.bootIndex{
                m.booting = false
                return m, nil
            } else {
                return m, tick()
            }
        case tea.WindowSizeMsg:
            m.width = msg.Width
            m.height = msg.Height

        case tea.KeyMsg:
            switch msg.String(){
                case "ctrl+c", "q":
                    return m, tea.Quit
                case "up","k":
                    if m.cursor > 0 {
                        m.cursor--
                    }
                case "down","j":
                    if m.cursor < len(m.projects)-1{
                        m.cursor++
                    }
                case "enter":
                    m.showDetails = true
                case "b","esc":
                    m.showDetails = false
            }
    }
    return m, nil
}

func (m model) View() string {
    // 1. THE HIJACK: Are we currently booting?
    if m.booting {
        var bootText string

        // Loop from 0 up to our current timer index
        for i := 0; i <= m.bootIndex; i++ {
            // Add the message and a newline character
            bootText += m.bootMessages[i] + "\n"
        }

        // Center the terminal text on the screen
        return lipgloss.Place(
            m.width,
            m.height,
            lipgloss.Center,
            lipgloss.Center,
            bootText,
        )
    }

    // 2. NORMAL APP LOGIC: Only runs if m.booting is false
    if m.showDetails {
        title := titleStyle.Render(m.projects[m.cursor].title)
        descText := m.projects[m.cursor].Description
        desc := descriptionStyle.Render(descText)
        help := helpStyle.Render("Press 'b' or 'esc' to go back, 'q' to quit.")

        return lipgloss.Place(
            m.width,
            m.height,
            lipgloss.Center,
            lipgloss.Center,
            appStyle.Render(lipgloss.JoinVertical(lipgloss.Left, title, desc, help)),
        )
    } else {
        menuText := "My Projects:\n\n"
        for i, project := range m.projects {
            cursor := " "
            renderedChoice := itemStyle.Render(project.title)

            if m.cursor == i {
                cursor = ">"
                renderedChoice = selectedItemStyle.Render(project.title)
            }
            menuText += fmt.Sprintf("%s %s\n", cursor, renderedChoice)
        }

        help := helpStyle.Render("\nPress Enter to view, Up/Down to navigate, 'q' to quit.")

        return lipgloss.Place(
            m.width,
            m.height,
            lipgloss.Center,
            lipgloss.Center,
            appStyle.Render(lipgloss.JoinVertical(lipgloss.Left, menuText, help)),
        )
    }
}

func teaHandler(s ssh.Session) (tea.Model, []tea.ProgramOption){
    return model{
        projects: []Project{
           {title: "EatWise", Description: "Smart kitchen and pantry management system.\n\nTech Stack: Next.js, Go, PostgreSQL."}    ,
               {title: "Placement Portal", Description: "Mahindra University scalable recruitment platform utilizing monorepo architecture."},
               {title: "Event Horizon", Description: "Custom gravity physics simulation engine built entirely in Go."},
               {title: "Contact", Description: "Contact me at: tjkreddy@example.com\nGitHub: github.com/tjkreddy"},
           },
       cursor: 0,
       booting: true,
       bootIndex: 0,
       bootMessages: []string{
           "[ OK ] Loaded kernel modules...",
			"[ OK ] Mounting filesystem...",
			"[ ~~ ] Initializing phosphor display...",
			"[ OK ] Portfolio system ready.",
		},
    }, []tea.ProgramOption{tea.WithAltScreen()}
}

    func main() {
	// 1. Configure the SSH Server
	s, err := wish.NewServer(
		wish.WithAddress(net.JoinHostPort("localhost", "2222")),
		wish.WithHostKeyPath(".ssh/term_info_ed25519"), // Generates a secure key for the server
		wish.WithMiddleware(
			bm.Middleware(teaHandler), // This tells the server: "When someone connects, run teaHandler!"
			lm.Middleware(),           // This logs who connects to your terminal
		),
	)
	if err != nil {
		log.Fatalln(err)
	}

	// 2. Set up a way to safely shut down the server when you press Ctrl+C
	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	log.Printf("Starting SSH portfolio server on localhost:2222")

	// 3. Start the server in the background (a goroutine)
	go func() {
		if err = s.ListenAndServe(); err != nil && !errors.Is(err, ssh.ErrServerClosed) {
			log.Fatalln(err)
		}
	}()

	// 4. Wait here forever until someone presses Ctrl+C
	<-done
	log.Println("\nStopping SSH server")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := s.Shutdown(ctx); err != nil && !errors.Is(err, ssh.ErrServerClosed) {
		log.Fatalln(err)
	}
}
