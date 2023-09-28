import DesktopShortcut from "./DesktopShortcut";
import Taskbar from "./Taskbar";
import Window from "./Window";

function Desktop() {
    return (
        <div>
            <h1>Desktop</h1>
            <Taskbar />
            <Window />
            <DesktopShortcut />
        </div>
    );
}

export default Desktop;