import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WishlistCard from "./WishlistCard";
import "../../Styles/components/_Carrito.scss"

function Wishlist() {
  const [totalItems, settotalItems] = useState([]);
  const { wishlist } = useSelector((state) => state);

  useEffect(() => {
      settotalItems(wishlist.length);
  }, [wishlist]);

  return (
    <div className="container">
      <div className = "containerCarrito">
        {wishlist &&
          wishlist.map((w) => {
            return (
              <WishlistCard
                key={w.id}
                id={w.id}
                nombre={w.name}
                image={w.posterImagen}
                tipo={w.tipo}
                precio={w.price}
              />
            );
          })}
      </div>
      <div>
        <div className="containerTotal">
        <div>
          <p>
            <h5>Cantidad agregadas: </h5>
            <h6>{totalItems}</h6>
          </p>
          <button className="submit formEntry2">
            Agregar al carrito
          </button>
        </div>
       </div>
      </div>
    </div>
  );
}

export default Wishlist;
