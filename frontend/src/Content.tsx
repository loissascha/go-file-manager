import { useEffect, useState } from "react";
import { GetFileList } from "../wailsjs/go/main/App";

interface ContentProps {
    location: string;
    tabId: string;
    navigateToSubFolderDir: (dir: string) => void;
}

interface ContentEntry {
    Name: string;
    IsDir: boolean;
}

function Content({ location, tabId, navigateToSubFolderDir }: ContentProps) {
    const [files, setFiles] = useState<ContentEntry[]>([]);

    useEffect(() => {
        GetFileList().then((files) => {
            setFiles([]);
            for (const file of files) {
                const f: any = file;
                const contentEntry: ContentEntry = {
                    Name: f.Name,
                    IsDir: f.IsDir
                };
                if (!f.Name.startsWith(".")) {
                    setFiles(prev => [...prev, contentEntry]);
                }
            }
        });
    }, [location, tabId]);

    return (
        <div className="">
            <ul>
                {files.map((file, index) => {
                    return <li key={index} className='py-1 px-3 border-b last:border-b-0 border-gray-800' onClick={() => {
                        if (file.IsDir) {
                            navigateToSubFolderDir(file.Name);
                        }
                    }}>
                        {file.Name}
                    </li>
                })}
            </ul>
        </div>
    );
}
export default Content;
