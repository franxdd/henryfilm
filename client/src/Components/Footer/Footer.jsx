// import React from "react";
import logo from "../../img/logo.png"
import "../../Styles/components/_Footer.scss"
import { Link } from "react-router-dom";
export default function Footer(){

    return (
      <footer className="footerDistributed">
        <div className= "footerLeft">
          <h3>
            SOBRE<span>NOSOTROS</span>
          </h3>
            <p>
            Somos un grupo de estudiantes de soyHenry
            y este es nuestro proyecto final.
            </p>
        </div>

        <div className="footerCenter">
        <p className="footerAbout">
            <span>EQUIPO DE DESARROLLO</span>
          </p>
            <ul className="Fotos">
            <li>
            <div className="userPicture">
            <a href="https://www.linkedin.com/in/alejandro-ramirez-64931919a/" target="_blank">
            <img
              src="https://media-exp1.licdn.com/dms/image/C4E03AQFzkN5JRDGP2g/profile-displayphoto-shrink_800_800/0/1651196430788?e=1665619200&v=beta&t=HXkr-yfX8wAw7_4_yMCIrFImczjX1KHharlNolFKaUY"
              alt="Person"
              className="cardImage"
            />
              </a>
          </div>
          </li>
          <li>
            <div className="userPicture">
            <a href="https://www.linkedin.com/in/edgar-rossi-a514ba211/" target="_blank">
            <img
              src="https://avatars.githubusercontent.com/u/51724649?v=4"
              alt="Person"
              className="cardImage"
            />
            </a>
          </div>
          </li>
          <li>
            <div className="userPicture">
            <a href="https://www.linkedin.com/in/matias-strficek-68a203142/" target="_blank">
            <img
              src="https://avatars.githubusercontent.com/u/40149380?v=4"
              alt="Person"
              className="cardImage"
            />
              </a>
          </div>
          </li>
          <li>
            <div className="userPicture">
            <a href="https://www.linkedin.com/in/d%C3%A1rika-valdez-a367481a8/" target="_blank">
            <img
              src="https://avatars.githubusercontent.com/u/102616109?v=4"
              alt="Person"
              className="cardImage"
            />
              </a>
          </div>
          </li>
          <li>
            <div className="userPicture">
            <a href="https://www.linkedin.com/in/francisco-sequeira-349189240/" target="_blank">
            <img
              src="https://avatars.githubusercontent.com/u/99943249?v=4"
              alt="Person"
              className="cardImage"
            />
              </a>
          </div>
          </li>
          </ul>
          <p className="footerAbout">Soy Henry Bootcamp © 2022</p>
        </div>
        <div className="footerRight">
        <div>
            <a>
              <img src={logo} alt="logo" className="img"/>
            </a>
          <div className="footerLinks">
            <Link to={"/"}>
              <h4 className="linkOne">Inicio</h4>
            </Link>
            <Link to={"/home/peliculas"}>
              <h4>Películas</h4>
            </Link>
            <Link to={"/home/series"}>
              <h4>Series</h4>
            </Link>
          </div>
          </div>
        </div>
      </footer>
    );
}