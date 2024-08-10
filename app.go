package main

import (
	"context"
	"fmt"
	"os"

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

func (a *App) GetFileList() []string {
	content, err := os.ReadDir(activeTab.Location)
	if err != nil {
		fmt.Println(err)
		return []string{}
	}
	flist := []string{}
	for _, f := range content {
		flist = append(flist, f.Name())
	}
	return flist
}

func (a *App) GetHomeFolderFileList() []string {
	content, err := os.ReadDir(GetUserFolder())
	if err != nil {
		fmt.Println(err)
		return []string{}
	}
	flist := []string{}
	for _, f := range content {
		flist = append(flist, f.Name())
	}
	return flist
}

func GetUserFolder() string {
	dir, err := os.UserHomeDir()
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return dir
}

func (a *App) NavigateToSubFolder(f string) {
	activeTab.Location += "/" + f
}

func (a *App) NavigateToHomeFolderSubFolder(f string) {
	if f == "" {
		activeTab.Location = GetUserFolder()
		return
	}
	activeTab.Location = GetUserFolder() + "/" + f
}
