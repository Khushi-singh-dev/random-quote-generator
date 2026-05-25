let colors = [
  "linear-gradient(to right, #ff5733, #ff7151, #ffb593)", 
  "linear-gradient(to right, #10be00, #44ce37, #baffac)", 
  "linear-gradient(to right, #0059ff, #3795ff, #9cd9ff)", 
  "linear-gradient(to right, #ff0090, #ff4bb1, #ff8fcd)", 
  "linear-gradient(to right, #9000ff, #b14aff, #e881ff)", 
  "linear-gradient(to right, #ff0000, #ff4b4b, #ff9e9e)", 
  "linear-gradient(to right, #ffbf00, #ffd145, #ffe696)"];

async function getQuote() {
  try{
    quotePara.textContent = "Loading...";
    authorPara.textContent = "";

    let selectedCategory = category.value;

    let URL = `https://dummyjson.com/quotes/random?tags=${selectedCategory}`;

    let response = await fetch(URL);
    let data = await response.json();

    quotePara.textContent = data.quote;
    authorPara.textContent = "- "+ data.author;
    Msg.textContent = "";

    // Change background color randomly
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;

  }catch(error){

    quotePara.textContent = "Failed to load quote.";
    authorPara.textContent = "";
    console.log("error: ",error);
    Msg.textContent = "";

  }
  
}

let category = document.getElementById("category");
const quotePara = document.getElementById("quoteText");
const authorPara = document.getElementById("quoteAuthor");
const quoteBtn = document.getElementById("quoteBtn");
const copyBtn = document.getElementById("copyBtn");
let Msg = document.querySelector(".msg");

function copyQuote(){
  let fullPara = quotePara.textContent+" "+authorPara.textContent;

  navigator.clipboard.writeText(fullPara).then(()=>{
    Msg.textContent = "Quote Copied!";
    Msg.style.color = "green";
  })
};

quoteBtn.addEventListener("click",getQuote);
copyBtn.addEventListener("click",copyQuote);

