const container = document.querySelector(".container");
const movies = document.querySelector(".movies");
const searchInput = document.querySelector("#search");
/*
function getData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => {
      console.log(xhr.response);
    };
    xhr.send();
  });
}
*/

function createElement(teg, atr = {}, parent = document.body) {
  const element = document.createElement(teg);
  Object.keys(atr).forEach((el) => {
    el !== "innerHTML"
      ? element.setAttribute(el, atr[el])
      : (element.innerHTML = atr[el]);
  });
  parent.append(element);
  return element;
}

const getData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (json.Error) throw Error(json.Error);
      return json.Search;
    });

addMovieToList = (current) => {
  const movie = createElement("div", { class: "movies-item" }, movies);
  createElement(
    "img",
    {
      src: /\.jpe?g$/.test(current.Poster)
        ? current.Poster
        : "img/not-pictured.png",
      alt: current.Title,
      title: current.Title,
      class: "movies-item__img",
    },
    movie
  );
  createElement(
    "h4",
    { class: "movies-item__title", innerHTML: current.Title },
    movie
  );
};

const delay = (() => {
  let timer;
  return (cb, ms) => {
    clearTimeout(timer);
    timer = setTimeout(cb, ms);
  };
})();

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") e.preventDefault();
});

searchInput.addEventListener("keyup", (e) => {
  delay(() => {
    const search = e.target.value.trim();
    const url = `http://www.omdbapi.com/?apikey=5c35cd39&s=${search}`;
    getData(url)
      .then((res) => {
        movies.innerHTML = "";
        res.forEach((element) => addMovieToList(element));
      })
      .catch((err) => (movies.innerHTML = ""));
  }, 2000);
});
