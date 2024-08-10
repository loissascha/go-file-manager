package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"runtime"
	"strings"

	"github.com/oklog/ulid/v2"
)

var tabs = []Tab{}
var activeTab *Tab

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	tab := Tab{
		Id:       ulid.Make(),
		Location: GetUserFolder(),
	}
	tabs = append(tabs, tab)
	activeTab = &tabs[0]
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's time to build something incredible!", name)
}

func (a *App) OpenFile(name string) error {
	var cmd *exec.Cmd
	filePath := activeTab.Location + "/" + name

	switch runtime.GOOS {
	case "linux":
		cmd = exec.Command("xdg-open", filePath)
	default:
		return fmt.Errorf("unsupported platform")
	}

	return cmd.Start()
}

func (a *App) GetFilePreview(name string) string {

	if strings.Contains(name, ".txt") {
	} else if strings.Contains(name, ".sh") {
	} else if strings.Contains(name, ".html") {
	} else {
		return ""
	}

	filePath := activeTab.Location + "/" + name

	content, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return string(content)
}
