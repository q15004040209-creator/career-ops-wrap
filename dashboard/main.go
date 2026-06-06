// career-ops-wrap / dashboard / main.go
// Go TUI Dashboard · Bubble Tea based pipeline viewer

package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

var (
	// Colors
	gradeA  = lipgloss.NewStyle().Foreground(lipgloss.Color("76")).Bold(true)
	gradeB  = lipgloss.NewStyle().Foreground(lipgloss.Color("82"))
	gradeC  = lipgloss.NewStyle().Foreground(lipgloss.Color("226"))
	gradeD  = lipgloss.NewStyle().Foreground(lipgloss.Color("196"))
	company = lipgloss.NewStyle().Foreground(lipgloss.Color("69"))
	dimmed  = lipgloss.NewStyle().Foreground(lipgloss.Color("240"))
	header  = lipgloss.NewStyle().Foreground(lipgloss.Color("255")).Bold(true)
)

type Job struct {
	Title    string
	Company  string
	Grade    string
	Score    float64
	Status   string
	Source   string
}

type model struct {
	jobs         []Job
	filter      string
	sortBy      string
	selectedIdx int
}

func (m model) Init() tea.Cmd { return nil }

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "q", "ctrl+c":
			return m, tea.Quit
		case "j", "down":
			if m.selectedIdx < len(m.jobs)-1 {
				m.selectedIdx++
			}
		case "k", "up":
			if m.selectedIdx > 0 {
				m.selectedIdx--
			}
		case "1":
			m.filter = "all"
		case "2":
			m.filter = "consider"
		case "3":
			m.filter = "skip"
		}
	}
	return m, nil
}

func (m model) View() string {
	var sb strings.Builder
	sb.WriteString("\n  Career-Ops Dashboard  (q:quit  j/k:nav  1-3:filter)\n")
	sb.WriteString("  ─────────────────────────────────────────────────────\n\n")

	filtered := m.jobs
	if m.filter == "consider" {
		filtered = filterJobs(m.jobs, "CONSIDER")
	} else if m.filter == "skip" {
		filtered = filterJobs(m.jobs, "SKIP")
	}

	for i, job := range filtered {
		gradeStyle := gradeC
		switch job.Grade[0] {
		case 'A':
			gradeStyle = gradeA
		case 'B':
			gradeStyle = gradeB
		case 'C':
			gradeStyle = gradeC
		default:
			gradeStyle = gradeD
		}

		prefix := "  "
		if i == m.selectedIdx {
			prefix = "▶ "
		}

		sb.WriteString(fmt.Sprintf("%s[%s] %s / %s\n",
			prefix+gradeStyle.Render(job.Grade),
			dimmed.Render(job.Status),
			company.Render(job.Company),
			job.Title,
		))
		sb.WriteString(fmt.Sprintf("   %s  %.2f/5.0  %s\n\n",
			dimmed.Render(job.Source),
			job.Score,
			dimmed.Render("→ pipelined"),
		))
	}

	sb.WriteString(dimmed.Render("\n  ─────────────────────────────────────────────────────\n"))
	sb.WriteString(fmt.Sprintf("  %d offers shown | filter: %s\n", len(filtered), m.filter))
	return sb.String()
}

func filterJobs(jobs []Job, status string) []Job {
	var result []Job
	for _, j := range jobs {
		if j.Status == status {
			result = append(result, j)
		}
	}
	return result
}

func main() {
	dataPath := "."
	if len(os.Args) > 1 {
		dataPath = os.Args[1]
	}

	jobs := []Job{
		{"Senior LLMOps Engineer", "Anthropic", "A", 4.6, "CONSIDER", "greenhouse"},
		{"AI Platform Engineer", "ElevenLabs", "A-", 4.3, "CONSIDER", "workable"},
		{"Head of Applied AI", "Retool", "B+", 4.0, "CONSIDER", "ashby"},
		{"Staff SWE", "OpenAI", "B", 3.8, "CONSIDER", "ashby"},
		{"LLMOps Engineer", "LangChain", "C+", 3.2, "SKIP", "linkedin"},
		{"AI Engineer", "n8n", "B-", 3.5, "CONSIDER", "custom"},
	}

	p := tea.NewProgram(model{jobs: jobs, filter: "all"})
	if err := p.Start(); err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}
}
