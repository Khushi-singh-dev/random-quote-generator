let favoritesContainer = document.getElementById("favoritesContainer");

let favCount = document.getElementById("favCount");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateCount() {
  favCount.innerText = `Favorites: ${favorites.length}`;
}

function showFavorites() {
  favoritesContainer.innerHTML = "";

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorite quotes yet.</p>";

    return;
  }

  favorites.forEach(function (item, index) {
    let div = document.createElement("div");

    div.classList.add("favoriteQuote");

    div.innerHTML = `

            <p>${item.quote}</p>

            <br>

            <small>- ${item.author}</small>

            <br><br>

            <button class="btn">

                Remove

            </button>

        `;

    let removeBtn = div.querySelector(".btn");

    removeBtn.addEventListener("click", function () {
      favorites.splice(index, 1);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      updateCount();

      showFavorites();
    });

    favoritesContainer.appendChild(div);
  });
}

updateCount();

showFavorites();
