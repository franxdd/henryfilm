import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSeries } from "../../Redux/Actions/Actions";
function CardSeries() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSeries());
  }, []);
  let { allSeries } = useSelector((state) => state);
  return <div>CardSeries</div>;
}

export default CardSeries;
