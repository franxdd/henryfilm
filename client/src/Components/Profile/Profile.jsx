import React from "react";

const Profile = () => {


    const HandleClick = ()=> {

        sessionStorage.removeItem('token')
        
        document.location.reload();

    }


  return (
    <button style={{ color: "white" }} onClick={()=>HandleClick()}>UnLogged</button>
  );
};

export default Profile;
