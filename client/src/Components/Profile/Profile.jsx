import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/Actions/Actions.js";


const Profile = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let cart = useSelector((state)=> state.cart)

  const HandleClick = (e) => {
    // e.preventDefault()
    console.log('entro a logout')

    const token = sessionStorage.getItem("token");
    const carro = cart.slice()
    const arrAux = [token,carro]

    dispatch(logOut(arrAux)); 

    sessionStorage.removeItem("token");
    localStorage.setItem("cart", JSON.stringify([]));


    navigate("/home");
  };

  return (
    <button style={{ color: "white" }} onClick={(e) => HandleClick(e)}>
      UnLogged
    </button>
  );
};

export default Profile;
