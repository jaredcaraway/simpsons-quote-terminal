import './Input.css'

function Input() {
    return (
        <div>
            <span id="user-text">bart@whyYouLittle</span>:
            <span id="path">~/simpsons/quote/terminal</span>$ &nbsp;
            <div id="cursor" class="cursorOn">&#x2588;</div>
        </div>
    );
}

export default Input;