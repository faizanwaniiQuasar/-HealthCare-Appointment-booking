const User = require("./../Models/userModel");
const Appointments = require("./../Models/appointmentsModel");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: {
      users,
    },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found with this id " });
  }
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: {
      user,
    },
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: {
      user,
    },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const userAppointments = await Appointments.find({
    patient: req.params.id,
  });
  if (userAppointments) {
    await Appointments.deleteMany({ patient: req.params.id });
  }
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
