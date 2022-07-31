import React from "react";
import { Link, Outlet } from "react-router-dom";
import FormPeliculas from "../Form/FormPeliculas.jsx"

const DashBoard = () => {
  return (
    <div>
      <h2 style={{ color: "white" }}>DASHBOARD</h2>
      <Link to={'/home/modificar'}>MODIFICAR</Link>
      <br></br>
      <Link to={'/home/agregar'}>AGREGAR</Link>
    </div>
  );
};

export default DashBoard;
