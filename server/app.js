if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}   

import express, { json, static } from "express";
const app = express();
import { join } from 'path';
import { connect, connection } from "mongoose";
import session from 'express-session';
import routes from './routes';
import { initialize, session as _session, use, serializeUser, deserializeUser } from 'passport';
import localStrategy from 'passport-local';
import { authenticate, serializeUser as _serializeUser, deserializeUser as _deserializeUser } from './models/user';
import cors from 'cors';

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
app.use(initialize())
app.use(_session())
use(new localStrategy(authenticate()))
serializeUser(_serializeUser())
deserializeUser(_deserializeUser())

//connect to the database
connect(process.env.DB_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    
const db = connection;
db.on("error", console.error.bind(console, "Connection error:"));

app.use(cors({origin: 'localhost:5000', credentials:true }));
app.use(json({ extended: true }));
app.use(static(join(__dirname, 'public')))
app.use('/', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})