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
        <aside className="bg-gray-700 p-3">
            <ul>
                <li onClick={() => {
                    navigateToHomeFolderDir("");
                }}>Home</li>
                {fixedFolders.map((folder, index) => {
                    return <li key={index} onClick={() => {
                        navigateToHomeFolderDir(folder);
                    }}>{folder}</li>
                })}
            </ul>
        </aside>
    );
}
export default SideBar;
