import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  PostLogin,
  signInUser,
  googleLogOut,
} from "../../Redux/Actions/Actions.js";
import { Link } from "react-router-dom";
import "../../Styles/components/_Form.scss";
import "../../Styles/components/_Login.scss";
import jwt_decode from "jwt-decode";
function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const googleUser = useSelector((state) => state.googleUser);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  // function prueba() {
  //   dispatch(googleUser())
  // }
  // useEffect(()=>{

  // },[])

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log('entro aca')
    dispatch(signInUser(userObject));
  }

  // function HandleSignLogOut(e) {
  //   e.preventDefault();
  //   dispatch(googleLogOut());
  //   //console.log(googleUser)
  // }

  useEffect(() => {
    /* global google*/

    google.accounts.id.initialize({
      client_id:
        "738554188035-l294si4hjt9homonivsai0ga65t64tg0.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    if (googleUser.length === 0) {
      // console.log("entro");
      google.accounts.id.renderButton(document.getElementById("g_id_onload"), {
        theme: "outline",
        size: "short",
      });
    }
    if(typeof googleUser === 'string'){
      navigate("/home", { replace: true });
    }
  }, [googleUser]);

  function handdleChange(e) {
    e.preventDefault()
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

    setTimeout(() => {
      const tokenn = sessionStorage.getItem("token");
      // console.log(tokenn);
      if (tokenn) {
        navigate("/home", { replace: true });
      }
    }, 1500);
  }



  // console.log(googleUser);
  return (
    <div className="ContainerLogin">
      <div className="Login">
        <form className="form" onSubmit={(e) => handdleSubmit(e)}>
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
          <button button class="submit formEntry" type="submit">
            Iniciar Sesion
          </button>
          <div className="or">────────── O ──────────</div>
          {googleUser.length !== 0 ? (
            <>
    
            </>
          ) : (
            <>
            <div className="containerGoogle" id="signInDiv">
              <div id="g_id_onload" data-type="icon"></div>
              </div>
            </>
          )}
          
          <div className="pageTitle2"> ¿No tienes una cuenta?</div>
          <Link to="/home/Register">
            <button button class="submit formEntry">
              <b>Registrate</b>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
