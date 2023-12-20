const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware.js");
const User = require("../models/User2");

const router = express.Router();

router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Please Enter Your name"), //body den gelen name bos olmasin

    body("email")
      .isEmail()
      .withMessage("Please Enter valid email")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email is already exists!");
          }
        });
      }),

    body("password").not().isEmpty().withMessage("Please Enter a password"),
  ],
  authController.createUser
);
router.route("/login").post(authController.LoginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);

module.exports = router;
