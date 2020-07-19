// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // Here we've add our isAuthenticated middleware to these routes.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page

    // Sends members.html file for front end HTML file to be used when user access /members route. User must be logged in, or isAuthenticated will redirect user to signup page.
    app.get("/members", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

    // Sends singleTrail.html file to be utillized when user accesses /singleTrail route. User must be logged in, or isAuthenticated will redirect user to signup page. 

    app.get("/singleTrail", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/singleTrail.html"))
    })

    // Sends profile.html file to be utilized when user access /profile route. User must be logged in, or isAuthenticated will redirect user to signup page.

    app.get("/profile", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"))
    })

    // Sends singleTrail.html file to be utilized when user access /singleTrail route. User must be logged in, or isAuthenticated will redirect user to signup page.

    app.get("/singleTrail/:id", isAuthenticated,  function (req, res) {
        res.sendFile(path.join(__dirname, "../public/singleTrail.html"))
    })

    // Sends review.html file to be utilized when user access /review route. User must be logged in, or isAuthenticated will redirect user to signup page.

    app.get("/review", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/review.html"))
    })

};
