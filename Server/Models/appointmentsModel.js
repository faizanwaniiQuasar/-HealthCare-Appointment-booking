const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the patient's name"],
    },
    appointmentDate: {
      type: Date,
      required: [true, "Please provide the appointment date"],
    },
    // startTime: {
    //   type: String,
    // },
    // endTime: {
    //   type: String,
    // },
    reason: {
      type: String,
    },
    reviews: [
      {
        content: {
          type: String,
          required: [true, "Please provide review content"],
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: [true, "Please provide a rating between 1 and 5"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
