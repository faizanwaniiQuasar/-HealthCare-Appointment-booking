import "./LoginSignup.css";
import { Link } from "react-router-dom";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginSignup = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirm } = e.target.elements;
    const body = {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        body
      );
      console.log(res);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        toast("Signup successfull");
      }
      navigate("/login");
    } catch (error) {
      toast(error.message);
      console.log(error);
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
            <img src={user_icon} alt="person" />
            <input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div className="input">
            <img src={email_icon} alt="email" />
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="password" />
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="password" />
            <input
              name="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div className="p-text">
        <p>
          <Link to="/login">Click Here to Login</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginSignup;
