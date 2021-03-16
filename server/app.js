if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express")
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const session = require('express-session')
const routes = require('./routes/user');
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user')
const cors = require('cors')

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

//session configuartion
app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
    }
}))

//passport configuration
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//connect to the database
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

app.use(cors({origin: 'localhost:5000', credentials:true }));
app.use(express.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})