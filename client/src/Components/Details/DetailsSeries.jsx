import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeriesDetail } from "../../Redux/Actions/Actions";
function DetailsSeries(props) {
  console.log(props);
  const dispatch = useDispatch();
  let { seriesDetail } = useSelector((state) => state);
  const { id } = props.match.params;
  useEffect(() => {
    dispatch(getSeriesDetail(id));
  }, [dispatch, id]);
  // console.log(seriesDetail);

  return (
    <div>
      <div>{seriesDetail}</div>
    </div>
  );
}

export default DetailsSeries;
