const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const express = require("express");
const router = express.Router();
const { signup, login } = require("../Controllers/authController");

router.route("/signup").post(signup);
router.route("/login").post(login);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );
module.exports = router;
