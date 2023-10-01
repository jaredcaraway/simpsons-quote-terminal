import './Desktop.css';
import DesktopShortcutGroup from './DesktopShortcutGroup';

import DesktopShortcut from "./DesktopShortcut";
import Taskbar from "./Taskbar";
import Window from "./Window";

function Desktop() {
    return (
        <div>
            <h1>Desktop</h1>
            <Taskbar />
            <Window windowType="Terminal" />
            <DesktopShortcutGroup />
        </div>
    );
}

export default Desktop;