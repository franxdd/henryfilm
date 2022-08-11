import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allusers } from "../../Redux/Actions/Actions";
import "../../Styles/components/_DashBoard.scss";

import "../../Styles/components/_Search.scss";
import DashBoardCard from "./DashBoardCard";
import FormPeliculas from "../Form/FormPeliculas.jsx";
const DashBoard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUser);
  useEffect(() => {
    dispatch(allusers());
  }, [dispatch]);
  return (
    <div>
      <div className="cubretodo">
        <div className="accordions">
          <div className="accordion">
            <input className="inputP" type="checkbox" id="first" />
            <label className="acc-label" for="first">
              Administrar Usuarios
            </label>
            <div className="acc-content">
        {users &&
          users?.map((e) => {
            return (
              <DashBoardCard
                id={e.id}
                name={e.username}
                admin={e.isAdmin + ""}
              />
            );
          })}
            </div>
          </div>
        </div>
        <div className="accordions">
          <div className="accordion">
            <input className="inputP" type="checkbox" id="second" />
            <label className="acc-label2" for="second">
              Agregar Pelicula
            </label>
            <div className="acc-content">
              <FormPeliculas />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
