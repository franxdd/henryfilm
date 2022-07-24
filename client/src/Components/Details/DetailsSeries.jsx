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
  console.log(seriesDetail);

  return (
    <div>
      <div>
        <h1>
          {seriesDetail.length && seriesDetail.map((e) => <div>{e.name}</div>)}
        </h1>
      </div>
      <div>
        <img
          src={seriesDetail.length && seriesDetail.map((e) => e.backDropImagen)}
        />
      </div>
      <div>
        <h3>
          Mejor Votacion:{" "}
          {seriesDetail.length && seriesDetail.map((e) => e.vote_average)}
        </h3>
      </div>
      <div>{seriesDetail.length && seriesDetail.map((e) => e.overview)}</div>
      <div>
        {seriesDetail.length &&
          seriesDetail.episode_run_time?.map((e) => {
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
          {seriesDetail.length &&
            seriesDetail.genres?.map((e) => {
              return <div>{e.name}</div>;
            })}
        </h3>
      </div>

      <div>
        <h3>
          Productoras:{" "}
          {seriesDetail.length &&
            seriesDetail.production_companies?.map((e) => {
              return <div>{e.name}</div>;
            })}
        </h3>
      </div>
      <div>
        <h3>
          Numero de episodios:{" "}
          {seriesDetail.length && seriesDetail.map((e) => e.number_of_episodes)}
        </h3>
      </div>
      <div>
        <h3>
          Numero de Temporadas:{" "}
          {seriesDetail.length && seriesDetail.map((e) => e.number_of_seasons)}
        </h3>
      </div>
    </div>
  );
}

export default DetailsSeries;
