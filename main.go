package main

import (
	"fmt"
	"log"
	tea "github.com/charmbracelet/bubbletea"
)

type model struct {
    choices []string
    cursor int
}

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
                    if m.cursor < len(m.choices)-1{
                        m.cursor++
                    }
            }
    }
    return m, nil
}

func (m model) View() string {
    s := "My Projects:\n\n"
    for i, choice := range m.choices {
        cursor := " "
        if m.cursor == i {
            cursor = ">"
        }
        s += fmt.Sprintf("%s %s\n", cursor, choice)
    }
    return s + "\nPress q to quit"
}

func main() {
	p := tea.NewProgram(model{
    choices: []string{"Eatwise", "Placement Portal", "Event Horizon", "Contact"},
    cursor: 0,
    })
	if _, err := p.Run(); err != nil {
		log.Fatal(err)
	}
}
