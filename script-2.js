const gameContainer = document.querySelector('.game-container');

// Define the matchFacts globally
const matchFacts = [
    "It is illegal to Honk in NYC streets",
    "Houston Street was supposed to be spelled “Houstoun” and not like the Texas city",
    "The famous yellow taxi cabs were not always YELLOW",
    "Empire state has its own zip code",
    "The Statue of Liberty arrived in pieces & took 4 months to assemble",
    "The modern toilet paper was invented in NYC",
    "Publicly flirting in NYC has a $25 fine",
    "NYC is home to Einstein’s eyeballs",
    "Until 1978, Pinball was banned in NYC",
    "Farting in an NYC Church is a misdemeanor"
];

// Only create the grid if we are on the flip game page
if (gameContainer) {
  
  const images = [
    'Assets/image1.jpg', 'Assets/image2.jpg', 'Assets/image3.jpg', 'Assets/image4.jpg',
    'Assets/image5.jpg', 'Assets/image6.jpg', 'Assets/image7.jpg', 'Assets/image8.jpg',
    'Assets/image9.jpg', 'Assets/image10.jpg'
  ];

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
      pairColor: colors[i],
      index: i // Add index for tracking the pair
    });
    pairedCards.push({
      type: 'color',
      value: colors[i],
      index: i // Add the same index for its corresponding pair
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
        card.innerHTML = `
          <div class="front"></div>
          <div class="back" style="background-image: url(${shuffledCards[i].value}); 
                                   background-size: cover; 
                                   border: 5px solid ${shuffledCards[i].pairColor};"
                                   data-index="${shuffledCards[i].index}"></div>
        `;
      } else {
        card.innerHTML = `
          <div class="front"></div>
          <div class="back" style="background-color: ${shuffledCards[i].value};"
                                   data-index="${shuffledCards[i].index}"></div>
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

// Show a popup with the match message
function showPopup(message) {
    // Create a popup div
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.bordercolor = '2px black';
    popup.style.color = 'black';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.textAlign = 'center';
    popup.style.fontFamily = '"New York", serif';
    popup.style.zIndex = '1000'; // Ensure it appears above other elements

    // Add the message content
    popup.innerHTML = `<p>${message}</p>`;

    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#ed2c23';
    closeButton.style.color = '#fff';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontFamily = '"New York", serif';
    
    // Append close button to the popup
    popup.appendChild(closeButton);

    // Close button event listener
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // Append the popup to the body
    document.body.appendChild(popup);
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Get the index of the matched pair
    const matchedIndex = firstCard.querySelector('.back').style.backgroundImage
        ? firstCard.querySelector('.back').dataset.index
        : secondCard.querySelector('.back').dataset.index;

    // Display the corresponding message for the matched pair
    showPopup(matchFacts[matchedIndex]);

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


