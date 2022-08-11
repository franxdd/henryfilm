import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../Styles/components/_UserProfile.scss";
import { Link } from "react-router-dom";
import { putProfile, usermodificado } from "../../Redux/Actions/Actions";
import bienvenido from "../../img/bienvenido.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [img, setImg] = useState(false);
  const [nombre, setNombre] = useState(false);
  const [profileImg, setProfileImg] = useState({
    avatar: "",
    nickname: "",
  });

  function HandleInput(e) {
    e.preventDefault();
    setProfileImg({
      ...profileImg,
      [e.target.name]: e.target.value,
      id: user.id,
    });
  }
  function HandleInputImg(e) {
    e.preventDefault();
    if (profileImg.avatar !== e.target.file) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImg({
          ...profileImg,
          avatar: reader.result,
          id: user.id,
        });
      };
    }
  }
  function handleEdit(e) {
    e.preventDefault();
    setNombre(true);
    if (nombre === false) {
      setNombre(true);
    }
    if (nombre === true) {
      setNombre(false);
    }
  }
  function handleEditimg(e) {
    e.preventDefault();
    setImg(true);
    if (img === false) {
      setImg(true);
    }
    if (img === true) {
      setImg(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("se envia la accion");
    dispatch(putProfile(profileImg));
  }
  let foto = profileImg.avatar === "" ? user.picture : profileImg.avatar;
  console.log(profileImg);
  console.log(user);
  return (
    <div className="container3">
      <div className="profileTitle">
        <h3>
          <img
            className="logo"
            src={bienvenido}
            alt="Logo"
            height="auto"
            width="250px"
          />
        </h3>
      </div>
      <div className="cardContainer3">
        <form onSubmit={handleSubmit}>
          <div className="ContainerPerfil">
            <img className="image" src={foto} alt="Profile" />
            {img === false ? (
              <Button
                style={{
                  marginLeft: "124px",
                  maxWidth: "30px",
                  maxHeight: "40px",
                  minWidth: "40px",
                  minHeight: "40px",
                  marginTop: "-30px",
                }}
                onClick={(e) => handleEditimg(e)}
              >
                {" "}
                <BorderColorIcon style={{ color: "rgb(253 254 0)" }} />
              </Button>
            ) : (
              <div>
                {" "}
                <input
                  id="avatar"
                  type="file"
                  name="avatar"
                  onChange={(e) => HandleInputImg(e)}
                />
                <Button
                  onClick={(e) => handleEditimg(e)}
                  style={{
                    marginLeft: "4px",
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }}
                >
                  <CancelIcon style={{ color: "rgb(253 254 0)" }} />
                </Button>
              </div>
            )}
            <div className="namediv">
              {nombre === false ? (
                <label className="nombre">
                  {user.nickname}
                  <Button
                    onClick={(e) => handleEdit(e)}
                    style={{
                      paddingLeft: "20px",
                      maxWidth: "30px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                    }}
                  >
                    <BorderColorIcon style={{ color: "rgb(253 254 0)" }} />
                  </Button>
                </label>
              ) : (
                <div>
                  <input
                    id="nickname"
                    type="text"
                    name="nickname"
                    onChange={(e) => HandleInput(e)}
                  />
                  <Button
                    onClick={(e) => handleEdit(e)}
                    style={{
                      marginLeft: "4px",
                      maxWidth: "30px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                    }}
                  >
                    <CancelIcon style={{ color: "rgb(253 254 0)" }} />
                  </Button>
                </div>
              )}
            </div>
            <div className="boton">
              <button
                className="card-button"
                type="submit"
                style={{ marginTop: "-18%" }}
              >
                MODIFICAR
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="containerOpciones">
        <Link to="/home/wishlist">
          <div className="opciones">
            <img src="/images/favoritos.png" alt="" />
            <video autoPlay={true} loop={true} playsInline={true}>
              <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
            </video>
          </div>
        </Link>
        <Link to={`/home/comprados/${user.id}`}>
          <div className="opciones">
            <img src="/images/comprado.png" alt="" />
            <video autoPlay={true} loop={true} playsInline={true}>
              <source src="/videos/dinero.mp4" type="video/mp4" />
            </video>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default UserProfile;
