import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/components/_CardMovies.scss";
import {MdAddShoppingCart as ShopIcon} from "react-icons/md";

function CardMovies({ id, name, poster }) {
  function getRandomArbitrary(min, max) {
   return Math.random() * (max - min) + min;
 }
  // console.log(Math.ceil(getRandomArbitrary(1, 50)))
  return (
    <div class="card">
      <div class="card-img">
        <img src={poster} />
      </div>
      <div class="card-info">
        <ShopIcon className="iconoShop"/>
        <p class="text-title">{name}</p>
        <p class="text-body">${(Math.ceil(getRandomArbitrary(15, 30)))}</p>
        <Link to={`/home/peliculas/${id}`}>
          <button class="card-button"> + Info</button>
        </Link>
      </div>
    </div>
  );
}
export default CardMovies;
