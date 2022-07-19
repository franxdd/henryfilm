import { Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}></Route>
    </div>
  );
}

export default App;
