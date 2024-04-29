// Import modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');

const app = express();
const login_register = require('./route/login_register');
const get_page = require('./route_api/get_page');
const room_function = require('./route_api/room_function');

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));


// set the public folder
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// ------------- GET User info --------------
app.get('/user', function (req, res) {
    res.json({
        "id": req.session.userID,
        "username": req.session.username,
        "role": req.session.role,
        "name": req.session.name
    });
});

app.use(login_register);
app.use(get_page);
app.use(room_function);



// ------------ root service ----------
app.get('/', function (req, res) {
    if (req.session.role == 0) {
        res.redirect('/homepage_student');
    } else if (req.session.role == 1) {
        res.redirect('/homepage_lecturer');
    }
    else if (req.session.role == 2) {
        res.redirect('/homepage_staff');
    } else {
        res.sendFile(path.join(__dirname, 'views/homepage.html'));
    }
});

// Start server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
