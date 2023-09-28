const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  doctorQualification: {
    type: String,
    required: [true, "Please provide your Qualification"],
  },
  specialization: {
    type: String,
    required: [true, "Please provide your Specialization"],
  },
  startTime: {
    type: String,
    required: [true, "Please provide start time"],
  },
  endTime: {
    type: String,
    required: [true, "Please provide end time"],
  },
  // reviews: [
  //   {
  //     content: {
  //       type: String,
  //       required: [true, "Please provide review content"],
  //     },
  //     rating: {
  //       type: Number,
  //       min: 1,
  //       max: 5,
  //       required: [true, "Please provide a rating between 1 and 5"],
  //     },
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
  // appointments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  // appointments: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Appointment",
  // },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
