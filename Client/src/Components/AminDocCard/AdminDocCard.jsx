import React, { useEffect, useState } from "react";
import "./AdminDocCard.css";
import doctor from "../Assets/doctor.webp";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateDoc from "../UpdateDoc/UpdateDoc";

const DocCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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

  async function deleteDoctor(id) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/doctors/${id}`,
        config
      );
      if (res.status === 200) {
        toast("User deleted successfully");
      }
      getDoctors();
    } catch (err) {
      console.log(err);
    }
  }

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
                to={`/doctor/appointments/${item._id}`}
                type="button"
                className="profile-button update"
              >
                Appointments
              </Link>
              <Link
                to={`/doctor/reviews/${item._id}`}
                type="button"
                className="profile-button"
              >
                Reviews
              </Link>

              <div className="action-buttons">
                <button
                  className="btn-up"
                  onClick={() => {
                    setActiveDoctor(item);
                    setIsOpen(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn-del"
                  onClick={() => deleteDoctor(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

      {isOpen && (
        <div>
          <div>
            <UpdateDoc
              activeDoctor={activeDoctor}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              getDoctors={getDoctors}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DocCard;
