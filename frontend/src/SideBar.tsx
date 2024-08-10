import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
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
        <aside className="bg-mocha-mantle">
            <ul>
                <li className="cursor-pointer px-3 py-2 border-b border-mocha-surface0" onClick={() => {
                    navigateToHomeFolderDir("");
                }}>
                    <FontAwesomeIcon icon={faHouse} className='mr-2' />
                    Home
                </li>
                {fixedFolders.map((folder, index) => {
                    return <li key={index} className='cursor-pointer px-3 py-2 border-b border-mocha-surface0' onClick={() => {
                        navigateToHomeFolderDir(folder);
                    }}>
                        {folder === "Documents" ?
                            <FontAwesomeIcon icon={faFile} className='mr-2' /> :
                            null
                        }
                        {folder === "Downloads" ?
                            <FontAwesomeIcon icon={faDownload} className='mr-2' /> :
                            null
                        }
                        {folder === "Music" ?
                            <FontAwesomeIcon icon={faMusic} className='mr-2' /> :
                            null
                        }
                        {folder === "Pictures" ?
                            <FontAwesomeIcon icon={faImage} className='mr-2' /> :
                            null
                        }
                        {folder === "Videos" ?
                            <FontAwesomeIcon icon={faVideo} className='mr-2' /> :
                            null
                        }
                        {folder}
                    </li>
                })}
            </ul>
        </aside>
    );
}
export default SideBar;
