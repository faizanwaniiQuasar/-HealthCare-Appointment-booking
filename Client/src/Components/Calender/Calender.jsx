import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from "date-fns";
import "../Calender/Calender.css";

const Calender = ({ userId }) => {
  const [startDate, setStartDate] = useState(null);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 5 && day !== 3;
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      filterDate={isWeekday}
      placeholderText="Select Appointment Date"
      dayClassName={(date) => {
        const day = getDay(date);
        if (day !== 0 && day !== 5 && day !== 3) {
          return "custom-green-day"; // Apply custom style for these days
        }

        return null;
      }}
      withPortal
    />
  );
  // const [date, setDate] = useState(new Date());
  // return (
  //   <DatePicker
  //     showTimeSelect
  //     showIcon
  //     dateFormat="yyyy MMM d h:mmaa"
  //     minTime={new Date(0, 0, 0, 8, 30)}
  //     maxTime={new Date(0, 0, 0, 19, 0)}
  //     selected={date}
  //     onChange={(date) => setDate(date)}
  //   />
  // );
};

export default Calender;
