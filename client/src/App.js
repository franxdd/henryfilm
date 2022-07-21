import { Routes, Route } from "react-router-dom";
import "./App.scss";
import DetailMovie from "./Components/Details/DetailMovie";
import DetailsSeries from "./Components/Details/DetailsSeries";
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
        <Route path={"/"} element={<LandingPage />}></Route>
      </Routes>
      <Nav />

      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="series/*" element={<SeriesHome />}>
          <Route element={<DetailsSeries />}></Route>
        </Route>
        <Route path="peliculas" element={<MoviesHome />}>
          <Route path=":id" element={<DetailMovie />}></Route>
        </Route>

        <Route path="Register" element={<LoginRegister />}></Route>
        <Route path="Login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
