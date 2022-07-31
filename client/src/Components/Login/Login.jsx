import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { Router } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    usuario: "",
    contraseña: "",
  });
  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }
  function handdleSubmit(e) {
    e.preventDefault();
    dispatch(input);
    setInput({
      usuario: "",
      contraseña: "",
    });
    Router.push('/home')
  }

  return (
    <div>
      <form onSubmit={(e) => handdleSubmit(e)}>
        <label>Usuario: </label>
        <input autoComplete="off" type={"text"} value={input.usuario} name="usuario" onChange={handdleChange} />
        <label>Contraseña</label>
        <input
          autoComplete="off"
          type={"password"}
          value={input.contraseña}
          name="contraseña"
          onChange={handdleChange}
        />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
}

export default Login;
