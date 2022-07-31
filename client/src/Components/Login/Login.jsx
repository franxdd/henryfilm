import { React, useState } from "react";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { Router } from "react-router-dom";
=======
import { useNavigate} from "react-router-dom";
import { PostLogin} from '../../Redux/Actions/Actions.js'
>>>>>>> 3aed25286300d6a63841d8d900612aeed75af5a9
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
<<<<<<< HEAD
    Router.push('/home')
=======
   
    navigate('/home', {replace: true});
>>>>>>> 3aed25286300d6a63841d8d900612aeed75af5a9
  }

  return (
    <div>
      <form onSubmit={(e) => handdleSubmit(e)}>
        <label>Usuario: </label>
        <input autoComplete="off" type={"text"} value={input.username} name="username" onChange={handdleChange} />
        <label>Contraseña</label>
        <input
          autoComplete="off"
          type={"password"}
          value={input.password}
          name="password"
          onChange={handdleChange}
        />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
}

export default Login;
