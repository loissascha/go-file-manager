import { useEffect, useState } from "react";
import { GetHomeFolderFileList } from "../wailsjs/go/main/App";

interface SideBarProps {
    navigateToHomeFolderDir: (dir: string) => void;
}

function SideBar({ navigateToHomeFolderDir }: SideBarProps) {
    const [fixedFolders, setFixedFolders] = useState<string[]>([]);

    useEffect(() => {
        GetHomeFolderFileList().then((files) => {
            console.log(files);
            setFixedFolders([]);
            for (const file of files) {
                if (file === "Pictures" || file === "Documents" || file === "Downloads" || file === "Music" || file === "Videos") {
                    setFixedFolders(prev => [...prev, file]);
                }
            }
        });
    }, [])

    return (
        <aside className="bg-mocha-mantle py-4">
            <ul>
                <li className="cursor-pointer px-3 py-2 border-t border-b border-mocha-surface0" onClick={() => {
                    navigateToHomeFolderDir("");
                }}>Home</li>
                {fixedFolders.map((folder, index) => {
                    return <li key={index} className='cursor-pointer px-3 py-2 border-b border-mocha-surface0' onClick={() => {
                        navigateToHomeFolderDir(folder);
                    }}>{folder}</li>
                })}
            </ul>
        </aside>
    );
}
export default SideBar;
