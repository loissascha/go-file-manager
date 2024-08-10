import { useEffect, useState } from "react";
import { GetFileList } from "../wailsjs/go/main/App";

function Content() {
    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => {
        GetFileList().then((files) => {
            setFiles([]);
            for (const file of files) {
                if (!file.startsWith(".")) {
                    setFiles(prev => [...prev, file]);
                }
            }
        });
    }, []);

    return (
        <div className="p-3">
            <ul>
                {files.map((file, index) => {
                    return <li key={index}>{file}</li>
                })}
            </ul>
        </div>
    );
}
export default Content;
