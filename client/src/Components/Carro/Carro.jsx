import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../Redux/Actions/Actions";
import CarritoCard from "../CarritoCard/CarritoCard";
function Carro() {
  const dispatch = useDispatch();
  const [totalPrecio, settotalPrecio] = useState(0);
  const [totalItems, settotalItems] = useState(0);
  const carrito = useSelector((state) => state.cart);

  useEffect(() => {
    let items = 0;
    let price = 0;
    carrito.forEach((e) => {
      items += e.qty;
    });
    settotalItems(items);
  }, [carrito, totalItems, totalPrecio, settotalItems, settotalPrecio]);
  console.log(carrito);
  return (
    <div>
      <div>
        {carrito.map((e) => {
          return (
            <CarritoCard
              key={e.id}
              id={e.id}
              nombre={e.name}
              image={e.backDropImagen}
              qty={e.qty}
              tipo={e.tipo}
            />
          );
        })}
      </div>
      <div>
        <h1>Carro</h1>
        <div>
          <span>Total: {totalItems}</span>
          <span>Precio: </span>
        </div>
      </div>
    </div>
  );
}

export default Carro;
