import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSeries } from "../../Redux/Actions/Actions";
import CardSeries from "../CardSeries/CardSeries";
function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSeries());
  }, [dispatch]);
  let { allSeries } = useSelector((state) => state);
  console.log(allSeries);
  return (
    <div>
      {allSeries.map((e) => {
        return <CardSeries key={e.id} name={e.name} poster={e.poster_path} />;
      })}
    </div>
  );
}

export default Home;
