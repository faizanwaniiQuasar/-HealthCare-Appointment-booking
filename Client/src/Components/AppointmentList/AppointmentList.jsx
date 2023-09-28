import React from "react";
import "./ApointmentList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import RatingReview from "../RatingReview/RatingReview";
import { useNavigate, useParams } from "react-router-dom";
const AppointmentList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState("");
  const { id } = useParams();
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };

  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/appointment/doctor/" + id,
        config
      );
      console.log(res.data.data.appointment);
      setData(res.data.data.appointment);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []); //eslint-disable-line
  return (
    <>
      {/* <AppointmentCard /> */}
      {isLoading && <h4>Loading.....</h4>}
      {!isLoading &&
        data.map((item, index) => {
          return (
            <div key={index} className="list-container">
              <div className="doctor" style={{ textTransform: "capitalize" }}>
                {item.patient.name}
              </div>
              <div className="date">
                <p>Appointment on:</p>
                {new Date(item.appointmentDate).toLocaleString().split(",")[0]}
              </div>
              <div className="time">
                <p>Timing:</p>
                {item.doctor.startTime} to {item.doctor.endTime}
              </div>
            </div>
          );
        })}
      {data.length === 0 && <h1 className="message">No appointments</h1>}
      <RatingReview
        isRatingOpen={isRatingOpen}
        setIsRatingOpen={setIsRatingOpen}
        activeAppointment={activeAppointment}
      />
    </>
  );
};

export default AppointmentList;
