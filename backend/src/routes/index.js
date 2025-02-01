const express = require("express");
const router = express.Router();
const UserController = require("../controller/User-controller");
const userMiddleware = require("../Middleware/user.middleware");
const { body } = require("express-validator");


router.post(
  "/register",
  body("Email").isEmail().withMessage("Email must be a valid email address"),
  body("Password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  UserController.create
);

router.post(
  "/login",
  body("Email").isEmail().withMessage("Please enter your email address"),
  body("Password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  UserController.login
);

router.post("/profile", userMiddleware.userAuth, UserController.userprofile);

router.get('/logout' , userMiddleware.userAuth , UserController.logout);
module.exports = router;
