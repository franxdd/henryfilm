import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/components/_CardMovies.scss";
import {MdAddShoppingCart as ShopIcon} from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../../Redux/Actions/Actions";

function CardMovies({ id, name, poster }) {
  const dispatch = useDispatch();

  function addCart(id) {
    
    dispatch(addToCart(id));
  }

  function addWishlist(id) {
    dispatch(addToWishlist(id));
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  // console.log(Math.ceil(getRandomArbitrary(1, 50)))
  return (
    <div className="Cardmovies">
    <div className="card">
      <div className="card-img">
        <img src={poster} alt="poster"/>
      </div>
      <div className="card-info">
        <span onClick={() => addCart(id)}>
          <ShopIcon className="iconoShop" />
        </span>
        <button onClick={() => addWishlist(id)}>Add</button>
        {/* ^^^^^^^Este es el boton de la wishlist para cambiar^^^^ */}
        <p className="text-title">{name}</p>
        <p className="text-body">${Math.ceil(getRandomArbitrary(15, 30))}</p>
        <Link to={`/home/peliculas/${id}`}>
          <button className="card-button"> + Info</button>
        </Link>
      </div>
    </div>
    </div>
  );
}
export default CardMovies;
