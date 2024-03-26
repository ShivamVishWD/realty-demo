const express = require('express');
const app = express();
//Create Database Connection
// import routes from './Routes/routes';
const apiRoutes = require('./routes/API_Routes');
const PageRoutes = require('./routes/routes');
// const fetch = require('node-fetch');
// import fetch from 'node-fetch';
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');


const dotenv = require('dotenv');
dotenv.config();
const APP_PORT =  process.env.PORT || 3000;
const server = require('http').createServer(app);

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,POST');
        return res.status(200).json({});
    }
    next();
});

//Initialize Session
app.use(session({
    secret: 'L&T',
    resave: true,
    maxAge: 900000,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());
//Defined the Routes
//Setup The View Engine
app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use('/Uploads', express.static('Uploads'));
//Pass the DATA
app.use(express.urlencoded({ extended: false }));
// app.use(express.limit(100000000));

//Join Public Fodler
app.use(express.static(path.join(__dirname, '/public')));
//Routes for Pages
app.use('/', PageRoutes);
app.use('/api', apiRoutes);



server.listen(APP_PORT, () => {
    console.log(`Server Started At PORT ${APP_PORT}`);
});