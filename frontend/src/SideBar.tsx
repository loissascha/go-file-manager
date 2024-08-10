import { useEffect, useState } from "react";
import { GetHomeFolderFileList } from "../wailsjs/go/main/App";


function SideBar() {
    const [fixedFolders, setFixedFolders] = useState<string[]>([]);

    useEffect(() => {
        GetHomeFolderFileList().then((files) => {
            console.log(files);
            setFixedFolders(["Home"]);
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
                {fixedFolders.map((folder, index) => {
                    return <li key={index}>{folder}</li>
                })}
            </ul>
        </aside>
    );
}
export default SideBar;
