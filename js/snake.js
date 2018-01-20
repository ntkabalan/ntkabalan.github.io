window.onload = () => {
    // Get the canvas element
    let canvas = document.querySelector('.game-board');

    // Get game context
    let context = canvas.getContext('2d');

    // Initial player X and Y positions
    let posX = 10;
    let posY = 10;

    // Apple X and Y positions
    let appleX = 15;
    let appleY = 15;

    // Set the number of spaces on the gameboard, as well as the scale of each space
    let gameBoardHeightWidth = 20;
    let scale = 20;

    // Player X and Y velocities
    let velocityX = 0;
    let velocityY = 0;

    // Array to track snake's position, and a count of his length
    let trail = [];
    let tailLength = 5;

    // Player score
    let score = 0;
    let highScore = 0;

    // Initialize the high score to 0;
    document.querySelector('.high-score').innerHTML = 'High Score: ' + highScore;

    let game = () => {
        // Update the player's score, as well as the high score
        document.querySelector('.current-score').innerHTML = 'Score: ' + score;
        if (score > highScore) {
            highScore = score;
            document.querySelector('.high-score').innerHTML = 'High Score: ' + highScore;
        }

        // Update the player's position
        posX += velocityX;
        posY += velocityY;

        // Check that the player is in bounds
        if (posX < 0) { posX = gameBoardHeightWidth - 1; }
        if (posX > gameBoardHeightWidth - 1) { posX = 0; }
        if (posY < 0) { posY = gameBoardHeightWidth - 1; }
        if (posY > gameBoardHeightWidth - 1) { posY = 0; }

        // Make the backgroud black
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Set the fill style to lime green
        context.fillStyle='lime';

        for(let i = 0; i < trail.length; i++) {
            // Fill in the spaces occupied by the player
            context.fillRect(trail[i].x * scale, trail[i].y * scale, scale - 2, scale - 2);

            // Check for player collisions with self
            if (trail[i].x == posX && trail[i].y == posY) {
                tailLength = 5;
                trail = []
                posX = 10;
                posY = 10;
                velocityX = 0;
                velocityY = 0;
                score = 0;
            }
        }

        // Push the current coordinates of the player onto the trail array
        trail.push({ x: posX, y: posY });

        // Cut the tail at 'tailLength' spaces
        while(trail.length > tailLength) {
            trail.shift();
        }

        // Check if the player has reached the apple
        if (appleX == posX && appleY == posY) {
            // Increment the player's score
            score += 1;
            // Increment the tail length
            tailLength += 1;
            // Place a new apple
            appleX = Math.floor(Math.random() * gameBoardHeightWidth);
            appleY = Math.floor(Math.random() * gameBoardHeightWidth);
        }

        // Fill in the space occupied by the apple
        context.fillStyle = 'red';
        context.fillRect(appleX * scale, appleY * scale, scale - 2, scale - 2);

        // Lock out any input before the next frame
        inputLock = false;
    }

    // Track the last key pressed
    let lastPressed = null;

    // Track input to ensure that only one keypress is registered per frame
    let inputLock = false;

    // Keypress event
    let keyPress = (button) => {
        switch(button.keyCode) {
            case 37:
                if (lastPressed == 39 || inputLock) {
                    break;
                } else {
                    // Left arrow pressed
                    velocityX = -1;
                    velocityY = 0;
                    lastPressed = 37;
                    inputLock = true;
                    break;    
                }
            case 38:
                if (lastPressed == 40 || inputLock) {
                    break;
                } else {
                    // Up arrow pressed
                    velocityX = 0;
                    velocityY = -1;
                    lastPressed = 38;
                    inputLock = true;
                    break;
                }
            case 39:
                if (lastPressed == 37 || inputLock) {
                    break;
                } else {
                    // Right arrow pressed
                    velocityX = 1;
                    velocityY = 0;
                    lastPressed = 39;
                    inputLock = true;
                    break;
                }
            case 40:
                if (lastPressed == 38 || inputLock) {
                    break;
                } else {
                    // Down arrow pressed
                    velocityX = 0;
                    velocityY = 1;
                    lastPressed = 40;
                    inputLock = true;
                    break;
                }
        }
    }

    document.addEventListener('keydown', keyPress);
    setInterval(game, 65);
}