import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Nav from "./Components/NavBar/Nav";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<LandingPage />}></Route>
        <Route path="home" element={<Nav />}></Route>
        <Route exact path="series" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
