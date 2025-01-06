document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#grid");
    const scoreDisplay = document.querySelector("#score");
    const width = 10; // Grid width
    const height = 20; // Grid height
    let squares = [];
    let currentPosition = 4;
    let currentRotation = 0;
    let score = 0;
  
    // Create grid squares
    for (let i = 0; i < width * height; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);
    }
  
    // Tetrominoes
    const tetrominoes = [
      [ // I Tetromino
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
      ],
      [ // O Tetromino
        [0, 1, width, width + 1],
      ],
      [ // T Tetromino
        [1, width, width + 1, width + 2],
        [1, width + 1, width * 2 + 1, width + 2],
        [width, width + 1, width + 2, 1],
        [1, width, width + 1, width * 2 + 1],
      ],
      [ // S Tetromino
        [1, 2, width, width + 1],
        [0, width, width + 1, width * 2 + 1],
      ],
      [ // Z Tetromino
        [0, 1, width + 1, width + 2],
        [1, width, width + 1, width * 2],
      ],
      [ // L Tetromino
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width + 1, width + 2, 2],
        [1, width + 1, width * 2 + 1, width * 2 + 2],
        [width, width + 1, width + 2, width * 2],
      ],
      [ // J Tetromino
        [1, width + 1, width * 2 + 1, width * 2],
        [0, 1, 2, width + 2],
        [1, width + 1, width * 2 + 1, width],
        [width, width + 1, width + 2, 0],
      ],
    ];
  
    const colors = [
      "tetromino-I",
      "tetromino-O",
      "tetromino-T",
      "tetromino-S",
      "tetromino-Z",
      "tetromino-L",
      "tetromino-J",
    ];
  
    let random = Math.floor(Math.random() * tetrominoes.length);
    let current = tetrominoes[random][currentRotation];
  
    // Draw the Tetromino
    function draw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino");
        squares[currentPosition + index].classList.add(colors[random]);
      });
    }
  
    // Undraw the Tetromino
    function undraw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino");
        squares[currentPosition + index].classList.remove(colors[random]);
      });
    }
  
    // Move down function
    function moveDown() {
      undraw();
      currentPosition += width;
      draw();
      freeze();
    }
  
    // Freeze function
    function freeze() {
      if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
        current.forEach(index => squares[currentPosition + index].classList.add("taken"));
        random = Math.floor(Math.random() * tetrominoes.length);
        current = tetrominoes[random][currentRotation];
        currentPosition = 4;
        draw();
        addScore();
        gameOver();
      }
    }
  
    // Move left
    function moveLeft() {
      undraw();
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
      if (!isAtLeftEdge) currentPosition -= 1;
      if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        currentPosition += 1;
      }
      draw();
    }
  
    // Move right
    function moveRight() {
      undraw();
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
      if (!isAtRightEdge) currentPosition += 1;
      if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        currentPosition -= 1;
      }
      draw();
    }
  
    // Rotate
    function rotate() {
      undraw();
      currentRotation = (currentRotation + 1) % tetrominoes[random].length;
      current = tetrominoes[random][currentRotation];
      draw();
    }
  
    // Add score
    function addScore() {
      for (let i = 0; i < height; i++) {
        const row = Array.from({ length: width }, (_, j) => i * width + j);
        if (row.every(index => squares[index].classList.contains("taken"))) {
          score += 10;
          scoreDisplay.innerText = score;
          row.forEach(index => {
            squares[index].classList.remove("taken", "tetromino");
            squares[index].className = "";
          });
          const squaresRemoved = squares.splice(i * width, width);
          squares = squaresRemoved.concat(squares);
          squares.forEach(cell => grid.appendChild(cell));
        }
      }
    }
  
    // Game over
    function gameOver() {
      if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        alert("Game Over!");
        clearInterval(timerId);
      }
    }
  
    // Controls
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") moveLeft();
      else if (e.key === "ArrowRight") moveRight();
      else if (e.key === "ArrowDown") moveDown();
      else if (e.key === "ArrowUp") rotate();
    });
  
    // Start the game
    const timerId = setInterval(moveDown, 1000);
  });
  