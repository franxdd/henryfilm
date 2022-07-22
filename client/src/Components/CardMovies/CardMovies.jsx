import React from "react";
import { Link } from "react-router-dom";

function CardMovies({ id, name, poster }) {
  return (
    <Link to={`/home/peliculas/${id}`}>
      <div>
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          <img src={poster} alt="poster" width="200px" height="350px" />
        </div>
      </div>
<<<<<<< HEAD
    </Link>
=======
      <div>
        <img src={poster} alt="poster" width="300px" height="450px" />
      </div>
    </div>
>>>>>>> b67a49de986b6bd91693857ce6a42a40682a4fe2
  );
}
export default CardMovies;
