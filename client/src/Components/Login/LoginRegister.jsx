import { React, useState } from "react";
import { useDispatch } from "react-redux";
import "../../Styles/components/_Form.scss";
import "../../Styles/components/_Login.scss"

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
    <div className="Login-register">
      <div className="FormPeliculas2">
      <form className ="form"onSubmit={(e) => handdleSubmit(e)}>
      <div className="pageTitle title"> Registra tus Datos: </div>
        <input 
        autoComplete="off" 
        type={"text"} 
        value={input.usuario} 
        name="usuario" 
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
          value={input.contraseña}
          name="contraseña"
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
  );
}

export default LoginRegister;
