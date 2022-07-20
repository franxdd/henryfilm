import { React, useState } from "react";
import { useDispatch } from "react-redux";
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
  }
  function handdleSubmit(e) {
    e.preventDefault();
    dispatch(input);
    setInput({
      usuario: "",
      contraseña: "",
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handdleSubmit(e)}>
        <label>Usuario</label>
        <input
          autoComplete="off"
          type={"text"}
          value={input.usuario}
          name="usuario"
          onChange={handdleChange}
        />
        <label>Contraseña</label>
        <input
          autoComplete="off"
          type={"password"}
          value={input.contraseña}
          name="password"
          onChange={handdleChange}
        />
        <button type="submit"> Acceder</button>
      </form>
    </div>
  );
}

export default Login;
