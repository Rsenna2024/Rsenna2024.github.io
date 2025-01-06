const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas instellingen
canvas.width = 400;
canvas.height = 400;
const box = 20; // Grootte van elk vakje

// Variabelen
let snake, direction, food, score, gameInterval;

// Start het spel opnieuw
function resetGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
    score = 0;

    // Start de game loop
    if (gameInterval) clearInterval(gameInterval); // Stop vorige interval
    gameInterval = setInterval(gameLoop, 100); // Start nieuwe game loop
}

// Teken de slang
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "#ADD8E6"; // Babyblauw
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

// Teken het eten
function drawFood() {
    ctx.fillStyle = "green"; // Groen
    ctx.fillRect(food.x, food.y, box, box);
}

// Beweeg de slang
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "UP":
            head.y -= box;
            break;
        case "DOWN":
            head.y += box;
            break;
        case "LEFT":
            head.x -= box;
            break;
        case "RIGHT":
            head.x += box;
            break;
    }

    // Controleer of de slang voedsel eet
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
    } else {
        snake.pop(); // Verwijder het laatste segment als er geen eten is opgegeten
    }

    // Voeg nieuwe kop toe
    snake.unshift(head);

    // Controleer op botsingen
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert(`Game Over! Your score: ${score}`);
        resetGame(); // Start direct opnieuw
    }
}

// Verwerk input
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Hoofdgame loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Start het spel
resetGame();
