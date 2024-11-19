'use strict';

// Selecting repeated needed elements and puting them in a variable so that we can use them directely with variable name insted writing them again.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// above both are same but getElementById used to select only ID and are faster than querySelector method.
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//We have to define therse variables outside that is in global scope so that it will applies to New btn as we click it.

///////// Starting conditions////////
// changing current scores to 0
const init = function () {
  scores = [0, 0]; //[pl0, pl1]
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0; // will change score to 0
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  playing = true; // by adding playing = true we make roll and hold button active.
  diceEl.classList.add('hidden'); // This will add hidden class in the main HTML file beside class = dice. that is hiding the dice

  //Making player 1 active again//
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // removing the winner player class as we click new button.
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

/////////////////////////
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //Toggle method will add the class if it is not there and if it is there it will remove the class.
};

// Dice Rolling functionality--
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1 : if true, switch to next player.
    if (dice !== 1) {
      //Add dice to the current score
      currentScore = currentScore + dice;
      // currentscore += dice.
      //This will update the current score as per the dice number.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Why ??

      // current0El.textContent = currentScore; // Change later. Need to remove to set score to 0 once player changes.
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// hold score

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to the active player's score.
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score >=100
    if (scores[activePlayer] >= 100) {
      // Finish the Game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('Player--active');
    } else {
      //Switch player.
      switchPlayer();
    }
  }
});

// Resetting the game (Wrote own)

btnNew.addEventListener('click', init);
