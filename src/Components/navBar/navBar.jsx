import React from "react";
import "./navBar.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const showSideBar = () => {
    const sideBar = document.querySelector(".sideBar");
    sideBar?.classList.toggle("hiddenSide");
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="nav w-100 bg-light">
      <div className="w-100 d-flex justify-content-between align-items-center mx-4 ">
        <img src={Logo} alt="logo" className="" />
        <div>
          <i
            className="fa-solid fa-right-from-bracket pointer"
            onClick={logout}
          ></i>

          <i
            className="fa-solid fa-bars ms-2 d-sm-none pointer"
            onClick={() => {
              showSideBar();
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
