const url = "https://www.omdbapi.com/?apikey=9aa0be00";

import { movies, searchInput, addMovieToList } from "./dom.js";
import { getData } from "./fetch.js";

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
    if (search.length > 3) {
      getData(`${url}&s=${search}`)
        .then((res) => {
          movies.innerHTML = "";
          res.forEach((element) => addMovieToList(element));
        })
        .catch((err) => (movies.innerHTML = ""));
    }
  }, 2000);
});
