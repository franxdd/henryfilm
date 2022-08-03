import { React, useState } from "react";
import { useDispatch } from "react-redux";
import "../../Styles/components/_Form.scss";
import "../../Styles/components/_Login.scss"
import {PostUsuario} from '../../Redux/Actions/Actions.js'
function LoginRegister() {



  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handdleSubmit(e) {
    e.preventDefault();
    dispatch(PostUsuario(input));
    setInput({
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="ContainerLogin">
    <div className="Login-register">
      <div className="FormPeliculas2">
      <form className ="form" onSubmit={(e) => handdleSubmit(e)}>
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
        <button 
        button class="submit formEntry" 
        type="submit"> Registrarse</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default LoginRegister;
