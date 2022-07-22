import React from "react";
<<<<<<< HEAD:client/src/Components/NavBar/NavBar.jsx
import { Link } from "react-router-dom";
import "./_NavBar.scss";
import logo from "../../img/logo.png"
import { BsHouseDoor as HomeIcon, BsCameraVideo as CamaraIcon} from "react-icons/bs";
=======
import { Link, Outlet } from "react-router-dom";
import logo from "../../Styles/Img/logo.png";
import "../../Styles/Components/_NavBar.scss";
import {
  BsHouseDoor as HomeIcon,
  BsCameraVideo as CamaraIcon,
} from "react-icons/bs";
>>>>>>> a630283ffaa9ac0e0fc19e1c8ff70c839993bd35:client/src/Components/NavBar/Nav.jsx
import { FiMonitor as MonitorIcon } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar"


function Nav() {
  return (
    <main>
      <nav className="nav-superior">
        <Link to={"/home"}>
          <img className="logo" src={logo} alt="Logo" />
        </Link>
<<<<<<< HEAD:client/src/Components/NavBar/NavBar.jsx
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
=======
        <ul className="contenedor-iconos">
          <Link to="/" className="link-nav">
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
        </ul>
        <SearchBar />
        <Link to="/home/Login">Únete</Link>
        <Link to="/home/Register">Registrate</Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
>>>>>>> a630283ffaa9ac0e0fc19e1c8ff70c839993bd35:client/src/Components/NavBar/Nav.jsx
  );
}

export default Nav;
