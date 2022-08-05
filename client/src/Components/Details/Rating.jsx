// import * as React from "react";
// import react from "react"
// import {useState} from "react"
// import { useDispatch } from "react-redux";
// import Rating from "@mui/material/Rating";
// import Box from "@mui/material/Box";
// import StarIcon from "@mui/icons-material/Star";
// import { createReview } from "../../Redux/Actions/Actions";

// const labels = {
//   1: "Muy Mala",
//   2: "Mala",
//   3: "Regular",
//   4: "Muy Buena",
//   5: "Excelente",
// };
// function getLabelText(value) {
//   return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
// }
// const dispatch = useDispatch()
// let token = sessionStorage.getItem("token");
// const [input, setInput] = useState({
//   contenido: "",
//   puntuacion: "",
//   idPelicula: id,
//   token: token,
// });
// export default function HoverRating() {
//   const [value, setValue] = React.useState(2);
//   const [hover, setHover] = React.useState(-1);
//   function handdleChange(e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   }
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!input.token) {
//       alert("Debes loguearte");
//       navigate("/home/Login");
//     } else {
//       dispatch(createReview(input));
//     }
//   };
//   return (
//     <div>
//       <form className="form3" onSubmit={submitHandler}>
//         <textarea
//           id="comment"
//           value={input.contenido}
//           onChange={(e) => handdleChange(e)}
//           name="contenido"
//           placeholder="Escribe tu comentario:"
//           className="name formEntry3"
//         ></textarea>
//         <button className="submit formEntry3" type="submit" value="Enviar">
//           Comentar
//         </button>
//       </form>

//       <Box
//         sx={{
//           width: 200,
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <Rating
//           name="hover-feedback"
//           value={value}
//           precision={1}
//           getLabelText={getLabelText}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//           onChangeActive={(event, newHover) => {
//             setHover(newHover);
//           }}
//           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="small" />}
//         />
//         {value !== null && (
//           <Box sx={{ ml: 5 }}>{labels[hover !== -1 ? hover : value]}</Box>
//         )}
//       </Box>
//     </div>
//   );
// }
