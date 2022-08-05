import React from "react";
import { useDispatch } from "react-redux";
import { addToCart,removeToWishlist } from "../../Redux/Actions/Actions";
import "../../Styles/components/_CarritoCard.scss"
import {MdDeleteForever} from "react-icons/md";
import {MdAddShoppingCart as ShopIcon} from "react-icons/md";

function WishlistCard({ id, nombre, image, qty, tipo, precio }) {
  const dispatch = useDispatch();
  function handleDelete(id) {
    // console.log(id);
    dispatch(removeToWishlist(id));
  }
  function addCart(id) {
    dispatch(addToCart(id));
  }
  return (
    <div className="cardCarrito">
      <div className="cardImg2">
        <img src={image} alt={nombre} height="180px" width="120px"   />
        {/* <img src={image} alt={nombre} height="130px" width="200px" /> */}
      </div>
      <div className="cardInfo2">
        <p className="textNameCarrito">{nombre}</p>
        </div>
        <div className="cardInfo3">
        <p className="textDetalle"> Es {tipo} </p>
      </div>

       <div class="cardAbajo">
       <p className="textNameCarrito">${precio}</p>
    
        <span className="spanCompras" onClick={() => addCart(id)}>
          <ShopIcon className="iconoShop" />
        </span>
       <span className="spanDelete" onClick={() => handleDelete(id)}>
        <MdDeleteForever className="iconoDelete" />
        </span>
      </div>
      </div>
  );
}

export default WishlistCard;