import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppointmentCard from "../Components/AppointmentCard/AppointmentCard";

export default function Doctor() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

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
  }, []); //eslint-disable-line

  return (
    <>
      {loading && <h4>Loading....</h4>}
      {!loading && <AppointmentCard data={data} />}
    </>
  );
}
