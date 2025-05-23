let score = 0;
let timeLeft = 30;
let gameActive = false;
let alienTimer;
let countdownTimer;
let currentalien = null;

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const holes = document.querySelectorAll(".hole");
const aliens = document.querySelectorAll(".alien");

function init() {
  updateDisplay();

  aliens.forEach((alien, index) => {
    alien.addEventListener("click", () => whackalien(index));
  });

  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
}

function updateDisplay() {
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
}

function startGame() {
  if (gameActive) return;

  gameActive = true;
  startBtn.disabled = true;
  startBtn.textContent = "🎮 Playing...";

  countdownTimer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  spawnalien();
}

function spawnalien() {
  if (!gameActive) return;

  if (currentalien !== null) {
    aliens[currentalien].classList.remove("up");
  }

  const randomHole = Math.floor(Math.random() * 3);
  currentalien = randomHole;

  aliens[randomHole].classList.add("up");

  setTimeout(() => {
    if (currentalien === randomHole && gameActive) {
      aliens[randomHole].classList.remove("up");
    }
  }, 1500);

  alienTimer = setTimeout(spawnalien, 2000);
}

function whackalien(index) {
  if (!gameActive || !aliens[index].classList.contains("up")) return;

  aliens[index].classList.add("hit");
  aliens[index].classList.remove("up");

  score += 10;
  updateDisplay();

  setTimeout(() => {
    aliens[index].classList.remove("hit");
  }, 300);

  currentalien = null;
}

function endGame() {
  gameActive = false;
  clearInterval(countdownTimer);
  clearTimeout(alienTimer);

  aliens.forEach((alien) => {
    alien.classList.remove("up");
  });

  startBtn.disabled = false;
  startBtn.textContent = "🎮 Start Game";

  setTimeout(() => {
    alert(`Game Over! 🎯\nFinal Score: ${score}`);
  }, 500);
}

function resetGame() {
  if (gameActive) {
    clearInterval(countdownTimer);
    clearTimeout(alienTimer);
  }

  score = 0;
  timeLeft = 30;
  gameActive = false;
  currentalien = null;

  aliens.forEach((alien) => {
    alien.classList.remove("up", "hit");
  });

  startBtn.disabled = false;
  startBtn.textContent = "🎮 Start Game";
  updateDisplay();
}

init();
