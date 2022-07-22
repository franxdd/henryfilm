import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Login from "./Components/Login/Login";
import LoginRegister from "./Components/Login/LoginRegister";
import MoviesHome from "./Components/MoviesHome/MoviesHome";
import SeriesHome from "./Components/SeriesHome/SeriesHome";
import Context from "./contexto/Context";
import NavBar from "./Components/NavBar/NavBar"

const App = () => {
  const [lenguaje, setLenguaje] = useState("es")
  const contexto = {
    lenguaje: lenguaje,
    setLenguaje: setLenguaje,
  }
  return (
    <Context.Provider value={contexto}>
      <Routes>
        <Route exact path={"/"} element={<LandingPage />}></Route>
      </Routes>
      <NavBar/>
      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="series*" element={<SeriesHome />}>
        </Route>
        <Route path="movies" element={<MoviesHome />}>
        </Route>

        <Route path="Register" element={<LoginRegister />}></Route>
        <Route path="Login" element={<Login />}></Route>
      </Routes>
      </Context.Provider>
  );
};

export default App;
