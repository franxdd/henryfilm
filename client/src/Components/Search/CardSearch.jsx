import React from "react";

import { Link } from "react-router-dom";

function CardSearch({ id, name, poster, tipo }) {
  return (
    <Link to={`/home/${tipo}s/${id}`}>
      <div>
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          <img src={poster} alt="poster" width="200px" height="350px" />
        </div>
      </div>
    </Link>
  );
}

export default CardSearch;
