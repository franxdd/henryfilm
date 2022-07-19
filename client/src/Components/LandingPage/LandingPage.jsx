import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div>
        <h1>LandingPage</h1>
      </div>
      <div>
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
