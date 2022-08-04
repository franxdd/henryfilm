import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { Router } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { PostLogin} from '../../Redux/Actions/Actions.js';
import { Link }from "react-router-dom";
import "../../Styles/components/_Form.scss"
import "../../Styles/components/_Login.scss"
function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
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
    dispatch(PostLogin(input));
    setInput({
      username: "",
      password: "",
    });
   
    navigate('/home', {replace: true});
  }

  return (
    <div className="ContainerLogin">
    <div className="Login">
      <form className ="form" onSubmit={(e) => handdleSubmit(e)}>
      <div className="pageTitle title"> Login </div>
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
          type={"password"}
          value={input.password}
          name="password"
          placeholder="Contraseña:"
          className="name formEntry"
          onChange={handdleChange}
        />
        <button button class="submit formEntry" 
        type="submit">Iniciar Sesion</button>
        <div className="pageTitle2"> ¿No tienes una cuenta?</div>
        <Link to="/home/Register">
          <button button class="submit formEntry" >
            <b>Registrate</b>
          </button>
        </Link>
      </form>
    </div>
    </div>
  );
}

export default Login;
