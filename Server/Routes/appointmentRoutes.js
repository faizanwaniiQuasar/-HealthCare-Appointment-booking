const appointmentsController = require("../Controllers/appointmentsController");
const authController = require("../Controllers/authController");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    appointmentsController.addAppointment
  )
  .get(
    authController.protect,
    authController.restrictTo("user", "admin"),
    appointmentsController.getAppointments
  );

router
  .route("/user/")
  .get(
    authController.protect,
    authController.restrictTo("user"),
    appointmentsController.getUserAppointments
  );
router
  .route("/user/:id")
  .patch(
    authController.protect,
    authController.restrictTo("user"),
    appointmentsController.addReview
  );
router
  .route("/doctor/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    appointmentsController.getAppointmentByDoctor
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("user"),
    appointmentsController.getAppointment
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin", "user"),
    appointmentsController.updateAppointment
  );

router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    appointmentsController.deleteAppointment
  );

// router
//   .route("/:id")
//   .get(appointmentsController.getAppointment)
//   .patch(appointmentsController.updateAppointment);

module.exports = router;
