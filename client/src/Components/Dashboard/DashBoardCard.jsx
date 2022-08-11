import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putAdmin, putElminar } from "../../Redux/Actions/Actions";
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
    <div className="contenedor">
      <div className="contenedor2">
        <div style={{ color: "white" }}>{name}</div>
        <div style={{ color: "white" }}>{admin + ""}</div>
        <form onSubmit={handleSubmit}>
          <select onChange={(e) => handlecambio(e)}>
            <option>Admin</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <button type="submit">cambiar</button>
        </form>
        <button onClick={(e)=> handleDelete(e)}>eliminar</button>
      </div>
    </div>
  );
}

export default DashBoardCard;
