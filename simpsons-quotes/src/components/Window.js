import TitleBar from './TitleBar';
import Input from './Input';
import Output from './Output';

function Window({ windowType = "Terminal" }) {
    return (
        <div class="terminal">
            <TitleBar title="Simpsons Quote Terminal" />
            {/* <div id="text-area">
      <span id="user-text">bart@whyYouLittle</span>:
      <span id="path">~/simpsons/quote/terminal</span>$&nbsp;
      <span id="quoteOutput"></span>
      <div id="cursor" class="cursorOn"></div>
    </div> */}

        </div>

    );
}

export default Window;