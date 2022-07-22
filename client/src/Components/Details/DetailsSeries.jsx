import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeriesDetail, willunmont } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
function DetailsSeries() {
  let { id } = useParams();
  const dispatch = useDispatch();
  let seriesDetail = useSelector((state) => state.seriesDetail);
  useEffect(() => {
    dispatch(getSeriesDetail(id));
    return () => dispatch(willunmont());
  }, []);
  console.log(seriesDetail[0]);

  return (
    <div>
      <div>
        <h1>{seriesDetail[0]?.name}</h1>
      </div>
      <div>
        <img src={seriesDetail[0]?.backDropImagen} alt="backimg" />
      </div>
      <div>
        <h3>Mejor Votacion: {seriesDetail[0]?.vote_average}</h3>
      </div>
      <div>{seriesDetail[0]?.overview}</div>
      <div>
        {seriesDetail[0]?.episode_run_time?.map((e) => {
          return (
            <div>
              <h3>Duracion: {e}</h3>
            </div>
          );
        })}
      </div>
      <div>
        <h3>
          Generos:{" "}
          {seriesDetail[0]?.genres?.map((e) => {
            return <div>{e.name}</div>;
          })}
        </h3>
      </div>

      <div>
        <h3>
          Productoras:{" "}
          {seriesDetail[0]?.production_companies?.map((e) => {
            return <div>{e.name}</div>;
          })}
        </h3>
      </div>
      <div>
        <h3>Numero de episodios: {seriesDetail[0]?.number_of_episodes}</h3>
      </div>
      <div>
        <h3>Numero de Temporadas: {seriesDetail[0]?.number_of_seasons}</h3>
      </div>
    </div>
  );
}

export default DetailsSeries;
