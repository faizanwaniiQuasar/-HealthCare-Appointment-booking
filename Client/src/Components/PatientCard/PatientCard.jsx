import React, { useEffect, useState } from "react";
import "./PatientCard.css";
import UpdateUser from "../UpdateUser/UpdateUser";
import patient from "../Assets/patient.webp";
import axios from "axios";
import { toast } from "react-toastify";

const PatientCard = () => {
  const [activePatient, setActivePatient] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };

  const getPatients = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/api/v1/users", config);
      setData(res.data.data.users);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPatients();
  }, []);
  async function deleteuser(id) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/users/${id}`,
        config
      );
      if (res.status === 200) {
        toast("User deleted successfully");
      }
      getPatients();
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
              <img src={patient} alt="doctor"></img>
              <div className="profile-name">{item.name}</div>
            </div>
            {/* <button type="button" className="profile-button">
              Rating/Review
            </button> */}
            <div className="action-buttons">
              <button
                className="btn-up"
                onClick={() => {
                  setActivePatient(item);
                  setIsOpen(true);
                }}
              >
                Update
              </button>
              {item.role !== "admin" && (
                <button
                  className="btn-del"
                  onClick={() => deleteuser(item._id)}
                  disabled={item.role === "admin"}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}

      {isOpen && (
        <div>
          <div>
            <UpdateUser
              activePatient={activePatient}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              getPatients={getPatients}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PatientCard;
