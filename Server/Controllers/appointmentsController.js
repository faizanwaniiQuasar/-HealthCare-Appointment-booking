const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const Appointment = require("../Models/appointmentsModel");
const User = require("../Models/doctorModel");
const { format, parseISO } = require("date-fns");
const { utcToZonedTime } = require("date-fns-tz");

const addAppointment = catchAsync(async (req, res, next) => {
  const { doctorId, patientId } = req.body;
  const appointmentDate = new Date(req.body.appointmentDate);
  const blockedDays = [0, 3, 5];

  if (blockedDays.includes(appointmentDate.getDay())) {
    return next(
      new AppError(
        "Sorry Appointments are closed on Sundays, wednesdays, and Fridays",
        400
      )
    );
  }

  const appointmentDateISO = appointmentDate.toISOString();
  const appointment = await Appointment.create({
    doctor: doctorId,
    patient: patientId,
    appointmentDate: appointmentDateISO,
  });
  const user = res.status(200).json({
    status: "success",
    message: "Appointment Added for " + appointmentDate,
  });
});

const getAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find().populate("doctor patient");
  res.status(200).json({
    status: "success",
    data: {
      appointments,
    },
  });
});

const getAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "doctor patient"
  );

  res.status(200).json({
    status: "success",
    data: {
      appointment,
    },
  });
});

const updateAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found!" });
  }
  const threeMonthsFromNow = new Date(appointment.createdAt);
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  // console.log(threeMonthsFromNow);

  const appointmentDate = new Date(req.body.appointmentDate);
  // console.log("apointment", req.body.appointmentDate);
  if (appointmentDate > threeMonthsFromNow) {
    return res.status(400).json({
      status: "fail",
      message: "please schedule within 3 months",
    });
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { appointmentDate: req.body.appointmentDate },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedAppointment,
    },
  });
});

const getAppointmentByDoctor = catchAsync(async (req, res, next) => {
  const doctorId = req.params.id;

  const appointment = await Appointment.find({
    doctor: doctorId,
  }).populate("doctor patient");

  res.status(200).json({
    status: "success",
    data: {
      appointment,
    },
  });
});

const getUserAppointments = catchAsync(async (req, res, next) => {
  // find the appointment for current user
  const userId = req.user.id;
  const appointments = await Appointment.find({ patient: userId }).populate(
    "doctor"
  );

  res.status(200).json({
    status: "success",
    data: {
      appointments,
    },
  });
});

const addReview = catchAsync(async (req, res, next) => {
  // find the appointment for current user
  // const userId = "650d6cb40aebb9416e507339";
  const appointment = await Appointment.findById(req.params.id);
  // console.log(appointment.doctor);

  // const doctorId = req.params.id;
  const { content, rating } = req.body;
  // const doctor = await Doctor.findById(doctorId);

  if (!appointment) {
    return next(new AppError("Appointment not found", 404));
  }

  if (rating < 1 || rating > 5) {
    return next(new AppError("Rating must be between 1 to 5", 400));
  }
  if (appointment.reviews.length > 0) {
    return next(new AppError("Review already added", 400));
  }
  appointment.reviews.push({ content, rating });
  await appointment.save();
  res.status(200).json({
    status: "success",
    data: {
      appointment,
    },
  });
});

const deleteAppointment = catchAsync(async (req, res, next) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Appointment deleted successfully",
  });
});

module.exports = {
  addAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  getAppointmentByDoctor,
  getUserAppointments,
  addReview,
  deleteAppointment,
};
