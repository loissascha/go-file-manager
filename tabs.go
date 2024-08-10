package main

import "github.com/oklog/ulid/v2"

// get id of currently active tab
func (a *App) GetTabId() string {
	return activeTab.Id.String()
}

// get location of currently active tab
func (a *App) GetTabLocation() string {
	return activeTab.Location
}

type Tab struct {
	Id       ulid.ULID
	Location string
}
