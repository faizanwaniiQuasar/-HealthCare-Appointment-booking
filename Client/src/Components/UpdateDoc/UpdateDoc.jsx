import "./UpdateDoc.css";

import { toast } from "react-toastify";
import axios from "axios";
const UpdateDoc = ({ isOpen, setIsOpen, activeDoctor, getDoctors }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, qualification, specialization, startTime, endTime } =
      e.target.elements;
    const body = {
      name: name.value,
      doctorQualification: qualification.value,
      specialization: specialization.value,
      startTime: startTime.value,
      endTime: endTime.value,
    };

    try {
      const res = await axios.patch(
        `http://127.0.0.1:3000/api/v1/doctors/${activeDoctor._id}`,
        body,
        config
      );
      console.log(res);
      if (res.status === 201) {
        toast("Patient profile Updated successfully");
      }
      getDoctors();
      setIsOpen(false);
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
  };
  return (
    <div
      className=""
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        top: 0,
        left: 0,
      }}
      onClick={(e) => {
        setIsOpen(false);
      }}
    >
      <div className="container">
        <div className="header">
          <div className="text">Update Details</div>
          <div className="underline"></div>
        </div>

        <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <input
                defaultValue={activeDoctor.name}
                name="name"
                type="text"
                placeholder="Enter Name"
              />
            </div>
            <div className="input">
              <input
                defaultValue={activeDoctor.specialization}
                name="specialization"
                type="text"
                placeholder="Enter Name"
              />
            </div>
            <div className="input">
              <input
                defaultValue={activeDoctor.doctorQualification}
                name="qualification"
                type="text"
                placeholder="Enter Name"
              />
            </div>
            <div className="input">
              <input
                defaultValue={activeDoctor.startTime}
                name="startTime"
                type="text"
                placeholder="Enter Name"
              />
            </div>
            <div className="input">
              <input
                defaultValue={activeDoctor.endTime}
                name="endTime"
                type="text"
                placeholder="Enter Name"
              />
            </div>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              Update Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateDoc;
