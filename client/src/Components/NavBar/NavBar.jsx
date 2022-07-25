import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../img/logo.png";
import "./_NavBar.scss";
import {
  orderNameASC,
  orderNameDES,
  orderVoteAvgASC,
  orderVoteAvgDES,
} from "../../Redux/Actions/Actions";
import { useSelector, useDispatch } from "react-redux";

import {
  BsHouseDoor as HomeIcon,
  BsCameraVideo as CamaraIcon,
} from "react-icons/bs";
import {MdLock as LockIcon} from "react-icons/md";

import { FiMonitor as MonitorIcon } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar";
import { useContext } from "react";
import Context from "../../contexto/Context";
import { useLocation } from "react-router-dom";

const Nav = (props) => {
  const dispatch = useDispatch();
  const allMovies = useSelector((state) => state.allMovies);
  const contexto = useContext(Context);
  let location = useLocation();

  const handleChangeLenguaje = (e) => {
    contexto.setLenguaje(e.target.value);
  };

  return (
    <main>
      <nav className="nav-superior">
        <Link to={"/"}>
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <ul className="contenedor-iconos">
          <Link to="/home" className="link-nav">
            <li>
              <HomeIcon className="icono-nav" />
            </li>
          </Link>
          <Link to="/home/peliculas" className="link-nav">
            <li>
              <CamaraIcon className="icono-nav" />
            </li>
          </Link>
          <Link to="/home/series" className="link-nav">
            <li>
              <MonitorIcon className="icono-nav" />
            </li>
          </Link>
          {/* <Link to="/home/formPeliculas" className="link-nav">
            <li>
              FORMULARIO
            </li>
          </Link> */}
        </ul>

        {location.pathname !== "/home" && (
          <div className="search">
            <SearchBar />
          </div>
        )}


        {/* <Link to="/home/peliculas/nueva" className="link-nav">
            <div>AGREGAR PELICULA</div>
        </Link>
        <Link to="/home/series/nueva" className="link-nav">
            <div>AGREGAR SERIE</div>
        </Link> */}

        <div className="select">
          <select className="select-lenguaje" onChange={handleChangeLenguaje}>
            <option value="es">Español</option>
            <option value="in">Ingles</option>
            <option value="fr">Français</option>
            <option value="pt">Português</option>
          </select>
        </div>
        <div className="login">
          {/* <Link to="/home/Login"> */}
          <Link to="/home/Register">
            <button>
              <b>Registrate</b>
            </button>
          </Link>
          <Link to="/home/formPeliculas" className="link-nav">
            <button>
            <LockIcon className="icono-nav" />
            </button>
          </Link>
        </div>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Nav;
