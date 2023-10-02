import TitleBar from './TitleBar';
import TextArea from './TextArea';
import Input from './Input';
import Output from './Output';

import './Window.css';

function Window({ windowType = "Terminal" }) {
    return (
        <div class="terminal">
            <TitleBar title="Simpsons Quote Terminal" />
            <TextArea />
        </div>

    );
}

export default Window;