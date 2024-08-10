package main

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
