import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WishlistCard from "./WishlistCard";
import "../../Styles/components/_Carrito.scss";
import tusFavoritos from "../../img/tusfavoritos.png"

function Wishlist() {
  const [totalItems, settotalItems] = useState([]);
  const { wishlist } = useSelector((state) => state);

  useEffect(() => {
      settotalItems(wishlist.length);
  }, [wishlist]);

  return (
    <div className="container">
       <h3> <img className="logo" src={tusFavoritos} alt="Logo" height="auto" width="250px" /> </h3>
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
      </div>
    </div>
  );
}

export default Wishlist;
