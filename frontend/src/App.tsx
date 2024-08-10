import { useEffect, useState } from 'react';
import { GetTabId, GetTabLocation, Version } from "../wailsjs/go/main/App";
import TopBar from './TopBar';
import SideBar from './SideBar';
import Content from './Content';

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

    return (
        <div className='w-full h-full bg-gray-900 text-white grid grid-cols-[1fr_4fr]'>
            <SideBar />
            <div className='grid grid-rows-[auto_1fr] h-screen'>
                <TopBar location={tabLocation} tabId={tabId} />
                <div className='overflow-auto'>
                    <Content />
                </div>
            </div>
        </div>
    )
}

export default App
