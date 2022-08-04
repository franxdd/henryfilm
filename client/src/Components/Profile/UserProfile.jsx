import React, { useEffect, useState } from "react";
import  "../../Styles/components/_UserProfile.scss";
import { NavLink } from "react-router-dom";

 const UserProfile = () => {
  
  return(
    <>
      <div className= "container3">
        <div className= "profileTitle">
          <h1>Mi Perfil</h1>
        </div>
      
        <div className= "cardContainer3">
                        
           <div className="cardProfile">
            <NavLink to="/contactform" style={{textDecoration:'none',color:'#5A5A5A'}}>
              <h3 className="card-title">Ayuda</h3>
            </NavLink>
            <p className="card-content">
              Contactanos para un asesoramiento personalizado
            </p>

          </div>
        </div>
      </div>
    </>
  )
};
export default UserProfile;