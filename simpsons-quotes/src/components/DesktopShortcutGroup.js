import DesktopShortcut from "./DesktopShortcut";
import './DesktopShortcutGroup.css';

function DesktopShortcutGroup() {
    return (
        <div id="iconContainer">
            <DesktopShortcut
                id="generateButton"
                className="fa-free-code-camp"
                anchorText="Generate Quote"
            />
            <DesktopShortcut
                id="twitterButton"
                className="fa-twitter"
                anchorText="Tweet Quote"
            />
        </div>
    );
}

export default DesktopShortcutGroup;