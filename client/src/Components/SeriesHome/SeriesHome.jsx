import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardSeries from "../CardSeries/CardSeries";
import { getAllSeries } from "../../Redux/Actions/Actions";
import Paginacion from "./PaginadoSeries";
import "./_SeriesHome.scss"

function SeriesHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSeries());
  }, [dispatch]);
  let allSeries = useSelector((state) => state.allSeries);
  const [pagina, setPagina] = useState(1);
  const porPagina = 12;
  const ultPag = pagina * porPagina;
  const priPag = ultPag - porPagina;
  let allpSeries = allSeries?.slice(priPag, ultPag);

  const maximo = allSeries?.length / porPagina;
  return (
    <div>
    <div className="contenedor-seccion">
    <div className="contenedor-resultados">
      {allpSeries.map((e) => {
        return <CardSeries key={e.id} id={e.id} name={e.name} poster={e.posterImagen} />;
      })}
      </div>
    </div>
    <div className="containerPag">
    <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
      </div>
  );
}
export default SeriesHome;
