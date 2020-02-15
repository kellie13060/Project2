// set correct variable
var correct = 0;
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $("#start-game").on("click", function (event) {
    console.log("Button clicked");

    // hide button
    $("#start-game").hide();
    $(".game").show();

    // Ajax call to the backend to get the trivia questions
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
        trueAnswerBtn.attr("class", "button is-medium answer not-selected");
        trueAnswerBtn.attr("id", "t" + i);
        trueAnswerBtn.text("True");

        // False button
        var falseAnswerBtn = $("<button>");
        falseAnswerBtn.css("margin", "0px 15px 0px 15px");
        falseAnswerBtn.attr("class", "button is-medium answer not-selected");
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
  $("#" + buttonId).addClass("not-selected");
  $(this).removeClass("not-selected");
  $(this).addClass("is-info");
});

$(".submit").on("click", function() {
  $(".submit").remove();
  var btns = $(".is-info");
  var notSelected = $(".not-selected");
  console.log(notSelected);
  for (var i = 0; i < btns.length; i++) {
    console.log(btns[i]);
    if (btns[i].value === "correct") {
      correct++;
      btns[i].disabled = true;
      notSelected[i].remove();
    } else {
      btns[i].remove();
      notSelected[i].disabled = true;
    }
  }
  console.log(correct);
  $(".score").html(
    "<strong>You got " + correct + " out of 5 correct!</strong>"
  );
  // Display the play again button, and set correct to 0/
  $(".again").show();
  correct = 0;
});

// button listener to play again. This will refresh the page
$(".again").on("click", function() {
  // refresh page
  window.location.reload();
});
