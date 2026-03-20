$(function(){
  'use strict';
  var quoteOutput = document.querySelector("#quoteOutput");
  var generateButton = document.querySelector("#generateButton");
  var twitterButton = document.querySelector("#twitterButton");
  var cursor = document.querySelector("#cursor");
  var tweetQuote;

  twitterButton.addEventListener("click", function() {
    if (tweetQuote === undefined) {
      console.log("No quote generated");
    } else {
      var postURL = "https://x.com/intent/post?text=" + tweetQuote;
      window.open(postURL,
                  'Post this quote!',
                  'resizable,height=360,width=500');
      return false;
    }
  });

  function typeWrite(data) {
    var quote = data[0].quote;
    var character = data[0].character;
    var attribution = '-' + character;
    var index = 0;

    quoteOutput.innerHTML = '<br>';

    function typeChar() {
      if (index < quote.length) {
        var char = quote[index];
        quoteOutput.innerHTML += char;
        index++;

        var delay = Math.floor(Math.random() * 50) + 30; // 30–80ms base
        if ('.!?,'.indexOf(char) !== -1) {
          delay += 200; // pause after punctuation
        }
        setTimeout(typeChar, delay);
      } else {
        // Quote done — pause then type attribution
        setTimeout(function() {
          quoteOutput.innerHTML += '<br>';
          var attrIndex = 0;
          function typeAttr() {
            if (attrIndex < attribution.length) {
              quoteOutput.innerHTML += attribution[attrIndex];
              attrIndex++;
              var delay = Math.floor(Math.random() * 50) + 30;
              setTimeout(typeAttr, delay);
            } else {
              showTweetButton();
            }
          }
          typeAttr();
        }, 400);
      }
    }

    typeChar();
  }
  
  function tweetifyQuote(data) {
    var quote = encodeURI(data[0].quote + "\n\n-" + data[0].character);
    return quote;
  }
  
  function showTweetButton() {
    $( twitterButton ).fadeIn(2000);
  }
  
  generateButton.addEventListener("click", function() {
    $.ajax({
      url: "quotes.json",
      type: "GET",
      success: function(data) {
        var randomIndex = Math.floor(Math.random() * data.length);
        var quote = [data[randomIndex]];
        tweetQuote = tweetifyQuote(quote);
        typeWrite(quote);
      }
    });
  });

  //Cursor blink function
  setInterval(function() {
    cursor.classList.toggle("cursorOn");
  },
  950);

  $(document).keypress(function(event) {
    var keyPressed = String.fromCharCode(event.which);
    if (keyPressed.toLowerCase() === 'r') {
      generateButton.click();
    }
  });
}); // document.ready()