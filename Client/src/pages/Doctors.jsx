import React, { useEffect, useState } from "react";
import DocCard from "../Components/DocCard/DocCard";
import AdminDocCard from "../Components/AminDocCard/AdminDocCard";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

function Doctors() {
  const [role, setRole] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
      setRole(role);
    }
  }, []);

  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      }}
    >
      {role === "user" ? <DocCard /> : <AdminDocCard />}
    </div>
  );
}

export default Doctors;
