import WindowControlGroup from './WindowControlGroup';

function TitleBar({ windowType, title }) {
    return (
        <div>
            <h3>{title}</h3>
            <WindowControlGroup />
        </div>
    );
}

export default TitleBar;