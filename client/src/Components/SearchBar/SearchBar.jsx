import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterName, getTodo } from "../../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";
import { BsSearch as LupaIcon } from "react-icons/bs";
import "../../Styles/components/_Formulario.scss";

function SearchBar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(filterName(name));
  }, [name]);

  function handleName(e) {

    setName(e.target.value);
    ///
    navigate("/home/search");
  }

  return (
    <div className="formulario">
      <form type="submit">
        <button className="boton-buscar" aria-label="Buscar">
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
