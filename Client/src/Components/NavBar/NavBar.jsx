import React, { useState, useEffect } from "react";
import "./NavBar.css";
import logo from "../Assets/logo.webp";
import { Outlet } from "react-router-dom";
import { Link, useNavigate, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const NavBar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
      setRole(role);
    }
  }, []);

  if (!localStorage.getItem("token")) return <Navigate to="/login" />;

  return (
    <>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="nav-links">
          {role === "admin" && (
            <>
              <li>
                <Link to="home">Home</Link>
              </li>
              <li>
                <Link to="add-doc">Add Doctor</Link>
              </li>
              <li>
                <Link to="patients">Patients</Link>
              </li>
              <li>
                <Link to="#">Appointments</Link>
              </li>
            </>
          )}
          {role === "user" && (
            <>
              <li>
                <Link to="home">Home</Link>
              </li>
              <li>
                <Link to="my-appointments">My Appointments</Link>
              </li>
            </>
          )}
        </ul>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="logout-button"
        >
          Logout
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
