import React from "react";
import { Link } from "react-router-dom";
import "./_CardMovies.scss"

function CardMovies({ id, name, poster }) {
  return (
    <div className="card">
    <div className="card-img">
      <img src={poster} /></div>
      <div className="card-info">
        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor"></path></svg>
        <p className="text-title">{name}</p>
        <p className="text-body">Lorem Ipsum dolor sit amet</p>
        <Link to={`/home/peliculas/${id}`}>
    <button className="card-button"> + Info</button>
    </Link>
  </div>
</div>
  );
}
export default CardMovies;
