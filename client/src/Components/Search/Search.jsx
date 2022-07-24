import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodo } from "../../Redux/Actions/Actions";
import CardSearch from "./CardSearch";

function Search() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);
  const allF = useSelector((state) => state.todo);
  const all = useSelector((state) => state.all);
  console.log(all);
  return (
    <div>
      {all?.map((r) => {
        return (
          <CardSearch
            key={r.id}
            id={r.id}
            name={r.name}
            poster={r.posterImagen}
          />
        );
      })}
    </div>
  );
}

export default Search;
