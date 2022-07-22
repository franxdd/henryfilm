import React from "react";
import { Link } from "react-router-dom";
import "./_NavBar.scss";
import logo from "../../img/logo.png"
import { BsHouseDoor as HomeIcon, BsCameraVideo as CamaraIcon} from "react-icons/bs";
import { FiMonitor as MonitorIcon } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar"


function Nav() {
  return (
    <nav className="nav-superior">
      <Link to={"/home"}>
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <ul className="contenedor-iconos">
        <Link to="/" className="link-nav">
          <li>
            <HomeIcon className="icono-nav" />
          </li>
        </Link>
        <Link to="/movies" className="link-nav">
          <li>
            <CamaraIcon className="icono-nav" />
          </li>
        </Link>
        <Link to="/series" className="link-nav">
          <li>
            <MonitorIcon className="icono-nav" />
          </li>
        </Link>
      </ul>
      <SearchBar />
         <Link to="/Login">Únete</Link>
      <Link to="/Register">Registrate</Link>
    </nav>
  );
}

export default Nav;
