const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const helpers = require('./lib/exphbs_helpers');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

dotenv.config();
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        section: helpers.header_section
    }
}));
app.set('view engine', '.hbs');
app.use(express.static('static'));

// setup a 'route' to listen on the default url path
app.get("/", function (req, res) {
    res.render('landing', {
        data: null,
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
    },{
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

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);