import './TextArea.css';

function TextArea() {
    return (
        <div id="text-area">
            <span id="user-text">bart@whyYouLittle</span>:
            <span id="path">~/simpsons/quote/terminal</span>$&nbsp;
            <span id="quoteOutput"></span>
            <div id="cursor" class="cursorOn"></div>
        </div>
    );
}

export default TextArea;