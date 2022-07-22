import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesDetail } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";

function DetailMovie() {
  let { id } = useParams();
  const dispatch = useDispatch();
  let movieDetail = useSelector((state) => state.movieDetail);
  useEffect(() => {
    dispatch(getMoviesDetail(id));
    console.log(movieDetail);
  }, []);
  return (
    <div>
      <div>
        <h1>{movieDetail.title}</h1>
      </div>
      <div>{movieDetail.vote_average}</div>
      <div>{movieDetail.overview}</div>
      <div>{movieDetail.runtime} min</div>

      {movieDetail.genres?.map((e) => {
        return <div>{e.name}</div>;
      })}

      <div>
        {movieDetail.production_companies?.map((e) => {
          return <div>{e.name}</div>;
        })}
      </div>
    </div>
  );
}

export default DetailMovie;
