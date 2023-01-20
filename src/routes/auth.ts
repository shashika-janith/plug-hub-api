import { Router } from "express";
import passport from "passport";
import { issueJWT } from "../lib/jwtUtil";
import { genPassword } from "../lib/passwordUtils";
import User from "../repository/models/user";

const router = Router();

/**
 * Handles sign-in process.
 */
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.status(200).json({
    token: `Bearer ${issueJWT(req.user)}`,
  });
});

/**
 * Handles sign-up process.
 */
router.post("/register", (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  const { passwordHash, salt } = genPassword(password);

  const user = new User({
    email: email,
    username: email,
    firstName: firstName,
    lastName: lastName,
    passwordHash: passwordHash,
    passwordSalt: salt,
  });

  user
    .save()
    .then((user) => {
      console.log("Saved user details successfully: ", user._id);

      res.status(200).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    })
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.status(500).send(err);
    });
});

router.get("/me", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  res.status(200).send({
    message: "User found",
  });
  // if (req.user) {
  //   res.status(200).json({
  //     id: req.user._id,
  //     firstName: req.user.firstName,
  //     lastName: req.user.lastName,
  //   });
  // }
});

export default router;
