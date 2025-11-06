const board = document.querySelector('.game-board');
const icons = ['🍎','🍌','🍒','🍇','🍉','🍍','🥝','🍑'];
let cards = [...icons, ...icons]; // duplicate to make pairs

// Shuffle the cards
cards.sort(() => 0.5 - Math.random());

// Render cards
cards.forEach(icon => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${icon}</div>
    </div>
  `;
  board.appendChild(card);
});

// Game logic
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
    const icon1 = card1.querySelector('.card-back').textContent;
    const icon2 = card2.querySelector('.card-back').textContent;

    if (icon1 === icon2) {
      flippedCards = [];
      lockBoard = false;
    } else {
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
});
