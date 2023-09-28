import React from "react";
import PatientCard from "../Components/PatientCard/PatientCard";

function Patients() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      }}
    >
      <PatientCard />
    </div>
  );
}

export default Patients;
