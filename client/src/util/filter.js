const filterGenres = (array, genres) => {
  var new_arr = [];
  var arrayPrincipal = array.slice();
  var arraux = [];
    
  if (!genres.length !== 1) {
    for (let i = 0; i < genres.length; i++) {
      arrayPrincipal.map((arr) => {
        for (let j = 0; j < arr.genre_ids.length; j++) {
          if (arr.genre_ids[j] === genres[i]) {
            arraux.push(arr);
          }
        }
      });
      arrayPrincipal = arraux.slice();
      new_arr = arrayPrincipal;
      arraux = [];
    }

    return new_arr;
  }
};

module.exports = {
  filterGenres,
};
