import React, { useState } from "react";
import "./RatingReview.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const RatingReview = ({ isRatingOpen, setIsRatingOpen, activeAppointment }) => {
  const [number, setNumber] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [hoverStar, setHoverStar] = useState(undefined);

  const handleText = () => {
    switch (number || hoverStar) {
      case 0:
        return "Evaluate";
      case 1:
        return "Dissatifation";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "Evaluate";
    }
  };
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
  const handleReviewClick = async () => {
    const body = {
      content: reviewText,
      rating: number,
    };
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/appointment/user/${activeAppointment}`,
        body,
        config
      );
      console.log(res);
      if (res.status === 200) toast("Review Added");
    } catch (err) {
      console.error(err);
    }
    setIsRatingOpen(false);
  };
  return (
    <div className={`modal rating ${isRatingOpen ? "active" : ""}`}>
      <div className="popup">
        <div className="content">
          <div>
            <h1>{handleText()}</h1>
          </div>
          <div className="rating">
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                )
              )}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="write your review here"
          />
          <button
            type="button"
            onClick={handleReviewClick}
            className={` ${!number && "disabled"} `}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingReview;
