const gameContainer = document.querySelector('.game-container');

// Only create the grid if we are on the flip game page
if (gameContainer) {
  // Define 10 unique colors (for 10 pairs, 20 cards)
  const colors = [
    '#8A9A5B', '#FF5733', '#33FF57', '#96DED1', '#3357FF', '#8B0000',
    '#FF33A5', '#F88379', '#A533FF', '#D8BFD8'
  ];

  // Shuffle the colors and create a deck of 10 pairs (20 cards)
  let shuffledColors = shuffle([...colors, ...colors]);

  // Create a 4x5 grid with 20 cards
  function createGrid() {
    for (let i = 0; i < 20; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="front"></div>
        <div class="back" style="background-color: ${shuffledColors[i]}"></div>
      `;
      card.addEventListener('click', flipCard);
      gameContainer.appendChild(card);
    }
  }

  createGrid();
}

// Shuffle function
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

let firstCard, secondCard;
let lockBoard = false;

// Flip card function
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

// Check if the flipped cards match
function checkForMatch() {
  let isMatch = firstCard.querySelector('.back').style.backgroundColor === secondCard.querySelector('.back').style.backgroundColor;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Unflip cards if no match
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

// Reset board state
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

