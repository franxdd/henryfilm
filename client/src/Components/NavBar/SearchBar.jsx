import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getnameSeries, getnameMovies } from "../../Redux/Actions/Actions";
function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleName(e) {
    setName(e.target.value);
    console.log(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getnameSeries(name));
    dispatch(getnameMovies(name));
  }
  return (
    <div>
      <input
        onChange={(e) => handleName(e)}
        type={"text"}
        placeholder="Buscar..."
      ></input>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        {" "}
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
