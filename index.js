const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const exphbs = require('express-handlebars');
const HELPERS = require('./lib/exphbs_helpers');
const NAV = require('./lib/config.nav');
const MAILER = require('./lib/mail');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const SLDS_DIR = '/node_modules/@salesforce-ux/design-system/assets';

var someData = [{
    name: "John",
    age: 23,
    occupation: "developer",
    company: "Scotiabank",
    isVisible: false,
    isContract: false
}, {
    name: "Sarah",
    age: 32,
    occupation: "manager",
    company: "TD",
    isVisible: true,
    isContract: true
}];

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

dotenv.config();
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        section: HELPERS.header_section
    }
}));
app.set('view engine', '.hbs');
app.use(express.static('static'));
app.use('/slds', express.static(__dirname + SLDS_DIR));

// setup a 'route' to listen on the default url path
app.get("/", function (req, res) {
    res.render('home', {
        navs: NAV.nav_items('home'),
        layout: 'main'
    });
});

app.get('/members', (req, res) => {
    res.render('members', {
        navs: NAV.nav_items('members'),
        data: someData,
        layout: 'main'
    });
});

app.get('/nmCal', (req, res) => {
    res.render('nmCal', {
        navs: NAV.nav_items('nm calculator'),
        layout: 'main'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        navs: NAV.nav_items('about'),
        layout: 'main'
    });
});

app.get('/join', (req, res) => {
    res.render('join', {
        navs: NAV.nav_items('join'),
        layout: 'main'
    });
});

app.post('/email', (req, res) => {
    const { subject, email, text } = req.body;
    log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});

app.post('/submitform', (req, res) => {
    const { text } = req.body;
    console.log('Data: ', req.body);

    MAILER(text, function(err, data) {
        if (err) {
            console.log('Error: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        console.log('Email Sent!');
        return res.json({ message: 'Email Sent!' });
    });
});

// Error page
app.get('/error', (req, res) => {
    // render the appropriate view
});

// Email sent page
app.get('/submitform/sent', (req, res) => {
    res.render('sent', {
        navs: NAV.nav_items('Home'),
        layout: 'main'
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);