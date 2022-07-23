import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getnameMovies, getnameSeries } from "../../Redux/Actions/Actions";
import { BsSearch as LupaIcon } from "react-icons/bs";
import "./_SearchBar.scss";
import "./_Formulario.scss";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getnameMovies(name));
    dispatch(getnameSeries(name));
  }
  return (
    <div className="formulario">
      <form type="submit" onClick={(e) => handleSubmit(e)}>
        <button className="boton-buscar" aria-label="Buscar">
          <LupaIcon className="icono-nav" />
        </button>
        <input onChange={(e) => handleName(e)} type={"text"} placeholder="Buscar..."></input>
      </form>
    </div>
  );
}

export default SearchBar;
