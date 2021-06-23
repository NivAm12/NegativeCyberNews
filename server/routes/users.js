const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// load User model
const User = require("../models/user");

// register POST reuuest
router.post("/register", (req, res) => {

  // form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // try to find the user in the database
  User.findOne({ username: req.body.username }).then(user => {

    // if found
    if (user) {
      return res.status(400).json({ username: "Username already exists" });

      // user not found, register permitted
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });

      // hash password before saving in database
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

// login POST reuuest
router.post("/login", (req, res) => {
  
  // form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // get reqeust inputs
  const username = req.body.username;
  const password = req.body.password;

  // find user by username
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Username not found" });
    }

    // check password
    bcrypt.compare(password, user.password).then(isMatch => {

      // user matched
      if (isMatch) {

        // create JWT Payload
        const payload = {
          id: user.id,
          username: user.username
        };

        // sign token
        jwt.sign(
          payload,
          process.env.SECRET,
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
          .json({ message: "Password incorrect" });
      }
    });
  });
});

// export the router
module.exports = router;