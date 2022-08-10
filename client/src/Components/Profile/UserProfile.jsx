import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../Styles/components/_UserProfile.scss";
import { Link, NavLink } from "react-router-dom";
import { putProfile, usermodificado } from "../../Redux/Actions/Actions";
import { AiFillCloseSquare as CloseIcon } from "react-icons/ai";
import {TiHeart as HeartIcon} from "react-icons/ti";
const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [profileImg, setProfileImg] = useState({
    avatar: "",
    nickname: "",
  });
  // useEffect(() => {
  //   console.log(profileImg);
  //   dispatch(usermodificado(profileImg));
  // }, [profileImg]);
  // useEffect(() => {
  //   if (Object.keys(user).length !== 0) setProfileImg(user);
  //   console.log(user);
  // }, [user]);

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
        <div>
          <h1 className="nombre">{user.nickname}</h1>
        </div>
      </div>
      <div className="cardContainer3">
        <div>
          <img src={foto} alt="profile" />
          <a href="#miModal">
            <button>Modificar perfil</button>
          </a>
          <div id="miModal" className="modal">
            <div className="modal-contenido">
              <form onSubmit={handleSubmit}>
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

                <button type="submit">cambiar</button>
              </form>
              <a href="#">
                {" "}
                <CloseIcon className="iconoClose" />{" "}
              </a>
              <br></br>
              <div className="iframe-container"></div>
            </div>
          </div>
          <Link to="/home/wishlist"> 
            <HeartIcon className="iconoHeart" />Favoritos
          </Link>
        </div>
        <div className="cardProfile">
          <NavLink
            to="/contactform"
            style={{ textDecoration: "none", color: "#5A5A5A" }}
          >
            <h3 className="card-title">Ayuda</h3>
          </NavLink>
          <p className="card-content">
            Contactanos para un asesoramiento personalizado
          </p>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
