
// Variable definitions
var quoteSpace = document.querySelector("#message");
var authorSpace = document.querySelector("#author");
var getMessage = document.querySelector(".getMessage");
var tweet = document.querySelector(".tweet");
var quoteString;
var authorString;
var data;
var x;

// "GENERATE" BUTTON

//"Generate" button event listener
getMessage.addEventListener("click", (e)=> {
  //Remove the current quote and author
  quoteSpace.innerHTML = "";
  authorSpace.innerHTML = "";

  //  Getting data from the api with ajax
  var request = new XMLHttpRequest();
  request.open("GET", "https://random-quote-generator.herokuapp.com/api/quotes/");
  
  // Asyncronous request
  //Turning data into JSON
  request.onload = function(){
    data = JSON.parse(request.responseText);
    // Validate each quote length to be twitter eligible
    var validateTweets = data.filter( (item)=>{
      return item.quote && item.author && (item.quote.length + item.author.length) < 280
      
      });
    
    // creating the random variable
    x = Math.floor(Math.random()* validateTweets.length - 1);
    
    // Render in html
    renderHTML(validateTweets, x);
  };
  // sending the request to the api
  request.send();
});

// Once we have the data, we want to convert it to HTML
function renderHTML (quote, x){
  //concatenating the strings elements
  
  quoteString = quote[x].quote;
  authorString = quote[x].author;
  
  
  quoteSpace.insertAdjacentHTML("beforeend", quoteString);
  authorSpace.insertAdjacentHTML("beforeend", authorString);
  
};

// "TWEET IT!" BUTTON

// Generating event listener
tweet.addEventListener("click", () =>{
  
  //Generating the  Twitter link containing the quote
  
  var twtLink = 'http://twitter.com/home?status=' +'"' + encodeURIComponent(quoteString) + '"' + " - " + encodeURIComponent(authorString);

  //Opening a new window with the generated link
 window.open(twtLink,'_blank');
})
  
;





