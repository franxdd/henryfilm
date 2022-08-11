import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/components/_Carrito.scss";
import {
  getHistorial
  } from "../../Redux/Actions/Actions";
import tusFavoritos from "../../img/tusfavoritos.png"
import { useParams } from "react-router-dom";

function Historiales() {
    let dispatch = useDispatch()
    var {id} = useParams()

    useEffect(()=>{
        dispatch(getHistorial(id))
    }, [])
    
    let historial = useSelector((state)=> state.historial)

    console.log(historial.compras)
  return (
    <div className="container">
            HISTORIALESSSSSSSS
    </div>
  );
}

export default Historiales;
