import { React, useState } from "react";
import { useDispatch } from "react-redux";
function LoginRegister() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    usuario: "",
    email: "",
    contraseña: "",
  });
  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handdleSubmit(e) {
    e.preventDefault();
    dispatch(input);
    setInput({
      usuario: "",
      email: "",
      contraseña: "",
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handdleSubmit(e)}>
        <label>Usuario</label>
        <input autoComplete="off" type={"text"} value={input.usuario} name="usuario" onChange={handdleChange} />
        <label>Email</label>
        <input autoComplete="off" type={"email"} value={input.email} name="email" onChange={handdleChange} />
        <label>Contraseña</label>
        <input
          autoComplete="off"
          type={"password"}
          value={input.contraseña}
          name="contraseña"
          onChange={handdleChange}
        />
        <button type="submit"> Registrarse</button>
      </form>
    </div>
  );
}

export default LoginRegister;
