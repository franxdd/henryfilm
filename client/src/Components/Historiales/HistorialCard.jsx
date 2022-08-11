// import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCart } from "../../Redux/Actions/Actions";
import "../../Styles/components/_HistorialCard.scss";
import { MdDeleteForever } from "react-icons/md";
import "../../Styles/components/_Total.scss";
import { GiArchiveResearch } from "react-icons/gi";

function HistorialCard({ id, nombre, image, qty, tipo, precio }) {
  const dispatch = useDispatch();
  function handleDelete(id) {
    dispatch(removeCart(id));
  }
  return (
    <div className="cardCarrito">
      <div className="cardImg2">
        <img src={image} alt={nombre} height="180px" width="120px" />
      </div>
      <div className="cardInfo2">
        <p className="textNameCarrito">{nombre}</p>
      </div>
      <div className="cardInfo3">
        <p className="textDetalle"> Tipo: {tipo} </p>
      </div>

      <div className="cardAbajo">
        <p className="textNameCarrito">${precio}</p>
        <abbr title="Detalle">
          <Link to={`/home/${tipo}s/${id}`}>
            <GiArchiveResearch className="IconoDetalle" />
          </Link>
        </abbr>
      </div>
    </div>
  );
}

export default HistorialCard;
