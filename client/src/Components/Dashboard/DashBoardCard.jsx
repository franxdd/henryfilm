import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putAdmin, putElminar } from "../../Redux/Actions/Actions";
import "../../Styles/components/_DashboardCard.scss";
import {FaUserEdit as UserIcon} from "react-icons/fa";

function DashBoardCard({ id, name, admin }) {
  console.log("que funcione dios")
  console.log(id)
  const dispatch = useDispatch();
  const {flag }= useSelector((state) => state);
  const [cambio, setCambio] = useState({
    id: id,
    admin: "",
  });

  const handlecambio = (e) => {
    console.log(e.target.value)
    e.preventDefault();
    setCambio({
      ...cambio,
      admin: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    console.log(cambio)
    e.preventDefault();
    dispatch(putAdmin(cambio));
    setCambio({
      ...cambio,
      admin: "",
    });
  };
  const handleDelete = (e)=>{
e.preventDefault()
dispatch(putElminar(id))
  }
  return (
    <div className="card25">
      <div className="header">
      <div class="img-box">
       <UserIcon style={{ color: "yellow"}} />
        </div>
        <div className="title">{name}</div>
        </div>
        <div className="content">
        <div style={{ color: "black" }}>{admin + ""}</div>
        <form onSubmit={handleSubmit}>
          <div className="select4">
          <select onChange={(e) => handlecambio(e)}>
            <option>Admin</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button type="submit"><span>Cambiar</span></button>
        <button onClick={(e)=> handleDelete(e)}><span>Eliminar</span></button>
      
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashBoardCard;
