import Clock from "./Clock";
import TaskbarIcon from "./TaskbarIcon";

function Taskbar() {
    return (
        <div>
            <h2>Taskbar</h2>
            <Clock />
            <TaskbarIcon />
        </div>
    );
}

export default Taskbar;