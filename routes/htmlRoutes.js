// Requiring path so we can use relative routes to our HTML files
var path = require("path");
// var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/game", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });
  //   // Load example page and pass in an example by id
  //   app.get("/example/:id", function (req, res) {
  //     db.Example.findOne({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function (dbExample) {
  //       res.render("example", {
  //         example: dbExample
  //       });
  //     });
  //   });
};
