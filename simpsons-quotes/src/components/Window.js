import TitleBar from './TitleBar';
import Input from './Input';
import Output from './Output';

function Window({ windowType = "Terminal" }) {
    return (
        <div>
            <h2>Window</h2>
            <TitleBar windowType={windowType} />
            <Input />
            <Output />
        </div >
    );
}

export default Window;