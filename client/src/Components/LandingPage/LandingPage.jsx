import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/components/_LandingPage.scss";

function LandingPage() {
  
  return (
    <div className="conteiner">
      <div>
        <div>
          <Link to="/home">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Ingresar</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
