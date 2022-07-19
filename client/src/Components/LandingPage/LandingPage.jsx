import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Components/_LandingPage.scss";

function LandingPage() {
  return (
    <div className="conteiner">
      <div>
      <div>
        <Link to="/home">
        <button class="learn-more">
        <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
        </span>
        <span class="button-text">Ingresar</span>
        </button>      
        </Link>
      </div>
      </div>
    </div>
  );
}

export default LandingPage;
