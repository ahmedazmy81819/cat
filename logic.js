document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const velocity = { x: 0, y: 0 };
const speed = 4; // Increase the speed

function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            velocity.y = -speed;
            break;
        case 'ArrowDown':
            velocity.y = speed;
            break;
        case 'ArrowLeft':
            velocity.x = -speed;
            break;
        case 'ArrowRight':
            velocity.x = speed;
            break;
        default:
            break;
    }
}

function handleKeyUp(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            velocity.y = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            velocity.x = 0;
            break;
        default:
            break;
    }
}

function drawCat() {
    ctx.fillStyle = 'orange';
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

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect2.height > rect2.y
    );
}

function checkPuzzleCompletion() {
    if (checkCollision(cat, goal)) {
        alert('You win!');
        resetGame();
    }
}

function resetGame() {
    let validPosition = false;
    while (!validPosition) {
        cat.x = Math.floor(Math.random() * (mazeWidth - 2) + 1) * cellSize;
        cat.y = Math.floor(Math.random() * (mazeHeight - 2) + 1) * cellSize;
        validPosition = maze[cat.y / cellSize][cat.x / cellSize] === 0;
    }
    velocity.x = 0;
    velocity.y = 0;
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    const nextX = cat.x + velocity.x;
    const nextY = cat.y + velocity.y;

    let collision = false;
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
                const obstacle = { x: x * cellSize, y: y * cellSize, width: cellSize, height: cellSize };
                if (checkCollision({ x: nextX, y: nextY, width: cat.width, height: cat.height }, obstacle)) {
                    collision = true;
                }
            }
        }
    }

    if (!collision) {
        cat.x = nextX;
        cat.y = nextY;
    }

    drawCat();
    drawMaze();
    drawGoal();
    checkPuzzleCompletion();

    requestAnimationFrame(updateGame);
}

updateGame();
