import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardSeries from "../CardSeries/CardSeries";
import { getAllSeries } from "../../Redux/Actions/Actions";
import Paginacion from "./PaginadoSeries";

function SeriesHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSeries());
  }, [dispatch]);
  let allSeries = useSelector((state) => state.allSeries);
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;
  const ultPag = pagina * porPagina;
  const priPag = ultPag - porPagina;
  let allpSeries = allSeries?.slice(priPag, ultPag);

  const maximo = allSeries?.length / porPagina;
  return (
    <div>
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      {allpSeries.map((e) => {
        return <CardSeries key={e.id} id={e.id} name={e.name} poster={e.posterImagen} />;
      })}
    </div>
  );
}

export default SeriesHome;
