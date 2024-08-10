package main

import (
	"fmt"
	"os"
)

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

func (a *App) GetFileList() []FileResult {
	content, err := os.ReadDir(activeTab.Location)
	if err != nil {
		fmt.Println(err)
		return []FileResult{}
	}
	flist := []FileResult{}
	for _, f := range content {
		var fr FileResult
		fr.Name = f.Name()
		fr.IsDir = f.IsDir()
		flist = append(flist, fr)
	}
	return flist
}

type FileResult struct {
	Name  string
	IsDir bool
}
