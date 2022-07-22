import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../img/logo.png";
import "./_NavBar.scss";
import {
  BsHouseDoor as HomeIcon,
  BsCameraVideo as CamaraIcon,
} from "react-icons/bs";
import { FiMonitor as MonitorIcon } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar";

function Nav() {
  return (
    <main>
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
  );
}

export default Nav;