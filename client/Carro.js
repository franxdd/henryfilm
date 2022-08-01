import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarritoCard from "../CarritoCard/CarritoCard";
import "../../Styles/components/_Carrito.scss"
function Carro() {
  const dispatch = useDispatch();
  const [totalPrecio, settotalPrecio] = useState(0);
  const [totalItems, settotalItems] = useState([]);
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    if (cart) {
      cart &&
        cart.forEach((e) => {
          settotalPrecio(totalPrecio + e.price);
        });
      settotalItems(cart.length);
    }
  }, [cart]);

  return (
    <div className="container">
      <div className = "containerCarrito">
        {cart &&
          cart.map((e) => {
            return (
              <CarritoCard
                key={e.id}
                id={e.id}
                nombre={e.name}
                image={e.backDropImagen}
                tipo={e.tipo}
                precio={e.price}
              />
            );
          })}
      </div>
      <div>
        <h1>Carro</h1>
        <div>
          <span>Total: {totalItems} </span>
          <span>Precio: ${totalPrecio}</span>
        </div>
      </div>
    </div>
  );
}

export default Carro;
