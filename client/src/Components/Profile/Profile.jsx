import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/Actions/Actions.js";

const Profile = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const HandleClick = () => {
    sessionStorage.removeItem("token");
    dispatch(logOut());
    navigate("/home");
  };

  return (
    <button style={{ color: "white" }} onClick={() => HandleClick()}>
      UnLogged
    </button>
  );
};

export default Profile;
