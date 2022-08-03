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

  var totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].price);
    totalPrice = totalPrice + cart[i].price
  }

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
                image={e.posterImagen}
                tipo={e.tipo}
                precio={e.price}
              />
            );
          })}
      </div>
      <div>
        <div className="containerTotal">
        <div>
          <h4>Resumen</h4>
          <p>
            <h5>Cantidad: </h5>
            <h6>{totalItems}</h6>
          </p>
          <p>
            <h5>Total: </h5>
            <h6>${totalPrice}.00</h6>
          </p>
          <button className="submit formEntry2">
            COMPRAR
          </button>
        </div>
       </div>
      </div>
    </div>
  );
}

export default Carro;
