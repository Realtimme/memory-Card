const board = document.querySelector('.game-board');
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

let cards = [...images, ...images]; // duplicate for pairs

// --- Proper shuffle (Fisher–Yates) ---
for (let i = cards.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cards[i], cards[j]] = [cards[j], cards[i]];
}

// --- Render cards ---
cards.forEach(src => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back"><img src="${src}" alt="card image"></div>
    </div>
  `;
  board.appendChild(card);
});

// --- Game logic ---
let flippedCards = [];
let lockBoard = false;

board.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (!card || lockBoard || card.classList.contains('flip')) return;

  card.classList.add('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('.card-back img').src;
    const img2 = card2.querySelector('.card-back img').src;

    if (img1 === img2) {
      // ✅ Match
      flippedCards = [];
      lockBoard = false;
    } else {
      // ❌ No match — flip them back
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
});
