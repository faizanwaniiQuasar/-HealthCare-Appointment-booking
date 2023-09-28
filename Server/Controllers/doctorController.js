const Doctor = require("./../Models/doctorModel");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");

const createDoctor = catchAsync(async (req, res, next) => {
  const newDoctor = await Doctor.create({
    name: req.body.name,
    doctorQualification: req.body.doctorQualification,
    specialization: req.body.specialization,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    // reviews: req.body.reviews,
    // ratings: req.body.ratings,
    // appointments: req.body.appointments,
  });

  res.status(201).json({
    status: "success",

    data: {
      doctor: newDoctor,
    },
  });
});

const getAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find();
  res.status(200).json({
    status: "success",
    message: "Doctors fetched successfully",
    data: {
      doctors,
    },
  });
});

const getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return res.status(404).json({ message: "No Doctor found with this id" });
  }
  res.status(200).json({
    status: "success",
    message: "Doctor fetched successfully",
    data: {
      doctor,
    },
  });
});
const updateDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: "Doctor updated successfully",
    data: {
      doctor,
    },
  });
});

const deleteDoctor = catchAsync(async (req, res, next) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Doctor deleted successfully",
  });
});

// const addReview = catchAsync(async (req, res, next) => {
//   // find the appointment for current user
//   const doctorId = req.params.id;
//   const { content, rating } = req.body;
//   const doctor = await Doctor.findById(doctorId);
//   if (!doctor) {
//     return next(new AppError("Doctor not found", 404));
//   }

//   if (rating < 1 || rating > 5) {
//     return next(new AppError("Rating must be between 1 to 5", 400));
//   }

//   doctor.reviews.push({ content, rating });
//   await doctor.save();
//   res.status(200).json({
//     status: "success",
//     message: "Rating added successfully",
//   });
// });

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  // addReview,
};
