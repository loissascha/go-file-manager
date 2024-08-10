import { useEffect } from "react";
import { GetFileList } from "../wailsjs/go/main/App";


function SideBar() {

    useEffect(() => {
        GetFileList().then((files) => {
            console.log(files);
        });
    }, [])

    return (
        <aside className="bg-gray-700">
            Sidebar
        </aside>
    );
}
export default SideBar;
