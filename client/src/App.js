import { Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Nav from "./Components/NavBar/Nav";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}></Route>
      <Route path={"/home"} component={Nav}></Route>
    </div>
  );
}

export default App;
