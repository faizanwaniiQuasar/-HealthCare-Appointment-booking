import React, { useEffect, useState } from "react";
import "./DocCard.css";
import doctor from "../Assets/doctor.webp";
import axios from "axios";
import { Link } from "react-router-dom";

const DocCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
  const getDoctors = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/doctors",
        config
      );
      console.log(res.data.data.doctors);
      setData(res.data.data.doctors);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []); //eslint-disable-line

  return (
    <>
      {isLoading && <p>Loading....</p>}
      {!isLoading &&
        data.map((item, index) => (
          <div key={index} className="card-container">
            <div className="gradient"></div>
            <div className="profile-down">
              <img src={doctor} alt="doctor"></img>
              <div className="profile-name">{item.name}</div>
              <div className="profile-specialization">
                {item.specialization}
              </div>
              <div className="profile-qualification">
                {item.doctorQualification}
              </div>
              <Link
                to={`/doctor/${item._id}`}
                type="button"
                className="profile-button"
              >
                Contact Me
              </Link>
            </div>
          </div>
        ))}
    </>
  );
};

export default DocCard;
