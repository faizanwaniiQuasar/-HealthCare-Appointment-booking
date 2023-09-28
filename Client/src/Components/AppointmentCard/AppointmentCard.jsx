import React, { useEffect, useState } from "react";
import "./AppointmentCard.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from "date-fns";
import "../Calender/Calender.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({ data }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState(null);
  console.log(startDate);
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 5 && day !== 3;
  };

  const addAppointment = async (e) => {
    e.preventDefault();

    if (startDate === null) return toast("Plese select a date");

    if (startDate < Date.now()) return toast("please select a date in future");

    const appointmentDate = new Date(startDate).toISOString();

    const body = {
      doctorId: data._id,
      patientId: userId,
      appointmentDate: appointmentDate,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/appointment/",
        body,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast("Appointment booked");
      }
      navigate("/my-appointments");
    } catch (err) {
      toast(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    setUserId(decodedToken.id);
  }, []);

  return (
    <div className="card-container">
      <div className="profile-down">
        <div className="calender">
          <p>Select date for Appointment</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            filterDate={isWeekday}
            placeholderText="Select Appointment Date"
            dayClassName={(date) => {
              const day = getDay(date);
              if (day === 0 || day === 5 || day === 3) {
                return "custom-red-day"; // Apply custom style for these days
              }
              return null;
            }}
            withPortal
          />
        </div>

        <div className="profile-name">{data.name}</div>
        <div className="profile-specialization">{data.specialization}</div>
        <div className="profile-qualification">{data.doctorQualification}</div>
        <div className="profile-qualification">
          Timing: {data.startTime} - {data.endTime}
        </div>
        <button className="profile-button" onClick={(e) => addAppointment(e)}>
          Book Slot
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
