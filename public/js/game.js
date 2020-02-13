// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("#start-game").on("click", function(event) {
    console.log("Button clicked");

    // hide button
    $("#start-game").hide();

    $.ajax("/api/getTriviaQuestions", {
      type: "GET"
    }).then(function(res) {
      console.log("grabbed data");
      console.log(res);
    });
  });
});
