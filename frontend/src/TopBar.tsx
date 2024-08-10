
interface TopBarProps {
    location: string;
    tabId: string;
}

function TopBar({ location, tabId }: TopBarProps) {


    return (
        <nav className="bg-gray-800">
            <div>
                <i className="text-gray-400 ms-5">{tabId}</i>
            </div>
            <div className="grid p-3">
                <div className="w-full bg-gray-900 p-1 rounded px-2">{location}</div>
            </div>
        </nav>
    );
}
export default TopBar;
