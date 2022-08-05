import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { createReview } from "../../Redux/Actions/Actions";
import "../../Styles/components/_ComentariosForm.scss";
function Rating2({ id, token }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    contenido: "",
    puntuacion: 2,
    idpelicula: id,
    token: token,
  });
  const [hover, setHover] = useState(-1);
  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const labels = {
    1: "Muy Mala",
    2: "Mala",
    3: "Regular",
    4: "Muy Buena",
    5: "Excelente",
  };

  function getLabelText(value) {
 
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (!input.token) {
      alert("Debes loguearte");
      navigate("/home/Login");
    } else {
      dispatch(createReview(input));
    }
  };
  console.log(input);
  return (
    <div>
      <form className="form3" onSubmit={submitHandler}>
        <textarea
          id="comment"
          value={input.contenido}
          onChange={(e) => handdleChange(e)}
          name="contenido"
          placeholder="Escribe tu comentario:"
          className="name formEntry3"
        ></textarea>

        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            onChange={(e) => handdleChange(e)}
            name="puntuacion"
            value={input.puntuacion}
            precision={1}
            getLabelText={getLabelText}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="small" />}
          />
          {input.puntuacion !== null && (
            <Box sx={{ ml: 5 }}>{labels[hover !== -1 ? hover : input.puntuacion]}</Box>
          )}
        </Box>
        <button className="submit formEntry3" type="submit" value="Enviar">
          Comentar
        </button>
      </form>
    </div>
  );
}

export default Rating2;
