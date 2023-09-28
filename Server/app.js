const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const AppError = require("./Utils/appError");
const users = require("./Routes/userRoutes");
const doctors = require("./Routes/doctorRoutes");
const appointments = require("./Routes/appointmentRoutes");
const globalErrorHandler = require("./Controllers/error.controller");
const app = express();

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
app.use(express.json());

app.use(cors());

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

const start = () => {
  mongoose.connect(DB).then(() => {
    console.log("database connected");
    app.listen(port, () => {
      console.log(`app is running on port ${port} `);
    });
  });
};
start();

app.use("/api/v1/users", users);
app.use("/api/v1/doctors", doctors);
app.use("/api/v1/appointment", appointments);

/// for all unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
