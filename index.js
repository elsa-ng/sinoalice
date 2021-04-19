const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const HELPERS = require('./lib/exphbs_helpers');
const NAV = require('./lib/global_navigations');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const SLDS_DIR = '/node_modules/@salesforce-ux/design-system/assets';

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
        data: NAV.nav_items('home'),
        layout: 'main'
    });
});

app.get('/members', (req, res) => {
    res.render('members', {
        data: NAV.nav_items('members'),
        layout: 'main'
    });
});

app.get('/nmCal', (req, res) => {
    res.render('nmCal', {
        data: NAV.nav_items('nm calculator'),
        layout: 'main'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        data: NAV.nav_items('about'),
        layout: 'main'
    });
});

app.get('/join', (req, res) => {
    res.render('join', {
        data: NAV.nav_items('join'),
        layout: 'main'
    });
});

app.get("/viewData", function (req, res) {
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

    res.render('viewData', {
        data: someData,
        layout: false
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);