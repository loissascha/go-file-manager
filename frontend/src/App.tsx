import { useEffect, useState } from 'react';
import { GetTabId, GetTabLocation, NavigateToHomeFolderSubFolder, NavigateToSubFolder, Version } from "../wailsjs/go/main/App";
import TopBar from './TopBar';
import SideBar from './SideBar';
import Content from './Content';
import WindowBar from './WindowBar';

function App() {
    const [tabId, setTabId] = useState('');
    const [tabLocation, setTabLocation] = useState('');

    useEffect(() => {
        GetTabId().then((id) => {
            console.log("Tab ID: ", id);
            setTabId(id);
        });
        GetTabLocation().then((loc) => {
            console.log("Tab Location: ", loc);
            setTabLocation(loc);
        });
        Version().then((v) => {
            console.log("Version: ", v);
        });
    }, []);

    function navigateToHomeFolderDir(dir: string) {
        NavigateToHomeFolderSubFolder(dir).then(() => {
            GetTabLocation().then((loc) => {
                console.log("Tab Location: ", loc);
                setTabLocation(loc);
            });
        });
    }

    function navigateToSubFolderDir(dir: string) {
        NavigateToSubFolder(dir).then(() => {
            GetTabLocation().then((loc) => {
                console.log("Tab Location: ", loc);
                setTabLocation(loc);
            });
        });
    }

    return (
        <div className='w-full h-full bg-mocha-base text-mocha-text grid grid-rows-[auto_1fr]'>
            <WindowBar />
            <div className='grid grid-cols-[1fr_4fr]'>
                <SideBar navigateToHomeFolderDir={navigateToHomeFolderDir} />
                <div className='grid grid-rows-[auto_1fr] h-screen'>
                    <TopBar location={tabLocation} tabId={tabId} />
                    <div className='overflow-auto'>
                        <Content location={tabLocation} tabId={tabId} navigateToSubFolderDir={navigateToSubFolderDir} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
