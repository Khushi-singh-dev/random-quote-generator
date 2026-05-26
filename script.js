let colors = [
  "linear-gradient(to right, #ff5733, #ff7151, #ffb593)",
  "linear-gradient(to right, #10be00, #44ce37, #baffac)",
  "linear-gradient(to right, #0059ff, #3795ff, #9cd9ff)",
  "linear-gradient(to right, #ff0090, #ff4bb1, #ff8fcd)",
  "linear-gradient(to right, #9000ff, #b14aff, #e881ff)",
  "linear-gradient(to right, #ff0000, #ff4b4b, #ff9e9e)",
  "linear-gradient(to right, #ffbf00, #ffd145, #ffe696)",
];

let favBtn = document.getElementById("favBtn");

let favoritesContainer = document.getElementById("favoritesContainer");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let currentQuote = "";
let currentAuthor = "";

async function getQuote() {
  try {
    quotePara.textContent = "Loading...";
    authorPara.textContent = "";

    let selectedCategory = category.value;

    let URL = `https://dummyjson.com/quotes/random?tags=${selectedCategory}`;

    let response = await fetch(URL);
    let data = await response.json();

    quotePara.textContent = data.quote;
    authorPara.textContent = "- " + data.author;
    currentQuote = data.quote;
    currentAuthor = data.author;
    favBtn.innerText = "🤍";
    Msg.textContent = "";

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let exists = favorites.some(function (item) {
      return item.quote === currentQuote;
    });

    if (exists) {
      favBtn.innerText = "❤️";
    } else {
      favBtn.innerText = "🤍";
    }

    // Change background color randomly
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
  } catch (error) {
    quotePara.textContent = "Failed to load quote.";
    authorPara.textContent = "";
    console.log("error: ", error);
    Msg.textContent = "";
  }
}

favBtn.addEventListener("click", function () {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  let quoteData = {
    quote: currentQuote,

    author: currentAuthor,
  };

  let alreadyExists = favorites.some(function (item) {
    return item.quote === quoteData.quote;
  });

  if (alreadyExists) {
    alert("Quote already added!");

    return;
  }

  favorites.push(quoteData);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  favBtn.innerText = "❤️";

  updateFavoritesCount();
});

function updateFavoritesCount() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  document.getElementById("favCount").innerText =
    `Favorites: ${favorites.length}`;
}

function showFavorites() {
  favoritesContainer.innerHTML = "";

  favorites.forEach(function (item, index) {
    let div = document.createElement("div");

    div.classList.add("favoriteQuote");

    div.innerHTML = `

            <p>${item.quote}</p>

            <small>- ${item.author}</small>

            <br><br>

            <button class="removeBtn">
                ❌ Remove
            </button>

        `;

    let removeBtn = div.querySelector(".removeBtn");

    removeBtn.addEventListener("click", function () {
      favorites.splice(index, 1);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      showFavorites();

      updateFavoritesCount();
    });

    favoritesContainer.appendChild(div);
  });
}

let category = document.getElementById("category");
const quotePara = document.getElementById("quoteText");
const authorPara = document.getElementById("quoteAuthor");
const quoteBtn = document.getElementById("quoteBtn");
const copyBtn = document.getElementById("copyBtn");
let Msg = document.querySelector(".msg");

function copyQuote() {
  let fullPara = quotePara.textContent + " " + authorPara.textContent;

  navigator.clipboard.writeText(fullPara).then(() => {
    Msg.textContent = "Quote Copied!";
    Msg.style.color = "green";
  });
}

quoteBtn.addEventListener("click", getQuote);
copyBtn.addEventListener("click", copyQuote);
showFavorites();
updateFavoritesCount();
