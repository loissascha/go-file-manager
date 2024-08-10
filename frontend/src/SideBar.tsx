import { useEffect, useState } from "react";
import { GetFileList } from "../wailsjs/go/main/App";


function SideBar() {
    const [fixedFolders, setFixedFolders] = useState<string[]>([]);

    useEffect(() => {
        setFixedFolders(["Home"]);
        GetFileList().then((files) => {
            console.log(files);
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
