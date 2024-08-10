
interface TopBarProps {
    onPageSwap: (page: string) => void;
    location: string;
    tabId: string;
}

function TopBar({ location, tabId, onPageSwap }: TopBarProps) {

    function swapPage(page: string) {
        onPageSwap(page);
    }

    return (
        <nav className="bg-gray-800">
            <div>
                <a onClick={() => swapPage('page1')} className="text-white cursor-pointer">Page 1</a>
                <a onClick={() => swapPage('page2')} className="text-white cursor-pointer">Page 2</a>
                <i className="text-gray-400 ms-5">{tabId}</i>
            </div>
            <div className="grid p-3">
                <div className="w-full bg-gray-900 p-1 rounded px-2">{location}</div>
            </div>
        </nav>
    );
}
export default TopBar;
