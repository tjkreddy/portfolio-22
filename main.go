package main

import (
	"fmt"
	"log"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type Project struct {
    title string
    Description string
}


type model struct {
    projects []Project
    cursor int
    showDetails bool
}

var (
	// The classic terminal green
	retroGreen = lipgloss.Color("#FF5F87")
    darkGreen  = lipgloss.Color("#555555") // For less important text
    

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
   return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd){

    switch msg := msg.(type) {
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
	// 1. Are we looking at a specific project?
	if m.showDetails {
		// Render the Details View using lipgloss styles
		title := titleStyle.Render(m.projects[m.cursor].title)
		
		// You would ideally pull this description from a map or struct
		descText := m.projects[m.cursor].Description
		desc := descriptionStyle.Render(descText)
		help := helpStyle.Render("Press 'b' or 'esc' to go back, 'q' to quit.")

		// Join them together with newlines
		ui := lipgloss.JoinVertical(lipgloss.Left, title, desc, help)
		
		// Wrap the whole thing in the main app layout
		return appStyle.Render(ui)
	}

	// 2. We are in the Main Menu
	menuText := "My Projects:\n\n"
	for i, project := range m.projects {
		cursor := " " // no cursor
		renderedChoice := itemStyle.Render(project.title)

		if m.cursor == i {
			cursor = ">" // cursor!
			renderedChoice = selectedItemStyle.Render(project.title)
		}
		menuText += fmt.Sprintf("%s %s\n", cursor, renderedChoice)
	}

	help := helpStyle.Render("\nPress Enter to view, Up/Down to navigate, 'q' to quit.")
	ui := lipgloss.JoinVertical(lipgloss.Left, menuText, help)
	
	return appStyle.Render(ui)
}


func main() {
	p := tea.NewProgram(model{
    projects: []Project{
        {title: "EatWise", Description: "Smart kitchen and pantry management system.\n\nTech Stack: Next.js, Go, PostgreSQL."},
			{title: "Placement Portal", Description: "Mahindra University scalable recruitment platform utilizing monorepo architecture."},
			{title: "Event Horizon", Description: "Custom gravity physics simulation engine built entirely in Go."},
			{title: "Contact", Description: "Contact me at: tjkreddy@example.com\nGitHub: github.com/tjkreddy"},
		},
    cursor: 0,
    })
	if _, err := p.Run(); err != nil {
		log.Fatal(err)
	}
}
