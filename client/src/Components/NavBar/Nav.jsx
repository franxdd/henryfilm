import React from "react";
import { Link } from "react-router-dom";
import film from "../Multimedia/HENRYFILMS.jpg";
function Nav() {
  return (
    <nav>
      <div>
        <Link to={"/home"}>
          <img src={film} />
        </Link>
      </div>
      <div>
        <button>Movies</button>
        <button>series</button>
      </div>
    </nav>
  );
}

export default Nav;
