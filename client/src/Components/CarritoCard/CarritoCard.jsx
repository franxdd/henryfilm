import React from "react";
import { useDispatch } from "react-redux";
import { removeCart } from "../../Redux/Actions/Actions";

function CarritoCard({ id, nombre, image, qty, tipo, precio }) {
  const dispatch = useDispatch();
  function handleDelete(id) {
    console.log(id);
   
  }

  return (
    <div>
      <div>
        <img src={image} alt={nombre} height="200px" width="200px" />
      </div>
      <div>
        <p>titulo: {nombre}</p>
        <p>detalle: Es una {tipo}</p>
        <p>$ {precio}</p>
        <div>
          <div>
            <p>Cantidad: {qty}</p>
          </div>
          <button onClick={() => handleDelete(id)}>borrar del carro</button>
        </div>
      </div>
    </div>
  );
}

export default CarritoCard;
