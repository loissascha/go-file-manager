import { useEffect, useState } from "react";
import { GetFileList, GetFilePreview, OpenFile } from "../wailsjs/go/main/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";

interface ContentProps {
    location: string;
    tabId: string;
    navigateToSubFolderDir: (dir: string) => void;
}

interface ContentEntry {
    Name: string;
    IsDir: boolean;
    selected: boolean;
}

function Content({ location, tabId, navigateToSubFolderDir }: ContentProps) {
    const [files, setFiles] = useState<ContentEntry[]>([]);
    const [preview, setPreview] = useState<string>('');

    useEffect(() => {
        GetFileList().then((files) => {
            setFiles([]);
            for (const file of files) {
                const f: any = file;
                const contentEntry: ContentEntry = {
                    Name: f.Name,
                    IsDir: f.IsDir,
                    selected: false
                };
                if (!f.Name.startsWith(".")) {
                    setFiles(prev => [...prev, contentEntry]);
                }
            }
        });
    }, [location, tabId]);

    useEffect(() => {
        let hasPreview = false;
        for (const f of files) {
            if (f.selected) {
                GetFilePreview(f.Name).then((preview) => {
                    setPreview(preview);
                });
                hasPreview = true;
                break;
            }
        }
        if (!hasPreview) {
            setPreview('');
        }
    }, [files]);

    return (
        <div className="grid grid-cols-[2fr_1fr] h-full">
            <ul className="overflow-auto">
                {files.map((file, index) => {
                    return <li key={index} className={'py-1 px-3 select-none border-b last:border-b-0 border-gray-800 cursor-pointer ' + (file.selected ? 'bg-mocha-mantle' : '')} onClick={() => {
                        const newFiles = files.map((f, i) => ({
                            ...f,
                            selected: i === index
                        }));
                        setFiles(newFiles);
                        console.log("set new files");
                        console.log(newFiles);
                        console.log(files);
                    }} onDoubleClick={() => {
                        if (file.IsDir) {
                            navigateToSubFolderDir(file.Name);
                        }
                        else {
                            OpenFile(file.Name);
                        }
                    }}>
                        {file.IsDir ?
                            <FontAwesomeIcon icon={faFolder} className='mr-2' /> :
                            <FontAwesomeIcon icon={faFile} className='mr-2' />
                        }
                        {file.Name}
                    </li>
                })}
            </ul>
            <div className="bg-black text-white overflow-x-auto overflow-y-auto">
                {preview}
            </div>
        </div >
    );
}
export default Content;
