import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import MoviesHome from "./Components/MoviesHome/MoviesHome";
import Nav from "./Components/NavBar/Nav";
import SeriesHome from "./Components/SeriesHome/SeriesHome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<LandingPage />}></Route>
        <Route path="home" element={<Nav />}></Route>
        <Route exact path="series" element={<SeriesHome />}></Route>
        <Route exact path="peliculas" element={<MoviesHome />}></Route>
      </Routes>
    </div>
  );
}

export default App;
