'use strict';
const player1TotalScoreEle = document.querySelector('#score--0');
const player2TotalScoreELe = document.querySelector('#score--1');
const currentScore1ELe = document.querySelector('#current--0');
const currentScore2Ele = document.querySelector('#current--1');
const rollBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
let randomNumber;
let limit = 20;
let player1TotalScore = 0;
let player2TotalScore = 0;
let currentScore1 = 0;
let currentScore2 = 0;
let activePlayer = 1;
const rollDice = function () {
  randomNumber = Math.trunc(Math.random() * 6 + 1);
  diceImg.src = `dice-${randomNumber}.png`;

  if (randomNumber === 1) {
    switchPlayer(activePlayer);
  } else {
    AddToCurrentPoints(activePlayer, randomNumber);
  }
};

const switchPlayer = function () {
  if (activePlayer === 1) {
    currentScore1 = 0;
    currentScore1ELe.textContent = currentScore1;
    activePlayer = 2;
  } else {
    currentScore2 = 0;
    currentScore2Ele.textContent = currentScore2;
    activePlayer = 1;
  }
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

const AddToCurrentPoints = function (activePlayer, rollValue) {
  if (activePlayer === 1) {
    currentScore1 += rollValue;
    currentScore1ELe.textContent = currentScore1;
  } else {
    currentScore2 += rollValue;
    currentScore2Ele.textContent = currentScore2;
  }
};

const checkWinner = function (Limit) {
  if (player1TotalScore >= Limit || player2TotalScore >= Limit) {
    const winner = player1TotalScore > player2TotalScore ? 1 : 2;
    alert(`Player ${winner} wins`);
    rollBtn.style.display = 'none';
    holdBtn.style.display = 'none';
    document
      .querySelector(`.player--${winner - 1}`)
      .classList.add('player--winner');
    document.querySelector(`#current--${winner - 1}`).textContent = 0;

    return true;
  }
  return false;
};

const reset = function () {
  currentScore1 = 0;
  currentScore2 = 0;
  currentScore1ELe.textContent = 0;
  currentScore2Ele.textContent = 0;
  player1TotalScore = 0;
  player2TotalScore = 0;
  player1TotalScoreEle.textContent = 0;
  player2TotalScoreELe.textContent = 0;
  activePlayer = 1;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  rollBtn.style.display = 'block';
  holdBtn.style.display = 'block';
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};

const HoldScore = function () {
  if (activePlayer === 1) {
    player1TotalScore += currentScore1;
    player1TotalScoreEle.textContent = player1TotalScore;
    if (!checkWinner(limit)) switchPlayer();
  } else {
    player2TotalScore += currentScore2;
    player2TotalScoreELe.textContent = player2TotalScore;
    if (!checkWinner(limit)) switchPlayer();
  }
};
reset();
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', HoldScore);
newGameBtn.addEventListener('click', reset);
