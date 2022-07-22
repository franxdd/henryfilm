import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSeries, getAllMovies } from "../../Redux/Actions/Actions";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSeries());
    dispatch(getAllMovies());
  }, []);
  let { all } = useSelector((state) => state);
  console.log(all);
  return <div>home</div>;
}

export default Home;
