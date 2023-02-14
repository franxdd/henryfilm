import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/components/_Carrito.scss";
import { getHistorial } from "../../Redux/Actions/Actions";
import tusFavoritos from "../../img/tusfavoritos.png";
import { useParams } from "react-router-dom";
import HistorialCard from "./HistorialCard";
import misCompras from "../../img/miscompras.png"

function Historiales() {
  let dispatch = useDispatch();
  var { id } = useParams();

  useEffect(() => {
    dispatch(getHistorial(id));
  }, []);

  let historial = useSelector((state) => state.historial);

  console.log(historial.compras);
  return (
    <div className="container">
      <h3>
        <img
          className="logo"
          src={misCompras}
          alt="Logo"
          height="auto"
          width="280px"
        />
      </h3>
      <div className="containerCarrito">
        {historial.compras &&
          historial.compras.map((e) => {
            return (
              <HistorialCard
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
    </div>
  );
}

export default Historiales;
