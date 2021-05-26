// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const User = require("../../models/user");

// //GET USER
// router.get("/user", (req, res) => {
//   res.send({ user: req.user });
// });

// //LOGIN
// router.post("/login", (req, res, next) => {
//   console.log("aflkasfaklfajfkl")
//   passport.authenticate("local", (err, user) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(500).send({ message: "Invalid username or password!" });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.send({ user: req.user, message: "Successfully logged in!" });
//     });
//   })(req, res, next);
// });

// //LOGOUT
// router.get("/logout", (req, res) => {
//   try {
//     req.logout();
//     res.send({ message: "Successfully logged out!" });
//   } catch (err) {
//     return res.status(500);
//   }
// });

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = new User({ username });
//     const registeredUser = await User.register(user, password);
//     req.login(registeredUser, err =>{
//       if (err) return next(err);
//       res.send({ user: req.user, message: "Successfully signed up" });
//     })
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/user");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  console.log(req.body)
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("alallal")
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      console.log("entered else")
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;