import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      price += e.price;
    });
    settotalItems(items);
    settotalPrecio(price);
  }, [carrito, totalItems, totalPrecio, settotalItems, settotalPrecio]);

  useEffect(() => {

    console.log(carrito)

    localStorage.setItem("cart", JSON.stringify(carrito));

  },[carrito]);


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
