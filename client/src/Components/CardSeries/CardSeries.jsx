import { React } from "react";
import { Link } from "react-router-dom";

import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Actions/Actions";

function CardSeries({ id, name, poster }) {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const dispatch = useDispatch();

  function addCart(id) {
    dispatch(addToCart(id));
  }
  
 console.log(id)



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
        <Link to={`/home/series/${id}`}>
          <button className="card-button"> + Info</button>
        </Link>
      </div>
    </div>
  );
}
export default CardSeries;
