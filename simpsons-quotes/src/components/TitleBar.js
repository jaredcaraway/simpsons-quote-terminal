import WindowControlGroup from './WindowControlGroup';
import Title from './Title';

import './TitleBar.css';

function TitleBar({ windowType, title }) {
    return (
        <div id="title-bar">

            <WindowControlGroup />
            <Title title={title} />
        </div>
    );
}

export default TitleBar;