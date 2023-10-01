import DesktopShortcut from "./DesktopShortcut";
import './DesktopShortcutGroup.css';

function DesktopShortcutGroup() {
    return (
        <div id="iconContainer">
            <DesktopShortcut />
            <DesktopShortcut />
        </div>
    );
}

export default DesktopShortcutGroup;