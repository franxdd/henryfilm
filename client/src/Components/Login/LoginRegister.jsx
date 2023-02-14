import { useState } from "react";
import { useDispatch } from "react-redux";
import "../../Styles/components/_Form.scss";
import "../../Styles/components/_Login.scss";
import { PostUsuario } from "../../Redux/Actions/Actions.js";
import { useNavigate } from "react-router-dom";
function LoginRegister() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    nickname:""
  });
  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handdleSubmit(e) {
    e.preventDefault();
    // console.log('entro al register')
    dispatch(PostUsuario(input));
    setInput({
      username: "",
      email: "",
      password: "",
      nickname:"",
    });
    navigate("/home/login");
  }

  return (
    <div className="ContainerLogin">
      <div className="Login-register">
        <div className="FormPeliculas2">
          <form className="form" onSubmit={(e) => handdleSubmit(e)}>
            <div className="pageTitle title"> Registra tus Datos: </div>
            <input
              autoComplete="off"
              type={"text"}
              value={input.username}
              name="username"
              placeholder="Usuario: "
              className="name formEntry"
              onChange={handdleChange}
            />
            <input
              autoComplete="off"
              type={"text"}
              value={input.nickname}
              name="nickname"
              placeholder="Nickname: "
              className="name formEntry"
              onChange={handdleChange}
            />
            <input
              autoComplete="off"
              type={"email"}
              value={input.email}
              name="email"
              onChange={handdleChange}
              placeholder="Email:"
              className="name formEntry"
            />
            <input
              autoComplete="off"
              type={"password"}
              value={input.password}
              name="password"
              placeholder="Contraseña:"
              className="name formEntry"
              onChange={handdleChange}
            />
            <button button className="submit formEntry" type="submit">
              {" "}
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
