const circles = document.querySelectorAll('.circle');

// Function to move the circles around the screen
function moveCircle(circle) {
  const container = document.querySelector('.container');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Generate random positions within the container boundaries
  const randomX = Math.random() * (containerWidth - circle.offsetWidth);
  const randomY = Math.random() * (containerHeight - circle.offsetHeight);

  // Apply smooth transform to move the circle
  circle.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Function to apply random speed for each circle
function randomSpeed() {
  return Math.random() * 2 + 2; // Random speed between 2 and 4 seconds
}

// Initialize the circles with continuous movement
function animateCircles() {
  circles.forEach(circle => {
    // Set a different speed for each circle
    circle.style.transitionDuration = `${randomSpeed()}s`;

    // Initial movement
    moveCircle(circle);

    // Recurring movement every few seconds
    setInterval(() => {
      moveCircle(circle);
    }, randomSpeed() * 1000);
  });
}

// Call the animation function once the window has loaded
window.onload = animateCircles;

// Ensure circles reposition on window resize
window.addEventListener('resize', () => {
  circles.forEach(circle => {
    moveCircle(circle);
  });
});

// Switch between modes
document.getElementById("modeSwitch").addEventListener("click", function () {
    const body = document.body;
  
    // landing-mode <-> party-mode
    if (body.classList.contains('landing-mode')) {
      body.classList.remove('landing-mode');
      body.classList.add('party-mode');
      this.textContent = "and its circles!";
      animateCircles(); // Start the animation
    } else {
      body.classList.remove('party-mode');
      body.classList.add('landing-mode');
      this.textContent = "New York";
      isAnimating = false; // Reset animation flag
      fallEffect(); // Trigger falling effect for circles
    }
  });