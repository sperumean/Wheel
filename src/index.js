import { Wheel } from 'spin-wheel';
import './output.css';
import './index.html';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.wheel-container');
  let wheel;
  let items; // Declare items at a higher scope to be accessible in other functions
  const colorScheme = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33F6'];

  const createWheel = () => {
    const names = document.getElementById('itemNames').value.split('\n').filter(Boolean);
    items = names.map((name, index) => ({
      label: name.trim(),
      backgroundColor: colorScheme[index % colorScheme.length],
      defaultColor: colorScheme[index % colorScheme.length], // Storing original color
    }));

    container.innerHTML = '';
    wheel = new Wheel(container, {
      items,
      //overlayImage: 'https://www.pngplay.com/wp-content/uploads/5/Dot-Symbol-Free-PNG.png', // Add your image URL here
    });
    console.log('Wheel initialized', wheel);
  };

  document.getElementById('wheelForm').addEventListener('submit', (event) => {
    event.preventDefault();
    createWheel();
  });

// ... other parts of your script ...

document.getElementById('spinButton').addEventListener('click', () => {
  if (!wheel) {
    alert("Please create the wheel first by submitting the form.");
    return;
  }

  const initialSpeed = 700 + Math.random() * 200;
  const duration = 10000;

  wheel.spin(initialSpeed, duration);

  setTimeout(() => {
    const winnerIndex = wheel.getCurrentIndex();
    const winnerDisplay = document.getElementById('winnerDisplay'); // Reference to the winner display div

    if (winnerIndex !== undefined && items && winnerIndex < items.length) {
      // Update the wheel with the new colors
      items.forEach((item, index) => {
        item.backgroundColor = index === winnerIndex ? '#FFFF00' : item.defaultColor; // '#FFFF00' is the highlight color
      });

      // Redraw the wheel with updated colors
      wheel.init({ items }); // Reinitialize the wheel with the updated items array

      // Display the winner on the page
      winnerDisplay.textContent = `The winner is: ${items[winnerIndex].label}!`;
      winnerDisplay.style.display = 'block'; // Make the winner display visible

    } else {
      console.error('Winner element not found or items are not properly defined');
    }
  }, duration);
});

});
