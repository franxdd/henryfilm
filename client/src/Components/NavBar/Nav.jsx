import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Styles/Img/logo.png";
import "../../Styles/Components/_NavBar.scss"
import {BsHouseDoor as HomeIcon, BsCameraVideo as CamaraIcon,} from "react-icons/bs";
import { FiMonitor as MonitorIcon } from "react-icons/fi";

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

    </nav>
  );
}

export default Nav;
