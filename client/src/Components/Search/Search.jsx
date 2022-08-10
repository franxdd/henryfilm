import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodo } from "../../Redux/Actions/Actions";
import CardSearch from "./CardSearch";
import "../../Styles/components/_Search.scss";

function Search() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getTodo());
  // }, [dispatch]);
  const allF = useSelector((state) => state.todo);
  const all = useSelector((state) => state.all);

  return (
    <div className="contenedorSearch">
      {}
      <div className="contenedorCards">
        {all?.map((r) => {
          return <CardSearch key={r.id} id={r.id} name={r.name} poster={r.posterImagen} tipo={r.tipo} />;
        })}
      </div>
    </div>
  );
}

export default Search;
