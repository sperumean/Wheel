import { Wheel } from 'spin-wheel';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.wheel-container');
    let wheel; // Declare the wheel variable here to be accessible throughout
    const colorScheme = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33F6'];

    document.getElementById('wheelForm').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const names = document.getElementById('itemNames').value.split('\n').filter(Boolean);
        const items = names.map((name, index) => ({
            label: name.trim(),
            backgroundColor: colorScheme[index % colorScheme.length],
        }));

        // Ensure the wheel is created here with the new items
        container.innerHTML = ''; // Clear previous wheel, if any
        wheel = new Wheel(container, { items });
        console.log('Wheel initialized', wheel);
    }); // Ensure this closing bracket matches with the opening bracket of the event listener

    document.getElementById('spinButton').addEventListener('click', () => {
        console.log('Spin button clicked');
        if (!wheel) {
            console.log('Wheel not initialized');
            alert("Please create the wheel first by submitting the form.");
            return;
        }
        const initialSpeed = 700 + Math.random() * 200; // Initial speed between 20 and 30

        const duration = 10000;
        console.log('Spinning wheel...');
        wheel.spin(initialSpeed, duration);

        setTimeout(() => {
            const winnerIndex = wheel.getCurrentIndex();
            console.log(`Winner index: ${winnerIndex}`);
            alert(`The winner is: ${wheel.items[winnerIndex].label}!`);
        }, duration);
    }); // Ensure this closing bracket matches with the opening bracket of the event listener
}); // Ensure this closing bracket matches with the opening bracket of the 'DOMContentLoaded' event listener


