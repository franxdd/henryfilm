import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarritoCard from "../CarritoCard/CarritoCard";
import "../../Styles/components/_Carrito.scss";
import { useNavigate } from "react-router-dom";
import "../../Styles/components/_Carrito.scss";
import tuCarrito from "../../img/tucarrito.png";
import {
  postHistorial,
  getHistorial,
  removeCart,
} from "../../Redux/Actions/Actions";
import { HiOutlineStop } from "react-icons/hi";
import { toast } from "react-toastify";


function Carro() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrecio, settotalPrecio] = useState(0);
  const [totalItems, settotalItems] = useState([]);
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  const histo = useSelector((state) => state.historial);

  useEffect(() => {
    if (cart) {
      cart &&
        cart.forEach((e) => {
          settotalPrecio(totalPrecio + e.price);
        });
      settotalItems(cart.length);
    }
    if (user.id) {
      // console.log('entro aca')
      dispatch(getHistorial(user.id));
    }
  }, [cart]);

  function debesLogearte() {
    return toast.error("Necesitas logearte", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function productoYaComprado() {
    return toast.warn("Uno o mas productos ya fueron adquiridos", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const HandleClickComprar = (e) => {
    e.preventDefault();

    if (Object.keys(user).length === 0) {
      debesLogearte()
    }

    const token = sessionStorage.getItem("token");
    if (token && cart.length !== 0 && histo.compras) {
      var coincidencia = [];

      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < histo.compras.length; j++) {
          if (cart[i].id === histo.compras[j].id) {
            coincidencia.push(cart[i]);
          }
        }
      }

      if (coincidencia.length === 0) {
        navigate("/home/pasarela");
      } else {
        var mostrar = [];

        for (let i = 0; i < coincidencia.length; i++) {
          mostrar.push(coincidencia[i].name);
        }
        productoYaComprado()
      }
    } else if (
      Object.keys(histo).length === 0 &&
      Object.keys(user).length !== 0
    ) {
      navigate("/home/pasarela");
    }
  };

  var totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price;
  }
  console.log(cart)
  return (
    <div className="container">
      <h3>
        <img
          className="logo"
          src={tuCarrito}
          alt="Logo"
          height="auto"
          width="200px"
        />
      </h3>
      <div className="containerCarrito">
        {cart &&
          cart.map((e) => {
            return (
              <CarritoCard
                key={e.id}
                id={e.id}
                nombre={e.name}
                image={e.posterImagen}
                tipo={e.tipo}
                precio={e.price}
              />
            );
          })}
      </div>
      <div>
        <div className="containerTotal">
          <div>
            <h4>Resumen</h4>
            <p>
              <h5>Cantidad: </h5>
              <h6>{totalItems}</h6>
            </p>
            <p>
              <h5>Total: </h5>
              <h6>${totalPrice}.00</h6>
            </p>
            <button
              className="submit formEntry4"
              onClick={(e) => HandleClickComprar(e)}
            >
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carro;
