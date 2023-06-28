var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const width = canvas.width
const height = canvas.height

// Game variables
var x = 50;
var y = 50;
var dx = 2;
var dy = 2;

// Game loop
function gameLoop() {
    // Update game state
    x += dx;
    y += dy;

    if (x + 50 > width || x < 0) {
        dx *= -1
    }

    if (y + 50 > height || y < 0) {
        dy *= -1
    }

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Render game objects
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 50, 50);

    // Call the game loop recursively
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();