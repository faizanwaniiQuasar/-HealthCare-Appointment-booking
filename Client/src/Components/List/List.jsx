import React from "react";
import "./List.css";
import axios from "axios";
import { useEffect, useState } from "react";
import RatingReview from "../RatingReview/RatingReview";
import { useNavigate } from "react-router-dom";
const DocCard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState("");

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
  function convertToIST(date) {
    return new Date(date);
  }
  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/appointment/user",
        config
      );
      console.log(res.data.data.appointments);
      setData(res.data.data.appointments);
      const date = new Date(res.data.data.appointments[0].appointmentDate);
      console.log(
        "new Date hai",
        convertToIST(date),
        "is naam ka pehla date tha",
        date,
        ""
      );
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
                {item.doctor.name}
              </div>
              <div className="date">
                <p>Appointment on:</p>
                {new Date(item.appointmentDate).toLocaleString().split(",")[0]}
              </div>
              <div className="time">
                <p>Timing:</p>
                {item.doctor.startTime} to {item.doctor.endTime}
              </div>

              <div className="button">
                <button
                  onClick={() =>
                    navigate(`/appointment/reschedule/${item.doctor._id}`, {
                      state: { appointmentId: `${item._id}` },
                    })
                  }
                >
                  Reshudule
                </button>
                <button
                  onClick={() => {
                    setActiveAppointment(item._id);
                    setIsRatingOpen(true);
                  }}
                >
                  Rating
                </button>
              </div>
            </div>
          );
        })}
      <RatingReview
        isRatingOpen={isRatingOpen}
        setIsRatingOpen={setIsRatingOpen}
        activeAppointment={activeAppointment}
      />
    </>
  );
};

export default DocCard;
