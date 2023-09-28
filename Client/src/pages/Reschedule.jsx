import React, { useEffect, useState } from "react";
import "../Components/AppointmentCard/AppointmentCard.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from "date-fns";
import "../Components/Calender/Calender.css";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Reschedule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { appointmentId } = state;
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 5 && day !== 3;
  };

  const addAppointment = async (e) => {
    e.preventDefault();

    if (startDate === null) return toast("Plese select a date");

    if (startDate < Date.now()) return toast("please select a date in future");

    const body = {
      doctorId: data._id,
      patientId: userId,
      appointmentDate: startDate,
    };
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/appointment/" + appointmentId,
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
        toast("Appointment rescheduled successfully");
      }
      navigate("/my-appointments");
    } catch (err) {
      if (err.response.data.message === "please schedule within 3 months")
        return toast("Please schedule within 3 months");
      toast(err.message);
      console.error(err);
    }
  };

  const getDoctor = async () => {
    try {
      setLoading(true);
      const res = await axios("http://localhost:3000/api/v1/doctors/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      //   console.log(res);
      setData(res.data.data.doctor);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDoctor();
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    setUserId(decodedToken.id);
  }, []);

  return (
    <div className="card-container">
      <div className="profile-down">
        <div className="calender">
          <p>Select date for appointmet</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            filterDate={isWeekday}
            placeholderText="Select Appointment Date"
            dayClassName={(date) => {
              const day = getDay(date);
              if (day !== 0 && day !== 5 && day !== 3) {
                return "custom-red-day"; // Apply custom style for these days
              }
              return null;
            }}
            withPortal
          />
        </div>
        {loading && <p>loading...</p>}
        {!loading && (
          <>
            <div className="profile-name">{data.name}</div>
            <div className="profile-specialization">{data.specialization}</div>
            <div className="profile-qualification">
              {data.doctorQualification}
            </div>
            <div className="profile-qualification">
              Timing: {data.startTime} - {data.endTime}
            </div>
            <button
              className="profile-button"
              onClick={(e) => addAppointment(e)}
            >
              Update Slot
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Reschedule;
