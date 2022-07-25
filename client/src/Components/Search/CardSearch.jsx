import React from "react";
import {MdAddShoppingCart as ShopIcon} from "react-icons/md";
import { Link } from "react-router-dom";

function CardSearch({ id, name, poster, tipo }) {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  return (
    <div class="card">
      <div class="card-img">
        <img src={poster} />
      </div>
      <div class="card-info">
      <ShopIcon className="iconoShop"/>
        <p class="text-title">{name}</p>
        <p class="text-body">${(Math.ceil(getRandomArbitrary(15, 30)))}</p>
        <Link to={`/home/${tipo}s/${id}`}>
          <button class="card-button"> + Info</button>
        </Link>
      </div>
    </div>
  );
}

export default CardSearch;
