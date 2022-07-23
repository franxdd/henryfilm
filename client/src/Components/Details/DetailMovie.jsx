import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesDetail, willunmont2 } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";

function DetailMovie() {
  let { id } = useParams();
  const dispatch = useDispatch();
  let movieDetail = useSelector((state) => state.movieDetail);
  useEffect(() => {
    dispatch(getMoviesDetail(id));
    return () => dispatch(willunmont2());
  }, []);
  return (
    <div>
      <div>
        <h1>{movieDetail[0]?.name}</h1>
      </div>
      <div>
        <img src={movieDetail[0]?.backDropImagen} />
      </div>
      <div>Votacion Promedio: {movieDetail[0]?.vote_average}</div>
      <div>Vision General: {movieDetail[0]?.overview}</div>
      <div>Duracion: {movieDetail[0]?.runtime} min</div>
      <div>Popularidad: {movieDetail[0]?.popularity}</div>
      <div>
        Generos:
        {movieDetail[0]?.genres.map((e) => {
          return <div>{e.name}</div>;
        })}
      </div>

      <div>
        Compañias Productoras:
        {movieDetail[0]?.production_companies.map((e) => {
          return <div>{e.name}</div>;
        })}
      </div>
    </div>
  );
}

export default DetailMovie;
