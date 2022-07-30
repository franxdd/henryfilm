import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { PostLogin} from '../../Redux/Actions/Actions.js'
function Login() {

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
    // console.log(input);
    dispatch(PostLogin(input));
    setInput({
      username: "",
      password: "",
    });
    setTimeout(document.location.reload(), 1000);
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
