import WindowControlGroup from './WindowControlGroup';

function TitleBar({ windowType }) {
    return (
        <div>
            <h3>Title Bar: {windowType}</h3>
            <WindowControlGroup />
        </div>
    );
}

export default TitleBar;