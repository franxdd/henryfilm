import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardSeries from "../CardSeries/CardSeries";
import { getAllSeries } from "../../Redux/Actions/Actions";

function SeriesHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSeries());
  }, [dispatch]);
  let allSeries = useSelector((state) => state.allSeries);
  return (
    <div>
      {allSeries.map((e) => {
        return <CardSeries key={e.id} name={e.name} poster={e.poster_path} />;
      })}
    </div>
  );
}

export default SeriesHome;
