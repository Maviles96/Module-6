// https://www.omdbapi.com/?s=marvel&apikey=d7d0b17d

let page = 1;

async function getMovies() {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?s=marvel&apikey=d7d0b17d&page=${page}`
    );

    const data = await res.json();

    data.Search.forEach(async movie => {
      if (movie.Poster === "N/A") return;

      const detailsRes = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=d7d0b17d`
      );

      const details = await detailsRes.json();

      document.getElementById("movie-list").innerHTML += 
        `<div class="movie-card">
          <img src="${movie.Poster}" onerror="this.parentElement.remove()" />
          <h2>${movie.Title}</h2>
          <p>IMDb: ${details.imdbRating}</p>
        </div>`
      ;
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

document.getElementById("load-more").addEventListener("click", () => {
  page++;
  getMovies();
});
getMovies(); 

const hamMenu = document.querySelector(`.ham-menu`);

const offScreenMenu = document.querySelector(`.off-screen-menu`);

hamMenu.addEventListener(`click`, () => {
  hamMenu.classList.toggle(`active`);
  offScreenMenu.classList.toggle(`active`);
})