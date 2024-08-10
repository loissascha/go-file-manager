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
        <div className="p-3">
            <ul>
                {files.map((file, index) => {
                    return <li key={index} onClick={() => {
                        if (file.IsDir) {
                            navigateToSubFolderDir(file.Name);
                        }
                    }}>{file.Name}</li>
                })}
            </ul>
        </div>
    );
}
export default Content;
