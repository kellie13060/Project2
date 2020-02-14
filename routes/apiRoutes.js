// Require in the necessary dependencies
var db = require("../models");
var passport = require("../config/passport");
// Grab the axios package...
var axios = require("axios");
//require express
// var express = require("express");

// Set up a module.exports to this can be used on other pages
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // res.json("/members");
    res.json(response.data);
  });
  //
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.user
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(function() {
        res.json({});
        console.log("I should be redirecting");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });
  //
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Run the axios.get function...
  // The axios.get function takes in a URL and returns a promise (just like $.ajax)
  app.get("/api/getTriviaQuestions", function(req, res) {
    axios
      .get("https://opentdb.com/api.php?amount=5")
      .then(function(response) {
        // If the axios was successful...
        // Then log the body from the site!
        console.log(response.data);
        res.json(response.data);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  });
};
