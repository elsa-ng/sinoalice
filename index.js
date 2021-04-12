var express = require("express");
var path = require("path");

var app = express();
var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Hello World!<br /><a href='/about'>Go to the about page</a>");
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/about.html"));
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);