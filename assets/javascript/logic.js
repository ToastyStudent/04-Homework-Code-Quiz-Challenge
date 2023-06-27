// Variables to keep track of the state of the quiz
var currentQuestionNumber = 0;
var timeremaining = questions.length * 15;
var timerId;

// Variables referencing DOM elements
var questionsElement = document.getElementById('questions');
var timerElement = document.getElementById('timer');
var answersElement = document.getElementById('answers');
var submitButton = document.getElementById('submit');
var startButton = document.getElementById('start-button');
var startScreenElement = document.getElementById('start-screen');
var titleElement = document.getElementById('question-title');
var initialsElement = document.getElementById('initials');
var feedbackElement = document.getElementById('feedback-container');
var endScreenElement = document.getElementById('end-screen');
var finalScoreElelement = document.getElementById('final-score');

function startQuiz() {
  // Hide Start Screen
  startScreenElement.setAttribute('class', 'hidden');

  // Reveal Questions
  questionsElement.removeAttribute('class');

  // Start Timer
  timerId = setInterval(clockTick, 900);

  // Display Starting Time
  timerEl.textContent = timeremaining;

  getQuestion();
}

// Function to Display Each New Quiz Question
function getQuestion() {
  // Get Current Question Object from Array of Questions
  var currentQuestion = questions[currentQuestionIndex];

  // Update Question Title with  that of the Current Question
  titleElement.textContent = currentQuestion.title;

  // Clear Out Any Old Question Answers by Setting them to an Empty String
  answersElement.innerHTML = '';

  // Loop over the Answer Choices
  for (var i = 0; i < currentQuestion.answers.length; i++) {
    
    // Create a New Button for Each Choice
    var answer = currentQuestion.answers[i];
    var answerSelector = document.createElement('button');
    answerSelector.setAttribute('class', 'answer');
    answerSelector.setAttribute('value', answer);

    answerSelector.textContent = i + 1 + '. ' + answer;

    // Display the Newly Created Button on The page
    choicesElement.appendChild(answerSelector);
  }
}

// Function to Handle User Selecting a Quiz Answer
function questionClick(event) {
  var buttonElelement = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonElelement.matches('.answer')) {
    return;
  }

  // Check to See if User Answered Incorrectly
  if (buttonElelement.value !== questions[currentQuestionIndex].correctansweranswer) {
    // Penalize User by Decreasing Time Remaining
    timeremaining -= 15;

    if (timeremaining < 0) {
      timeremaining = 0;
    }

    // Display New Time on Page
    timerElement.textContent = timeremaining;

    // Display Whether the User Answered Correctly or Incorrectly
    feedbackElement.textContent = 'Incorrect!';
  } else {

    feedbackElement.textContent = 'Correct!';
  }

  // Display Correct/Incorrect Feedback on Page for 0.5 seconds
  feedbackElement.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackElement.setAttribute('class', 'feedback hidden');
  }, 1000);

  // Move to Next Question via Iteration
  currentQuestionIndex++;

  // Check to Determine if Loop through all Questions is Complete
  if (timeremaining <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// Function to End the Quiz
function quizEnd() {
  // Stop the Timer
  clearInterval(timerId);

  // Display the End Screen
  endScreenElement.removeAttribute('class');

  // Display the User's Final Score
  finalScoreElelement.textContent = timeremaining;

  // Hide the Questions Section
  questionsEl.setAttribute('class', 'hidden');
}

// Function Used to Have the Timer Count Down/End the Quiz if it Reaches 0
function clockTick() {
  // Update the Time Remaining
  timeremaining--;
  timerElement.textContent = timeremaining;

  // Check to Determine if the Time has Expired
  if (timeremaining <= 0) {
    quizEnd();
  }
}

// Function to Save the User's High Score to Local Storage
function saveHighscore() {
  // Obtain the value of "Intials" Input Field
  var initials = initialsEl.value.trim();

  // Check to Determine the Input Field Wasn't Empty
  if (initials !== '') {
    // Fetch Previously Saved Scores from Local Storage, or,
    // if None Exist, sets the Highscores Variable to an Empty Array

    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // Create and Format a New Score Object for the Current User
    var newScore = {
      score: timeremaining,
      initials: initials,
    };

    // Save the High Score to Local Storage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // Redirect the Browser to the High Scores HTML Page
    window.location.href = 'highscores.html';
  }
}

// Function to Check for the Enter Key Being Pressed
// As Opposed to the Button Being Clicked
function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}


// Button Element References

// Upon Clicking the Submit Button, the User Submits Their Initials
submitButton.onclick = saveHighscore;

// Upon Presseing the Enter Key, the User Submits Their Initials
initialsElement.onkeyup = checkForEnter;

// Upon Clicking the Start Button, the User Begins the Quiz
startButton.onclick = startQuiz;

// Upon Clicking an Answer Choice, the Answer is Evaluated as 
// Correct or Incorrect
answersElement.onclick = questionClick;


