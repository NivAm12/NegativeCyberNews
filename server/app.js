if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express")
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const passport = require('passport')
const cors = require('cors')

//Routes paths
const searchRoute = require('./routes/search');
const usersRoute = require("./routes/users");

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// DB config
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

app.use(cors({origin: 'localhost:5000', credentials:true }));
app.use(express.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use("/users", usersRoute);
app.use('/search', searchRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})