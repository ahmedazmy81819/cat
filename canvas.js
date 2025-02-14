const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const mazeWidth = 21;  // Must be odd
const mazeHeight = 21; // Must be odd
const cellSize = 30;   // Size of each cell in the maze

canvas.width = mazeWidth * cellSize;
canvas.height = mazeHeight * cellSize;

const cat = {
    x: 0,
    y: 0,
    width: cellSize,
    height: cellSize,
    color: 'orange'
};

let maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(1));

// Directions for movement
const directions = [
    [1, 0],  // Right
    [-1, 0], // Left
    [0, 1],  // Down
    [0, -1]  // Up
];

// Generate the maze
function generateMaze(x, y) {
    maze[y][x] = 0; // Mark the current cell as part of the maze
    let dirs = directions.slice().sort(() => Math.random() - 0.5); // Shuffle directions

    for (let [dx, dy] of dirs) {
        let nx = x + dx * 2, ny = y + dy * 2;

        if (nx >= 0 && nx < mazeWidth && ny >= 0 && ny < mazeHeight && maze[ny][nx] === 1) {
            maze[y + dy][x + dx] = 0; // Carve a path
            generateMaze(nx, ny);
        }
    }
}

generateMaze(1, 1); // Start generating from (1, 1)

const goal = { x: (mazeWidth - 2) * cellSize, y: (mazeHeight - 2) * cellSize, width: cellSize, height: cellSize, color: 'green' };

function drawCat() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = cat.color;
    ctx.fillRect(cat.x, cat.y, cat.width, cat.height);
}

function drawMaze() {
    ctx.fillStyle = 'red';
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

function drawGoal() {
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}

function initializeGame() {
    drawCat();
    drawMaze();
    drawGoal();
    updateGame(); // Ensure the game updates correctly
}

initializeGame();
