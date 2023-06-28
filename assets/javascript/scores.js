function printHighscores() {
  // Function that Either Retrieves Scores from Local Storage
  // or Sets the Highscores Array to an Empty Array
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // Sorts Highscores by the Score Property in Descending Order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < highscores.length; i += 1) {
    // Create a li tag for Each High Score
    var listTag = document.createElement('li');
    listTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    // Display the Newly Created List Element on the Page
    var orderedlistElement = document.getElementById('highscores');
    orderedlistElement.appendChild(listTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear-button').onclick = clearHighscores;

// Run the Above Function upon the Highscore html Page Loads
printHighscores();
