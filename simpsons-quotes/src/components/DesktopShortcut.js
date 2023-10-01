function DesktopShortcut({ id, className, anchorText }) {
    return (
        <div id={id} className="desktopIcon">
            <a href="#">
                <i className={`fa ${className}`}></i>
                {anchorText}
            </a>
        </div>
    );
}

export default DesktopShortcut;