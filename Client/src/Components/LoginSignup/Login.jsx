import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";

import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import axios from "axios";
import { toast } from "react-toastify";

function LoginSignup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const body = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        body
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        toast("login successfull");
        navigate("/home");
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toast(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Healer</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="email" />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="password" />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="click" className="submit">
            Login
          </button>
        </div>
      </form>
      <div className="p-text">
        <p>
          <Link to="/signup">Click Here to Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
export default LoginSignup;
