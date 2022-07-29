import { Routes, Route } from "react-router-dom";
import "./Styles/App.scss";
import DetailMovie from "./Components/Details/DetailMovie";
import DetailsSeries from "./Components/Details/DetailsSeries";
import FormPeliculas from "./Components/Form/FormPeliculas";
import Dashboard from './Components/Dashboard/DashBoard.jsx'
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Login from "./Components/Login/Login";
import LoginRegister from "./Components/Login/LoginRegister";
import MoviesHome from "./Components/MoviesHome/MoviesHome";
import NavBar from "./Components/NavBar/NavBar";
import SeriesHome from "./Components/SeriesHome/SeriesHome";
import Context from "./contexto/Context";
import { useState } from "react";
import Search from "./Components/Search/Search";
import Carro from "./Components/Carro/Carro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [lenguaje, setLenguaje] = useState("es");
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  const contexto = {
    lenguaje: lenguaje,
    setLenguaje: setLenguaje,
  };
  return (
    
    <div className="App">
      <Context.Provider value={contexto}>
        <ToastContainer />
        <Routes>
          <Route path={"/"} element={<LandingPage />}></Route>
        </Routes>
        <Routes>
          <Route path="home" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="formPeliculas" element={<FormPeliculas/>}/>
            <Route path="dashboard" element={<Dashboard />}/>
            <Route path="series" element={<SeriesHome />} />
            <Route path="series/:id" element={<DetailsSeries />} />
            <Route path="peliculas" element={<MoviesHome />} />
            <Route path="peliculas/:id" element={<DetailMovie />} />
            <Route path="Register" element={<LoginRegister />} />
            <Route path="Login" element={<Login />} />
            <Route path="Search" element={<Search />}></Route>
            <Route path="Carro" element={<Carro />}></Route>
          </Route>
        </Routes>
      </Context.Provider>
    </div>
  );
};

export default App;
