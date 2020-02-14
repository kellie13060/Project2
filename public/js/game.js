// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  var seconds = 60;
  var intervalId;
  var correct = 0;
  var timeOut;

  $("#start-game").on("click", function(event) {
    console.log("Button clicked");

    // hide button
    $("#start-game").hide();

    $.ajax("/api/getTriviaQuestions", {
      type: "GET"
    }).then(function(res) {
      // loop through the response results and assign variables
      var test = "True";
      for (var i = 0; i < res.results.length; i++) {
        var difficulty = res.results[i].difficulty;
        var question = res.results[i].question;
        var correctAnswer = res.results[i].correct_answer;
        var incorrectAnswer;

        if (test === correctAnswer) {
          incorrectAnswer = "False";
        } else {
          incorrectAnswer = "True";
        }

        // Build the question
        var emptyDiv = $(".empty-div");
        var questionDiv = $("<div>");
        questionDiv.attr("class", "container");
        var questionH1 = $("<h1>");
        questionH1.text(question);
        questionDiv.append(questionH1);

        // Build the answer buttons
        var btnDiv = $("<div>");
        btnDiv.attr("class", "container");
        var correctAnswerBtn = $("<button>");
        correctAnswerBtn.attr("id", "correct");
        correctAnswerBtn.text(correctAnswer);
        btnDiv.append(correctAnswerBtn);

        var btnDiv2 = $("<div>");
        btnDiv2.attr("class", "container");
        var incorrectAnswerBtn = $("<button>");
        incorrectAnswerBtn.attr("id", "incorrect");
        incorrectAnswerBtn.text(incorrectAnswer);
        btnDiv2.append(incorrectAnswerBtn);

        // Append to the page
        emptyDiv.append(questionDiv, btnDiv, btnDiv2);
      }
    });
  });
  function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
});
