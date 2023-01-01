const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const movies = []; //電影總清單
let filteredMovies = []; //搜尋清單

const MOVIES_PER_PAGE = 12;

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
const cardListSwap = document.querySelector("#card-list-swap");

//render card
function renderCardStyle(data) {
  let rawHTML = "";
  data.forEach((item) => {
    // title, image, id
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${
          POSTER_URL + item.image
        }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button 
            class="btn btn-primary 
            btn-show-movie" 
            data-bs-toggle="modal" 
            data-bs-target="#movie-modal" 
            data-id="${item.id}"
          >
            More
          </button>
          <button 
            class="btn btn-info btn-add-favorite" 
            data-id="${item.id}"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>`;
  });
  return rawHTML;
}
//render list
function renderListStyle(data) {
  let rawHTML = "";
  data.forEach((item) => {
    // title, image, id
    rawHTML += `
      <div class="list-group-item">
        <div class="list-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="list-footer btn-set-right">
          <button 
            class="btn btn-primary 
            btn-show-movie" 
            data-bs-toggle="modal" 
            data-bs-target="#movie-modal" 
            data-id="${item.id}"
          >
            More
          </button>
          <button 
            class="btn btn-info btn-add-favorite" 
            data-id="${item.id}"
          >
            +
          </button>
        </div>
      </div>`;
  });
  return rawHTML;
}

function changeButtonStyle(style) {
  if (style === "card") {
    document.getElementById("card-button").style.backgroundColor = "aquamarine";
    document.getElementById("list-button").style.backgroundColor = "";
    return;
  }
  if (style === "list") {
    document.getElementById("list-button").style.backgroundColor = "aquamarine";
    document.getElementById("card-button").style.backgroundColor = "";
    return;
  }
}

function renderMovieList(data) {
  const pageStyle = JSON.parse(localStorage.getItem("pageStyle")) || "card";
  let rawHTML = "";
  if (pageStyle === "card") {
    rawHTML = renderCardStyle(data);
  } else {
    rawHTML = renderListStyle(data);
  }
  dataPanel.innerHTML = rawHTML;
  changeButtonStyle(pageStyle);
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);
  let rawHTML = "";

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }
  paginator.innerHTML = rawHTML;
}

function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies;
  let startIndex = (page - 1) * MOVIES_PER_PAGE;
  //if (data.length < startIndex) startIndex = data.length;
  if (page > 1) startIndex = 1;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

function showMovieModal(id) {
  // get elements
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  // send request to show api
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;

    // insert data into modal ui
    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster" class="img-fluid">`;
  });
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);

  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已經在收藏清單中！");
  }

  list.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

// listen to data panel
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(event.target.dataset.id);
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

function noEnter(e) {
  e = e || window.event;
  var key = e.keyCode || e.charCode;
  return key !== 13;
}

//listen to search form
searchForm.addEventListener("keyup", function onSearchFormKeyup(event) {
  event.preventDefault();
  let keyword = searchInput.value.trim().toLowerCase();
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  console.log(keyword);
  if (filteredMovies.length === 0) {
    alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`);
  }
  while (keyword.length > 0 && filteredMovies.length === 0) {
    keyword = keyword.substr(0, keyword.length - 1);
    searchInput.value = keyword;
    filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword)
    );
  }

  if (keyword !== "") {
    renderMovieList(getMoviesByPage(1));
    renderPaginator(filteredMovies.length);
  } else if (keyword.length === 0) {
    const page = Number(JSON.parse(localStorage.getItem("pageIndex")) || 1);
    renderMovieList(getMoviesByPage(page));
    renderPaginator(movies.length);
  }
});

// listen to paginator
paginator.addEventListener("click", function onPaginatorClicked(event) {
  if (event.target.tagName !== "A") return;

  const page = Number(event.target.dataset.page);
  renderMovieList(getMoviesByPage(page));
  localStorage.setItem("pageIndex", JSON.stringify(page));
});

// listen to card list swap
cardListSwap.addEventListener("click", function onSwapClicked(event) {
  const page = Number(JSON.parse(localStorage.getItem("pageIndex")) || 1);
  //console.log("page: " + page);
  if (event.target.id === "list-button") {
    event.target.style.backgroundColor = "aquamarine";
    document.getElementById("card-button").style.backgroundColor = "";
    localStorage.setItem("pageStyle", JSON.stringify("list"));
    if (filteredMovies.length > 0) renderMovieList(filteredMovies);
    else renderMovieList(getMoviesByPage(page));
  } else if (event.target.id === "card-button") {
    // card
    event.target.style.backgroundColor = "aquamarine";
    document.getElementById("list-button").style.backgroundColor = "";
    localStorage.setItem("pageStyle", JSON.stringify("card"));
    if (filteredMovies.length > 0) renderMovieList(filteredMovies);
    else renderMovieList(getMoviesByPage(page));
  }
});

// send request to index api
axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results);
    renderPaginator(movies.length);
    const page = Number(JSON.parse(localStorage.getItem("pageIndex")) || 1);
    renderMovieList(getMoviesByPage(page));
  })
  .catch((err) => console.log(err));
