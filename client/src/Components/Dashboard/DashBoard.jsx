import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/agregarProd">Agregar Producto</Link>
        </li>
        <li>
          <Link to="/modificarProd">Modificar Producto</Link>
        </li>
        <li>
          <Link to="/eliminarprod">Eliminar Producto</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashBoard;
