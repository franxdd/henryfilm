import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putAdmin, putElminar } from "../../Redux/Actions/Actions";
import "../../Styles/components/_DashboardCard.scss";

function DashBoardCard({ id, name, admin }) {
//   const admin = useSelector((state) => state.isadmin);
  const dispatch = useDispatch();
  const [cambio, setCambio] = useState({
    id: id,
    admin: "",
  });

  const handlecambio = (e) => {
    e.preventDefault();
    setCambio({
      ...cambio,
      admin: e.target.value,
    });
  };
  const handleSubmit = (e) => {
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
      <div className="img-box">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path fill=" #fbfe00" d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"></path>
            </svg>
        </div>
        <div className="title">{name}</div>
        </div>
        <div className="content">
        <div style={{ color: "white" }}>{admin + ""}</div>
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
