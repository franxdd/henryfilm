import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../Styles/components/_UserProfile.scss";
import { Link } from "react-router-dom";
import { putProfile, usermodificado } from "../../Redux/Actions/Actions";
import bienvenido from "../../img/bienvenido.png";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
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
          <h1 className="nombre">{user.nickname}</h1>
      </div>
      <div className="cardContainer3">
        <img className="profile" style={{width:'160px', height:'auto', borderRadius:'200px'}} src={foto} alt="Profile"/>
              {/* <form onSubmit={handleSubmit}>
                <div>
                  <input
                    id="nickname"
                    type="text"
                    name="nickname"
                    onChange={(e) => HandleInput(e)}
                  />
                </div>
                <div>
                  {" "}
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    onChange={(e) => HandleInputImg(e)}
                  />
                </div> 
                <button type="submit">MODIFICAR</button>
              </form>  */}
          <div className="containerOpciones">
          <Link to="/home/wishlist"> 
        <div className="opciones">
            <img src="/images/favoritos.png" alt="" />
            <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
        </video>
        </div>
          </Link>
        <div className="opciones">
            <img src="/images/comprado.png" alt="" />
            <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/dinero.mp4" type="video/mp4" />
        </video>
        </div>
        </div>    
   </div>
   </div>
  );
};
export default UserProfile;
