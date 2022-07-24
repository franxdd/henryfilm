import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { filterName } from "../../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";
import { BsSearch as LupaIcon } from "react-icons/bs";
import "./_SearchBar.scss";
import "./_Formulario.scss";

function SearchBar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(filterName(name));
    navigate("/home/search");
  }
  return (
    <div className="formulario">
      <form type="submit" onSubmit={handleSubmit}>
        <button
          className="boton-buscar"
          aria-label="Buscar"
          onClick={(e) => handleSubmit(e)}
        >
          <LupaIcon className="icono-nav" />
        </button>

        <input
          onChange={(e) => handleName(e)}
          type={"text"}
          placeholder="Buscar..."
        ></input>
      </form>
    </div>
  );
}

export default SearchBar;
