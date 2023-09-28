import "./AddDoctor.css";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, qualification, specialization, start, end } =
      e.target.elements;
    const body = {
      name: name.value,
      doctorQualification: qualification.value,
      specialization: specialization.value,
      startTime: start.value,
      endTime: end.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/doctors/create",
        body,
        config
      );
      console.log(res);
      if (res.status === 201) {
        toast("Doctor profile created");
      }
      navigate("/home");
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Doctor Details</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <input
              name="name"
              type="text"
              placeholder="Enter Dr Name"
              required
            />
          </div>
          <div className="input">
            <input
              name="qualification"
              type="text"
              placeholder="Enter Dr Qualification"
              required
            />
          </div>
          <div className="input">
            <input
              name="specialization"
              type="text"
              placeholder="Enter Dr Specialization"
              required
            />
          </div>
          <div className="input">
            <input
              name="start"
              type="text"
              placeholder="Session Start Time"
              required
            />
          </div>
          <div className="input">
            <input
              name="end"
              type="text"
              placeholder="Session End Time"
              required
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddDoctor;
