import React from "react";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import { Link } from "react-router-dom";

function CardSearch({ id, name, poster, tipo }) {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  return (
    <div className="card">
      <div className="card-img">
        <img src={poster} />
      </div>
      <div className="card-info">
        <ShopIcon className="iconoShop" />
        <p className="text-title">{name}</p>
        <p className="text-body">${Math.ceil(getRandomArbitrary(15, 30))}</p>
        <Link to={`/home/${tipo}s/${id}`}>
          <button className="card-button"> + Info</button>
        </Link>
      </div>
    </div>
  );
}

export default CardSearch;
