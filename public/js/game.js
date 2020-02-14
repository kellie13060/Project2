// Make sure we wait to attach our handlers until the DOM is fully loaded.

var seconds = 60;
var intervalId;
var correct = 0;
var timeOut;

$(function () {


  $("#start-game").on("click", function (event) {
    console.log("Button clicked");

    // hide button
    $("#start-game").hide();
    $(".game").show();

    $.ajax("/api/getTriviaQuestions", {
      type: "GET"
    }).then(function (res) {
      console.log(res);
      // loop through the response results and assign variables
      for (var i = 0; i < res.results.length; i++) {
        var difficulty = res.results[i].difficulty;
        var question = res.results[i].question;
        question = question.replace(/&quot;/g, '\"');
        question = question.replace(/&#039;/g, "\'");
        var correctAnswer = res.results[i].correct_answer;

        // Build the question
        var gameDiv = $(".game-div");
        var questionDiv = $("<div>");
        questionDiv.attr("class", "container");
        var questionH1 = $("<h1>");
        questionH1.text(question);
        questionDiv.append(questionH1);

        // Build the buttons
        var btnDiv = $("<div>");
        btnDiv.attr("class", "container");
        btnDiv.css("padding", "20px");
        // True button
        var trueAnswerBtn = $("<button>");
        trueAnswerBtn.css("margin", "0px 15px 0px 15px");
        trueAnswerBtn.attr("class", "button is-medium answer");
        trueAnswerBtn.attr("id", "t" + i);
        trueAnswerBtn.text("True");
        // False button
        var falseAnswerBtn = $("<button>");
        falseAnswerBtn.css("margin", "0px 15px 0px 15px");
        falseAnswerBtn.attr("class", "button is-medium answer");
        falseAnswerBtn.attr("id", "f" + i);
        falseAnswerBtn.text("False");
        // Add correct id to the right button
        if (correctAnswer === "True") {
          trueAnswerBtn.attr("value", "correct");
        } else {
          falseAnswerBtn.attr("value", "correct");
        }
        // add buttons to btnDiv
        btnDiv.append(trueAnswerBtn);
        btnDiv.append(falseAnswerBtn);
        // Append btnDiv to the page on emptyDiv
        gameDiv.prepend(questionDiv, btnDiv);
      }
    });
  });

  // Time Converter
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

// Event handler for when a True/False button is clicked
$(".game-div").on("click", ".answer", function() {
  var buttonId = $(this)[0].id;
  console.log(buttonId);
  if (buttonId.includes("t")) {
    buttonId = buttonId.replace("t", "f");
  } else {
    buttonId = buttonId.replace("f", "t");
  }
  $("#" + buttonId).removeClass("is-info");
  $(this).addClass("is-info");
});

$(".submit").on("click", ".game", function() {
  console.log(correct);
});
