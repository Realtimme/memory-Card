const board = document.querySelector('.game-board');
const clicksound = new Audio('sounds/click.mp3');
const matchsound = new Audio('sounds/match.mp3');
const winsound = new Audio('sounds/win.mp3');
const wrongsound = new Audio('sounds/wrong.mp3');


const images = [
  'images/cato.png',
  'images/dogo.png',
  'images/playboy carti.png',
  'images/frogo.png',
  'images/MAMA.png',
  'images/angy bird.png',
  'images/ring.png',
  'images/necklace.png'
];

let cards = [...images, ...images];

// --- Shuffle ---
for (let i = cards.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cards[i], cards[j]] = [cards[j], cards[i]];
}

// --- Timer ---
const startTime = Date.now();

// --- Render cards ---
cards.forEach(src => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">
        <img src="${src}" alt="card image">
      </div>
    </div>
  `;

  board.appendChild(card);
});

// --- Game logic ---
let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;

let moves = 0;
const moveCountElement = document.getElementById('move-count');

board.addEventListener('click', e => {
  const card = e.target.closest('.card');

  if (!card || lockBoard || card.classList.contains('flip')) return;

  card.classList.add('flip');
  navigator.vibrate(100);
  clicksound.currentTime = 0;
  clicksound.play();
  flippedCards.push(card);

  moves++;
  moveCountElement.textContent = `Moves: ${moves}`;
  if (flippedCards.length === 2) {
    lockBoard = true;

    const [card1, card2] = flippedCards;

    const img1 = card1.querySelector('.card-back img').src;
    const img2 = card2.querySelector('.card-back img').src;

    if (img1 === img2) {
      navigator.vibrate(300);
      matchsound.currentTime = 0;
      matchsound.play();
      // ✅ Match
      matchedPairs++;

      flippedCards = [];
      lockBoard = false;

      // 🎉 Check win
      if (matchedPairs === images.length) {
        const endTime = Date.now();
        const seconds = ((endTime - startTime) / 1000).toFixed(1);

        setTimeout(() => {
          showWinMessage(seconds, moves);
          navigator.vibrate([500, 200, 500]);
          winsound.currentTime = 0;
          winsound.play();
        }, 500);
      }

    } else {
      // ❌ No match
      navigator.vibrate([200, 100, 200]);
      wrongsound.currentTime = 0;
      wrongsound.play();

      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');

        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
});

// --- Win popup ---
function showWinMessage(time,moves) {
  const popup = document.createElement('div');

  popup.classList.add('popup');

  popup.innerHTML = `
    <div class="popup-content">
      <h1>🎉 Congrats!</h1>
      <p>You solved it in <strong>${time} seconds</strong></p>
      <p>Total moves: <strong>${moves}</strong></p>
      <p>with <strong>${moves}</strong> moves!</p>
      <button id="restart-btn">Play Again</button>
    </div>
  `;

  document.body.appendChild(popup);

  document
    .getElementById('restart-btn')
    .addEventListener('click', () => {
      location.reload();
    });
}