// import { React } from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../../Redux/Actions/Actions";
import { TiHeart as HeartIcon } from "react-icons/ti";

function CardSearch({ id, name, poster, tipo }) {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const dispatch = useDispatch();

  function addCart(id) {
    dispatch(addToCart(id));
  }
  function addWishlist(id) {
    dispatch(addToWishlist(id));
  }

  return (
    <div className="card">
      <div className="card-img">
        <img src={poster} />
      </div>
      <div className="card-info">
        <div className="Iconos">
          <abbr title="Agrega a Favoritos">
            <span onClick={() => addWishlist(id)}>
              <HeartIcon className="iconoHeart" />
            </span>
          </abbr>
          <abbr title="Añade al carrito">
            <span onClick={() => addCart(id)}>
              <ShopIcon className="iconoShop" />
            </span>
          </abbr>
        </div>
        {/* ^^^^^^^Este es el boton de la wishlist para cambiar^^^^ */}
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
