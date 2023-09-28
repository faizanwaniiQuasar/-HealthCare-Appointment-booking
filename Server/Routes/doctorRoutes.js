const doctorController = require("../Controllers/doctorController");
const authController = require("../Controllers/authController");

const express = require("express");
const router = express.Router();
router
  .route("/create")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    doctorController.createDoctor
  );
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "user"),
    doctorController.getAllDoctors
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "user"),
    doctorController.getDoctor
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    doctorController.updateDoctor
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    doctorController.deleteDoctor
  );

// router
//   .route("/review/:id")
//   .patch(
//     authController.protect,
//     authController.restrictTo("user"),
//     doctorController.addReview
//   );

module.exports = router;
