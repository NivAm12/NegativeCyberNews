if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express")
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const passport = require('passport')
const cors = require('cors')

// routes paths
const searchRoute = require('./routes/search');
const usersRoute = require("./routes/users");

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// DB config
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

// if database connection has failed
mongoose.connection.on("error", console.error.bind(console, "Connection error:"));

// port config
const port = process.env.PORT || 5000;

app.use(cors({origin: `localhost:${port}`, credentials:true }));
app.use(express.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use("/users", usersRoute);
app.use('/search', searchRoute);

// assign server listening on PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})