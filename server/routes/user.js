const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user')
const { isLoggedIn } = require('../middleware')



//GET USER
router.get("/user", (req, res) => {
    res.send({user: req.user});
});

//LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) { return res.status(500).send({ message: "Invalid username or password!"}) }
      req.logIn(user, (err) =>{
        if (err) { return next(err); }
        return res.send({user: req.user, message: "Successfully logged in!"})
      });
    })(req, res, next);
  });

//LOGOUT
router.get('/logout', (req,res) => {
    try {
        req.logout();
        res.send({ message: "Successfully logged out!"})
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
})


module.exports = router;