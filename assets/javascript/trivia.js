var card = $("#quiz-area");
var countStartNumber = 30;

// clicks

$(document).on("click", "#start-over", function() {
    game.reset();
  });
  
  $(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
  });
  
  $(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion();
  });

// questions

var questions = [{
  question: "What was the original name of the show?",
  answers: ["Insomnia Cafe", "Central Perk", "Coffee House", "Life in New York"],
  correctAnswer: "Insomnia Cafe",
  image: "../assets/images/1.jpg"
}, {
  question: "What was the name of the self help book that the girls loved?",
  answers: ["Be Your Own Person", "Be Your Own Windkeeper", "Be The Change You Wish to See", "Live Your Best Life"],
  correctAnswer: "Be Your Own Windkeeper",
  image: "../assets/images/2.jpg"
}, {
  question: "Where did Monica and Ross' parents jet off to for Thanksgiving?",
  answers: ["Hawaii", "The Netherlands", "Bahamas", "Puerto Rico"],
  correctAnswer: "Puerto Rico",
  image: "../assets/images/3.jpg"
}, {
  question: "What was wrong with the couch Ross returned to the store?",
  answers: ["It was the wrong color", "It was too big", "It was cut in half", "He didn't want it"],
  correctAnswer: "It was cut in half",
  image: "../assets/images/5.jpg"
}, {
  question: "What was Phoebe in charge of at Rachel's suprise party?",
  answers: ["Invitations", "Decorations", "Music", "Cups and Ice"],
  correctAnswer: "Cups and Ice",
  image: "../assets/images/6.jpg"
}, {
  question: "To get over Richard, what did Monica start making?",
  answers: ["Pancakes", "Jam", "Candy", "Cookies"],
  correctAnswer: "Jam",
  image: "../assets/images/7.jpg"
}, {
  question: "How many roses did Ross send to Emily?",
  answers: ["72", "13", "100", "1"],
  correctAnswer: "72",
  image: "../assets/images/8.jpg"
}, {
  question: "Who fell in an open grave?",
  answers: ["Phoebe", "Joey", "Chandler", "Ross"],
  correctAnswer: "Ross",
  image: "../assets/images/9.jpg"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
