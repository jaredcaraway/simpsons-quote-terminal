import WindowControls from "./WindowControls";

function Window({ windowType = "Terminal" }) {
    return (
        <div>
            <h2>{windowType}</h2>
            <WindowControls />
        </div>
    );
}

export default Window;