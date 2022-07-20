import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Login from "./Components/Login/Login";
import LoginRegister from "./Components/Login/LoginRegister";
import MoviesHome from "./Components/MoviesHome/MoviesHome";
import Nav from "./Components/NavBar/Nav";
import SeriesHome from "./Components/SeriesHome/SeriesHome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<LandingPage />}></Route>
      </Routes>
      <Nav />

      <Routes>
        <Route exact path="series" element={<SeriesHome />}></Route>
        <Route exact path="peliculas" element={<MoviesHome />}></Route>
        <Route exact path="Register" element={<LoginRegister />}></Route>
        <Route exact path="Login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
