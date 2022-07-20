import React from "react";
function CardMovies({ name, poster }) {
  console.log(name);

  return (
    <div>
      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <img src={poster} alt="poster" />
      </div>
    </div>
  );
}
export default CardMovies;
