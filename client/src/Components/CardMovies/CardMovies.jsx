// import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/components/_CardMovies.scss";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, deleteMovie } from "../../Redux/Actions/Actions";
import { TiHeart as HeartIcon } from "react-icons/ti";
import { BiEdit as EditIcon } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

function CardMovies({ id, name, poster, tipo }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userReducer = useSelector((state) => state.user);

  function HandleDelete(e) {
    e.preventDefault();
    var arrAux = [id, tipo];
    dispatch(deleteMovie(arrAux));
  }

  function addCart(id) {
    // console.log(id)

    dispatch(addToCart(id));
  }

  function addWishlist(id) {
    dispatch(addToWishlist(id));
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <div className="Cardmovies">
      <div className="card">
        <div className="card-img">
          <img src={poster} alt="poster" />
        </div>
        <div className="card-info">
          {userReducer.isAdmin ? (
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
              <abbr title="Modificar">
                <Link to={`/home/modificar/${id}/${tipo}`}>
                  <EditIcon className="iconoEdit" />
                </Link>
              </abbr>
              <abbr title="Eliminar">
                <div onClick={(e) => HandleDelete(e)}>
                  <BiTrash className="iconoEdit" />
                </div>
              </abbr>
              <abbr title="Añade al carrito">
                <span onClick={() => addCart(id)}>
                  <ShopIcon className="iconoShop" />
                </span>
              </abbr>
            </div>
          ) : userReducer.length !== 0 ? (
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
          ) : (
            <></>
          )}

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
