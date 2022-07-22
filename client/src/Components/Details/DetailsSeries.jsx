import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeriesDetail } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
function DetailsSeries() {
  let { id } = useParams();
  const dispatch = useDispatch();
  let seriesDetail = useSelector((state) => state.seriesDetail);
  useEffect(() => {
    dispatch(getSeriesDetail(id));
  }, []);
  // console.log(Array.isArray(seriesDetail.episode_run_time));

  return (
    <div>
      <div>
        <h1>{seriesDetail.name}</h1>
      </div>
      <div>{seriesDetail.vote_average}</div>
      <div>{seriesDetail.overview}</div>
      <div>
        {seriesDetail.episode_run_time?.map((e) => {
          return <div>{e}</div>;
        })}
      </div>

      {seriesDetail.genres?.map((e) => {
        return <div>{e.name}</div>;
      })}

      <div>
        {seriesDetail.production_companies?.map((e) => {
          return <div>{e.name}</div>;
        })}
      </div>
      <div>{seriesDetail.number_of_episodes}</div>
      <div>{seriesDetail.number_of_seasons}</div>
    </div>
  );
}

export default DetailsSeries;
