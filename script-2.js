const gameContainer = document.querySelector('.game-container');

// Only create the grid if we are on the flip game page
if (gameContainer) {
  // Define 10 unique image URLs (located in the "Assets" folder)
  const images = [
    'Assets/image1.jpg', 'Assets/image2.jpg', 'Assets/image3.jpg', 'Assets/image4.jpg',
    'Assets/image5.jpg', 'Assets/image6.jpg', 'Assets/image7.jpg', 'Assets/image8.jpg',
    'Assets/image9.jpg', 'Assets/image10.jpg'
  ];

  // Define 10 unique colors for plain cards
  const colors = [
    '#8A9A5B', '#FF5733', '#33FF57', '#96DED1', '#3357FF', '#8B0000',
    '#FF33A5', '#F88379', '#A533FF', '#D8BFD8'
  ];

  // Pair each image with a corresponding color
  let pairedCards = [];
  for (let i = 0; i < images.length; i++) {
    pairedCards.push({
      type: 'image',
      value: images[i],
      pairColor: colors[i] // Store corresponding color for border
    });
    pairedCards.push({
      type: 'color',
      value: colors[i]
    });
  }

  // Shuffle the pairs of cards (20 total)
  let shuffledCards = shuffle(pairedCards);

  // Create a 4x5 grid with 20 cards
  function createGrid() {
    for (let i = 0; i < 20; i++) {
      const card = document.createElement('div');
      card.classList.add('card');

      if (shuffledCards[i].type === 'image') {
        // If it's an image, apply the image and set the border to match its pair
        card.innerHTML = `
          <div class="front"></div>
          <div class="back" style="background-image: url(${shuffledCards[i].value}); 
                                   background-size: cover; 
                                   border: 5px solid ${shuffledCards[i].pairColor};"></div>
        `;
      } else {
        // If it's a color card, apply the color
        card.innerHTML = `
          <div class="front"></div>
          <div class="back" style="background-color: ${shuffledCards[i].value};"></div>
        `;
      }

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
  let isMatch = false;

  // If one card is an image, the other should be its corresponding color
  if (firstCard.querySelector('.back').style.backgroundImage && secondCard.querySelector('.back').style.backgroundColor) {
    isMatch = firstCard.querySelector('.back').style.borderColor === secondCard.querySelector('.back').style.backgroundColor;
  } else if (firstCard.querySelector('.back').style.backgroundColor && secondCard.querySelector('.back').style.backgroundImage) {
    isMatch = firstCard.querySelector('.back').style.backgroundColor === secondCard.querySelector('.back').style.borderColor;
  }

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


