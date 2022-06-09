export const movies = document.querySelector(".movies");
export const searchInput = document.querySelector("#search");

function createElement(teg, atr = {}, parent) {
  const element = document.createElement(teg);
  Object.keys(atr).forEach((el) => {
    el !== "innerHTML"
      ? element.setAttribute(el, atr[el])
      : (element.innerHTML = atr[el]);
  });
  parent.append(element);
  return element;
}

function addMovieToList(current) {
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
}

export { addMovieToList };
