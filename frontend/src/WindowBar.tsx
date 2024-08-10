
function WindowBar() {

    const handleMouseDown = (e: any) => {
        console.log("Mouse Down");
        if (e.button === 0) {
            console.log("Mouse Down Left");
        }
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            id="windowbar" className='bg-orange-400'>
            TopBar
        </div>
    );
}
export default WindowBar;
