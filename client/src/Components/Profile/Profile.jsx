import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/Actions/Actions.js";

const Profile = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let cart = useSelector((state) => state.cart);
  let deseado = useSelector((state) => state.wishlist);

  // const HandleClick = (e) => {
  //   e.preventDefault()
  //   try {
  //     console.log("entro a logout");

  //     const token = sessionStorage.getItem("token");
  //     const carro = cart.slice();
  //     const deseados = deseado.slice()
  //     const arrAux = [token, carro, deseados];

  //     // console.log("ASDASD", arrAux)

  //     dispatch(logOut(arrAux));

  //     sessionStorage.removeItem("token");
  //     localStorage.setItem("cart", JSON.stringify([]));
  //     localStorage.setItem("wishlist", JSON.stringify([]));

  //     navigate("/home");
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  return (
    <button style={{ color: "white" }} >
      UnLogged
    </button>
  );
};

export default Profile;
