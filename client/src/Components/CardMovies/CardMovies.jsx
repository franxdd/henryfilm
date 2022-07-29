import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/components/_CardMovies.scss";
import {MdAddShoppingCart as ShopIcon} from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Actions/Actions";

function CardMovies({ id, name, poster }) {
  const dispatch = useDispatch();

  function addCart(id) {
    
    dispatch(addToCart(id));
  }
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  // console.log(Math.ceil(getRandomArbitrary(1, 50)))
  return (
    <div className="card">
      <div className="card-img">
        <img src={poster} />
      </div>
      <div className="card-info">
        <span onClick={() => addCart(id)}>
          <ShopIcon className="iconoShop" />
        </span>

        <p className="text-title">{name}</p>
        <p className="text-body">${Math.ceil(getRandomArbitrary(15, 30))}</p>
        <Link to={`/home/peliculas/${id}`}>
          <button className="card-button"> + Info</button>
        </Link>
      </div>
    </div>
  );
}
export default CardMovies;
