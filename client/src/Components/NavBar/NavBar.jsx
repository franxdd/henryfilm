import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../Styles/components/_NavBar.scss";
import {
  orderNameASC,
  orderNameDES,
  orderVoteAvgASC,
  orderVoteAvgDES,
  getIso,
  getIdioma,
} from "../../Redux/Actions/Actions";
import { useSelector, useDispatch } from "react-redux";
import "../../Styles/components/_NavBar.scss";
import { useState, useEffect } from "react";
import {
  BiHomeHeart as HomeIcon,
  BiCameraMovie as CamaraIcon,
} from "react-icons/bi";
import { MdLock as LockIcon } from "react-icons/md";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import { FiMonitor as MonitorIcon } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar";
import { useContext } from "react";
import Context from "../../contexto/Context";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const allMovies = useSelector((state) => state.allMovies);
  const contexto = useContext(Context);
  let location = useLocation();

  const handleChangeLenguaje = (e) => {
    contexto.setLenguaje(e.target.value);
  };
  const [extendNavbar, setExtendNavbar] = useState(false);
  const b = useSelector((state) => state.idioma);
  const c = useSelector((state) => state.isos);
  // const handleChangeLenguaje = (e) => {
  //   contexto.setLenguaje(e.target.value);
  // };
  useEffect(() => {
    dispatch(getIso(parseInt(94605)));
    dispatch(getIdioma("a"));
  }, [dispatch]);

  function handleLenguage(e) {
    e.preventDefault();
    if (
      e.target.value === "en" ||
      e.target.value === "pt" ||
      e.target.value === "fr" ||
      e.target.value === "ch"
    ) {
      dispatch(getIdioma(e.target.value));
    }
  }

  return (
    <main>
      <nav className="NavbarContainer " extendNavbar={extendNavbar}>
        <div className="NavbarInnerContainer">
          <Link className="logo" to={"/"}>
            <img className="logo" src={logo} alt="Logo" />
          </Link>
          <div className="LeftContainer">
            <div className="NavbarLinkContainer">
              <Link to="/home" className="NavbarLink">
                <HomeIcon className="icono-nav" />
              </Link>
              <Link to="/home/peliculas" className="NavbarLink">
                <CamaraIcon className="icono-nav" />
              </Link>
              <Link to="/home/series" className="NavbarLink">
                <MonitorIcon className="icono-nav" />
              </Link>
              <div className="NavbarLink">
                <SearchBar />
              </div>
            </div>
            <button
              className="OpenLinksButton"
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </button>
          </div>
          <div className="RightContainer">
            <div className="select">
              <select
                className="select-lenguaje"
                onChange={(e) => handleLenguage(e)}
              >
                <option value="es">Español</option>
                <option value="en">Ingles</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
                <option value="ch">Chino</option>
              </select>
            </div>
            <Link to="/home/Register">
              <button>
                <b>Registrate</b>
              </button>
            </Link>
            <Link to="/home/carro">
              <button>
                <ShopIcon className="iconoShop" />
              </button>
            </Link>
            <Link to="/home/formPeliculas" className="link-nav">
              <button>
                <LockIcon className="icono-nav" />
              </button>
            </Link>
          </div>
        </div>
        {extendNavbar && (
          <div className="NavbarExtendedContainer">
            <Link to="/home" className="NavbarLinkExtended">
              <div className="NavbarLinkExtended">
                <SearchBar />
              </div>
              <HomeIcon className="icono-nav" /> Inicio
            </Link>
            <Link to="/home/peliculas" className="NavbarLinkExtended">
              <CamaraIcon className="icono-nav" /> Películas
            </Link>
            <Link to="/home/series" className="NavbarLinkExtended">
              <MonitorIcon className="icono-nav" /> Series
            </Link>
            <Link to="/home/Register">
              <button>
                <b>Registrate</b>
              </button>
              <button>
                <LockIcon className="icono-nav" />
              </button>
            </Link>
            <Link to="/home/carro">
              <button>
                <ShopIcon className="iconoShop" />
              </button>
            </Link>
          </div>
        )}
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Nav;
