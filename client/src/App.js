import { Routes, Route } from "react-router-dom";
import "./Styles/App.scss";
import DetailMovie from "./Components/Details/DetailMovie";
import DetailsSeries from "./Components/Details/DetailsSeries";
import FormPeliculas from "./Components/Form/FormPeliculas";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Login from "./Components/Login/Login";
import LoginRegister from "./Components/Login/LoginRegister";
import MoviesHome from "./Components/MoviesHome/MoviesHome";
import NavBar from "./Components/NavBar/NavBar";
import SeriesHome from "./Components/SeriesHome/SeriesHome";
import Context from "./contexto/Context";
import { useEffect, useState } from "react";
import Search from "./Components/Search/Search";
import Profile from "./Components/Profile/Profile.jsx";
import Carro from "./Components/Carro/Carro";
import Wishlist from "./Components/Wishlist/Wishlist";
import { ToastContainer } from "react-toastify";
import "./Styles/ReactToastify.css";
import Footer from "./Components/Footer/Footer";
import PutPeliculas from "./Components/Form/PutPeliculas";
import UserProfile from "./Components/Profile/UserProfile";
import PasarelaDePago from "./Components/PasarelaDePago/PasarelaDePago";
import { BsGoogle } from "react-icons/bs";
import DashBoard from "./Components/Dashboard/DashBoard";
import Historiales from "./Components/Historiales/Historiales";

const App = () => {
  const [lenguaje, setLenguaje] = useState("es");
  const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  if (!localStorage.getItem("wishlist")) {
    localStorage.setItem("wishlist", JSON.stringify([]));
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
            <Route path="agregar" element={<FormPeliculas />} />
            <Route path="series" element={<SeriesHome />} />
            <Route path="series/:id" element={<DetailsSeries />} />
            <Route path="peliculas" element={<MoviesHome />} />
            <Route path="peliculas/:id" element={<DetailMovie />} />
            <Route path="Register" element={<LoginRegister />} />
            <Route path="Login" element={<Login />} />
            <Route path="Search" element={<Search />}></Route>
            <Route path="Profile" element={<Profile />}></Route>
            <Route path="Carro" element={<Carro />}></Route>
            <Route path="comprados/:id" element={<Historiales />}></Route>
            <Route path="modificar/:id/:tipos" element={<PutPeliculas />}></Route>
            <Route path="userProfile" element={<UserProfile />}></Route>
            <Route path="wishlist" element={<Wishlist />}></Route>
            <Route path="pasarela" element={<PasarelaDePago />}></Route>
            <Route path="dashBoard" element={<DashBoard />}></Route>
          </Route>
        </Routes>
        <Routes>
          <Route path="home/*" element={<Footer />}></Route>
        </Routes>
      </Context.Provider>
    </div>
  );
};

export default App;
