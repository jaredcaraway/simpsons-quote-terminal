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
      var tweetURL = "https://twitter.com/intent/tweet?text=" + tweetQuote;
      window.open(tweetURL,
                  'Tweet this quote!',
                  'resizable,height=360,width=500');
      return false;
    }
  });

  function typeWrite(data) {
   // console.log("typeWrite function called");
  }
  
  function tweetifyQuote(data) {
    var quote = encodeURI(data[0].quote + "\n\n-" + data[0].character);
    console.log(quote);
    console.log(quote.length);
    return quote;
  }
  
  function showTweetButton() {
    $( twitterButton ).fadeIn(2000);
  }
  
  function displayQuote(data) {
    quoteOutput.innerHTML = "<br>" + data[0].quote + "<br><br>-" + data[0].character;
  }

  generateButton.addEventListener("click", function() {
    $.ajax({
      url: "https://thesimpsonsquoteapi.glitch.me/quotes",
      type: "GET",
      success: function(data) {
        tweetQuote = tweetifyQuote(data);
        showTweetButton();
        typeWrite(data);
        displayQuote(data);
      } // Ajax success function
    }); // outer Ajax call
  }); // Desktop icon event listener

  //Cursor blink function
  setInterval(function() { 
    cursor.classList.toggle("cursorOn");
  },
  950);
}); // document.ready()

$(document).keypress(function(event){
  //alert(String.fromCharCode(event.which));
  var keyPressed = String.fromCharCode(event.which);
  if (keyPressed.toLowerCase() === "r") {
    alert("Generating new quote!");
  }
});