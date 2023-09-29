import React from "react";
import "./ReviewList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import RatingReview from "../RatingReview/RatingReview";
import Star from "../star/Star";
import { useNavigate, useParams } from "react-router-dom";
const ReviewList = () => {
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
            item.reviews.length > 0 && (
              <div key={index} className="list-container">
                <h1 className="name">{item.patient.name}</h1>
                {item.reviews.length > 0 &&
                  item.reviews.map((item, index) => {
                    return (
                      <>
                        <p className="review">{item.content}</p>
                        <p className="rating">
                          Rating: <Star rating={item.rating} />{" "}
                        </p>
                        {/* {item.rating} */}
                      </>
                    );
                  })}
              </div>
            )
          );
        })}
      {data.length === 0 && <h1 className="message">No Reviews given yet</h1>}
      <RatingReview
        isRatingOpen={isRatingOpen}
        setIsRatingOpen={setIsRatingOpen}
        activeAppointment={activeAppointment}
      />
    </>
  );
};

export default ReviewList;
