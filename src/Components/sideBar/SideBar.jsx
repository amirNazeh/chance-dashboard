import { useEffect } from "react";
import "./sideBar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  useEffect(() => {
    const navLink = document.querySelectorAll(".sideBar div a");
    const sideBar = document.querySelector(".sideBar");

    navLink.forEach((link) => {
      link.addEventListener("click", () => {
        sideBar.classList.add("hiddenSide");
      });
    });
  }, []);
  return (
    <div className="sideBar  bg-light hiddenSide">
      <div className="d-grid  gap-3 my-5 mx-3 ">
        <NavLink to="/allChild" className="btn ">
          <i className="fa-solid fa-child pe-2 fs-4"></i>
          All Child
        </NavLink>

        <NavLink to="/addChild" className="btn">
          <i className="fa-solid fa-person-circle-plus fs-4 pe-2"></i>
          Add Child
        </NavLink>

        <NavLink to="/allTeacher" className="btn">
          <i className="fa-solid fa-chalkboard-user fs-5 pe-2"></i>
          All Teacher
        </NavLink>
        <NavLink to="/addTeacher" className="btn">
          <i className="fa-solid fa-user-plus fs-5 pe-2"></i>
          Add Teacher
        </NavLink>
        <NavLink to="/childToday" className="btn">
          <i className="fa-solid fa-calendar-day fs-5 pe-2"></i>
          Child Today
        </NavLink>

        <NavLink to="/departments" className="btn">
          <i className="fa-solid fa-clipboard-list fs-5 pe-2"></i>
          Departments
        </NavLink>
        <NavLink to="/notesCategory" className="btn">
          <i className="fa-solid fa-note-sticky  fs-5 pe-2"></i>
          Notes Category
        </NavLink>
        <NavLink to="/servey" className="btn">
          <i className="fa-solid fa-list-check fs-5 pe-2"></i>
          Servey
        </NavLink>
        <NavLink to="/Notifications" className="btn">
          <i className="fa-solid fa-bell  fs-5 pe-2"></i>
          Notifications
        </NavLink>

        <NavLink to="/admins" className="btn">
          <i className="fa-solid fa-user-tie  fs-5 pe-2"></i>
          Admins
        </NavLink>
        {/* <NavLink to="/reports" className="btn">
          <i className="fa-solid fa-clipboard fs-5 pe-2"></i>
          Reports
        </NavLink> */}
      </div>
    </div>
  );
};

export default SideBar;
