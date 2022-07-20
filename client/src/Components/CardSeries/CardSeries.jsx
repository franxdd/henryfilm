import React from "react";

function CardSeries({ name, poster }) {
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

export default CardSeries;
