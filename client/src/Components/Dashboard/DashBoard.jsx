import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from "../../Redux/Actions/Actions";
import CardSearch from "../Search/CardSearch";
import "../../Styles/components/_Search.scss";

const DashBoard = () => {
  const allF = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleClickTodo = (e) => {
    e.preventDefault();
    dispatch(getTodo);
  };

  console.log(allF);
  return (
    <div>
      <ul>
        <li>
          <Link to="/home/agregar">
            <button>Agregar Producto</button>{" "}
          </Link>
        </li>
        <li>
          <button onClick={(e) => handleClickTodo(e)}>Modificar Producto</button>
          <div>
            <a href="#miModal">
              <button>Modificar</button>
            </a>
            <div id="miModal" className="modal">
              <div className="modal-contenido">
                <div className="iframe-container">
                  {allF?.map((r) => {
                    return (
                      <div>
                        {" "}
                        key={r.id} id={r.id} <h3>name={r.name}</h3>{" "}
                        <div className="card-img">
                          <img src={r.posterImagen} />
                        </div>
                        tipo={r.tipo}{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <button>Eliminar Producto</button>
        </li>
      </ul>
    </div>
  );
};

export default DashBoard;
