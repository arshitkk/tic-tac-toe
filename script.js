// Select all the elements with the class "boxes" and "animate"
let boxes = document.querySelectorAll(".boxes");
let animate = document.querySelectorAll(".animate");

// Select the element that displays the player's turn
let player = document.querySelector('.turn');

// Select the reset button
let reset = document.querySelector('.reset');

// Set the initial turn to 'X'
let turn = 'X';

// Select the element used to show the winning line
let line = document.querySelector('.line');

// Function to change the player's turn
function changeTurn(){
    if (turn === 'X'){
        turn = 'O';
    }
    else{
        turn = 'X';
    }
}

// Function to disable all boxes after a win
const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.style.pointerEvents = 'none';  // Disable click events on all boxes
    });
};

// Function to check if there is a winner
const checkWinner = () => {
    let winner = null;

    // Array representing all possible winning combinations
    let win = [
        // Winning rows
        [0, 1, 2, -0.1, 66, 0],
        [3, 4, 5, -0.1, 210, 0],
        [6, 7, 8, -0.1, 355, 0],
        // Winning columns
        [0, 3, 6, -150, 215, 90],
        [1, 4, 7, -4, 215, 90],
        [2, 5, 8, 140, 215, 90],
        // Winning diagonals
        [0, 4, 8, 0, 212, 45],
        [6, 4, 2, 0, 212, -45],
    ];

    // Loop through each winning combination
    win.forEach((e) => {
        let text = document.querySelectorAll('span');

        // Check if all three positions in a win combination have the same non-empty value
        if ((text[e[0]].innerText === text[e[1]].innerText) &&
            (text[e[1]].innerText === text[e[2]].innerText) &&
            (text[e[0]].innerText !== '')) {

            // If a winner is found, set the winner to the current player
            winner = text[e[0]].innerText;

            // Display the winning line
            line.style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
            line.style.backgroundColor = 'red';
            line.style.opacity = '1';
            line.style.width = '27.5rem';
        }
    });

    // If a winner is found, display the winner message and disable all boxes
    if (winner) {
        player.textContent = `Player "${winner}" Wins`;
        disableAllBoxes();
    }
};

// Main game logic for when a box is clicked
boxes.forEach((box) => {
    let text = box.querySelector('span');
    box.addEventListener('click', () => {
        // If the box is empty, mark it with the current player's turn
        if (text.textContent === '') {
            text.textContent = turn;
            text.style.opacity = 1;
            box.style.pointerEvents = 'none';  // Disable further clicks on this box
            checkWinner();  // Check if the current move caused a win
        }

        // If there is no winner yet, change the turn and update the turn message
        if (!player.textContent.includes('Wins')) {
            changeTurn();
            player.textContent = `Turn for "${turn}"`;
        }
    });
});

// Reset button logic to start a new game
reset.addEventListener('click', () => {
    boxes.forEach(box => {
        let text = box.querySelector('span');
        text.textContent = "";  // Clear the content of all boxes
        line.style.backgroundColor = 'rgba(255, 0, 0, 0';
        box.style.pointerEvents = 'auto';  // Enable clicks on all boxes
        turn = 'X';  // Reset turn to 'X'
        line.style.opacity = '0';
        line.style.width = '0';

        player.textContent = `Start Player "${turn}"`;
    });
});
