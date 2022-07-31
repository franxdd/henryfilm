import { React, useState } from "react";
import { useDispatch } from "react-redux";
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
    <div>
      <form onSubmit={(e) => handdleSubmit(e)}>
        <label>Usuario</label>
        <input autoComplete="off" type={"text"} value={input.username} name="username" onChange={handdleChange} />
        <label>Email</label>
        <input autoComplete="off" type={"email"} value={input.email} name="email" onChange={handdleChange} />
        <label>Contraseña</label>
        <input
          autoComplete="off"
          type={"password"}
          value={input.password}
          name="password"
          onChange={handdleChange}
        />
        <button type="submit"> Registrarse</button>
      </form>
    </div>
  );
}

export default LoginRegister;
