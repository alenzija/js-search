const getData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (json.Error) throw Error(json.Error);
      return json.Search;
    });

export { getData };
