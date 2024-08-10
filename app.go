package main

import (
	"context"
	"fmt"
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
		Location: "~",
	}
	tabs = append(tabs, tab)
	activeTab = &tabs[0]
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's time to build something incredible!", name)
}
