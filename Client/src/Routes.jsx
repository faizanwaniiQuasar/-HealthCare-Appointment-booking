import NavBar from "./Components/NavBar/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Doctors from "./pages/Doctors";
import MyAppointment from "./pages/MyAppointment";
import DoctorAdd from "./pages/DoctorAdd";
import Patients from "./pages/Patients";
import Doctor from "./pages/Doctor";
import Reschedule from "./pages/Reschedule";
import AppointmentList from "./Components/AppointmentList/AppointmentList";
import ReviewList from "./Components/ReviewList/ReviewList";
// import Appointment from "../../../Server/Models/appointmentsModel";

export const routesList = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },

  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/home",
        element: <Doctors />,
      },
      {
        path: "/add-doc",
        element: <DoctorAdd />,
      },
      {
        path: "/patients",
        element: <Patients />,
      },
      {
        path: "/my-appointments",
        element: <MyAppointment />,
      },
      {
        path: "/admin",
        element: <SignUp />,
      },
      {
        path: "/updateuser/:id",
        element: <h1>update user</h1>,
      },
      // {
      //   path: "/updateuser",
      //   element: <h1>Go to Patients tab to access this page</h1>,
      // },
      {
        path: "/doctor/:id",
        element: <Doctor />,
      },
      {
        path: "/appointment/reschedule/:id",
        element: <Reschedule />,
      },
      {
        path: "doctor/appointments/:id",
        element: <AppointmentList />,
      },
      {
        path: "doctor/reviews/:id",
        element: <ReviewList />,
      },
    ],
  },
];
