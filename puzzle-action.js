const PUZZLE_HOVER_TINT = "#009900";

const img = new Image();
const canvas = document.querySelector("#canvas");
const stage = canvas.getContext("2d");
let difficulty;
let pieces;
let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;
let currentPiece;
let currentDropPiece;
let mouse;
let gameStarted = false;

// Cronómetro
let timerInterval;
let elapsedTime = 0;
let isPaused = false;
let timerElement;

// Obtener el valor de dificultad y la imagen de la URL
const urlParams = new URLSearchParams(window.location.search);
difficulty = parseInt(urlParams.get('difficulty'), 10);
const imgUrl = urlParams.get('image');


img.addEventListener("load", onImage, false);
img.src = imgUrl;

let piecesClickable = false; // Variable para controlar si las piezas son interactivas o no

function initPuzzle() {
    pieces = [];
    mouse = {
        x: 0,
        y: 0
    };
    currentPiece = null;
    currentDropPiece = null;
    stage.drawImage(
        img,
        0,
        0,
        puzzleWidth,
        puzzleHeight,
        0,
        0,
        puzzleWidth,
        puzzleHeight
    );
    
    buildPieces();
}

function setCanvas() {
    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight;
    canvas.style.border = "1px solid black";
}

function onImage() {
    pieceWidth = Math.floor(img.width / difficulty);
    pieceHeight = Math.floor(img.height / difficulty);
    puzzleWidth = pieceWidth * difficulty;
    puzzleHeight = pieceHeight * difficulty;
    setCanvas();
    initPuzzle();
}

/*function createTitle(msg) {
    stage.fillStyle = "#000000";
    stage.globalAlpha = 0.4;
    stage.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40);
    stage.fillStyle = "#FFFFFF";
    stage.globalAlpha = 1;
    stage.textAlign = "center";
    stage.textBaseline = "middle";
    stage.font = "20px Arial";
    stage.fillText(msg, puzzleWidth / 2, puzzleHeight - 20);
}*/

function buildPieces() {
    let i;
    let piece;
    let xPos = 0;
    let yPos = 0;
    for (i = 0; i < difficulty * difficulty; i++) {
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        pieces.push(piece);
        xPos += pieceWidth;
        if (xPos >= puzzleWidth) {
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    // No se agrega el evento de clic para desordenar aquí
}

function shufflePuzzle() {
    pieces = shuffleArray(pieces);
    stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
    let xPos = 0;
    let yPos = 0;
    for (const piece of pieces) {
        piece.xPos = xPos;
        piece.yPos = yPos;
        stage.drawImage(
            img,
            piece.sx,
            piece.sy,
            pieceWidth,
            pieceHeight,
            xPos,
            yPos,
            pieceWidth,
            pieceHeight
        );
        stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
        xPos += pieceWidth;
        if (xPos >= puzzleWidth) {
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    document.onpointerdown = onPuzzleClick;
}

function checkPieceClicked() {
    for (const piece of pieces) {
        if (
            mouse.x < piece.xPos ||
            mouse.x > piece.xPos + pieceWidth ||
            mouse.y < piece.yPos ||
            mouse.y > piece.yPos + pieceHeight
        ) {
            //PIECE NOT HIT
        } else {
            return piece;
        }
    }
    return null;
}

function updatePuzzle(e) {
    if (!gameStarted || isPaused) return; // Si el juego no ha comenzado o está en pausa, no permitir actualizar el puzzle

    currentDropPiece = null;
    if (e.layerX || e.layerX == 0) {
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
    } else if (e.offsetX || e.offsetX == 0) {
        mouse.x = e.offsetX - canvas.offsetLeft;
        mouse.y = e.offsetY - canvas.offsetTop;
    }

    // Limpiar el lienzo aquí
    stage.clearRect(0, 0, puzzleWidth, puzzleHeight);

    for (const piece of pieces) {
        if (piece == currentPiece) {
            continue;
        }
        stage.drawImage(
            img,
            piece.sx,
            piece.sy,
            pieceWidth,
            pieceHeight,
            piece.xPos,
            piece.yPos,
            pieceWidth,
            pieceHeight
        );
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if (currentDropPiece == null) {
            if (
                mouse.x < piece.xPos ||
                mouse.x > piece.xPos + pieceWidth ||
                mouse.y < piece.yPos ||
                mouse.y > piece.yPos + pieceHeight
            ) {
                //NOT OVER
            } else {
                currentDropPiece = piece;
                stage.save();
                stage.globalAlpha = 0.4;
                stage.fillStyle = PUZZLE_HOVER_TINT;
                stage.fillRect(
                    currentDropPiece.xPos,
                    currentDropPiece.yPos,
                    pieceWidth,
                    pieceHeight
                );
                stage.restore();
            }
        }
    }
    stage.save();
    stage.globalAlpha = 0.6;
    stage.drawImage(
        img,
        currentPiece.sx,
        currentPiece.sy,
        pieceWidth,
        pieceHeight,
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight
    );
    stage.restore();
    stage.strokeRect(
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight
    );
}

function onPuzzleClick(e) {
    if (!gameStarted || isPaused) return; // Si el juego no ha comenzado o está en pausa, no permitir clic en el puzzle

    if (e.layerX || e.layerX === 0) {
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
    } else if (e.offsetX || e.offsetX === 0) {
        mouse.x = e.offsetX - canvas.offsetLeft;
        mouse.y = e.offsetY - canvas.offsetTop;
    }
    currentPiece = checkPieceClicked();
    if (currentPiece !== null) {
        stage.clearRect(
            currentPiece.xPos,
            currentPiece.yPos,
            pieceWidth,
            pieceHeight
        );
        stage.save();
        stage.globalAlpha = 0.9;
        stage.drawImage(
            img,
            currentPiece.sx,
            currentPiece.sy,
            pieceWidth,
            pieceHeight,
            mouse.x - pieceWidth / 2,
            mouse.y - pieceHeight / 2,
            pieceWidth,
            pieceHeight
        );
        stage.restore();
        document.onpointermove = updatePuzzle;
        document.onpointerup = pieceDropped;
    }
}

function gameOver() {
    document.onpointerdown = null;
    document.onpointermove = null;
    document.onpointerup = null;

    localStorage.setItem('elapsedTime', elapsedTime);
    // Redireccionar a fin-juego.html
    window.location.href = "fin-juego.html";
}

function pieceDropped(e) {
    document.onpointermove = null;
    document.onpointerup = null;
    if (currentDropPiece !== null) {
        let tmp = {
            xPos: currentPiece.xPos,
            yPos: currentPiece.yPos
        };
        currentPiece.xPos = currentDropPiece.xPos;
        currentPiece.yPos = currentDropPiece.yPos;
        currentDropPiece.xPos = tmp.xPos;
        currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin() {
    stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
    let gameWin = true;
    for (piece of pieces) {
        stage.drawImage(
            img,
            piece.sx,
            piece.sy,
            pieceWidth,
            pieceHeight,
            piece.xPos,
            piece.yPos,
            pieceWidth,
            pieceHeight
        );
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
            gameWin = false;
        }
    }
    if (gameWin) {
        setTimeout(gameOver, 500);
    }
}

function shuffleArray(o) {
    for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
}

// Función para iniciar el cronómetro
function startTimer() {
    if (!timerInterval) {
        elapsedTime = 0; // Restablecer el tiempo transcurrido al iniciar el cronómetro
        const timerElement = document.querySelector("#timer");
        timerElement.textContent = "00:00";
        timerInterval = setInterval(() => {
            if (!isPaused) {
                elapsedTime++;
                const minutes = Math.floor(elapsedTime / 60);
                const seconds = elapsedTime % 60;
                const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                timerElement.textContent = formattedTime;
            }
        }, 1000);
    }
}

function pauseTimer() {
    isPaused = true;
    document.querySelector("#pauseButton").textContent = "Reanudar";
    document.querySelector("#pauseMessageContainer").style.display = "block";
}

function resumeTimer() {
    isPaused = false;
    document.querySelector("#pauseButton").textContent = "Pausa";
    document.querySelector("#pauseMessageContainer").style.display = "none";
}



function restartGame() {
    // Restaurar las variables y estados iniciales del juego
    gameStarted = false;
    pieces = [];
    currentPiece = null;
    currentDropPiece = null;
    isPaused = false;
    elapsedTime = 0;
    clearInterval(timerInterval);

    // Restablecer el cronómetro a 00:00
    const timerElement = document.querySelector("#timer");
    timerElement.textContent = "00:00";

    // Restablecer el botón de pausa a su estado original
    document.querySelector("#pauseButton").textContent = "Pausa";
    document.querySelector("#pauseMessageContainer").style.display = "none";

    // Volver a iniciar el juego
    initPuzzle();

    // Habilitar el botón "Iniciar" nuevamente
    document.querySelector("#startButton").disabled = false;

    // Reiniciar el cronómetro y esperar al próximo clic en "Iniciar"
    timerInterval = null;

    // Deshabilitar los botones de "Pausa" y "Reiniciar" después de reiniciar el juego
    document.querySelector("#pauseButton").disabled = true;
    document.querySelector("#restartButton").disabled = true;

    // Deshabilitar la interacción con las piezas y la imagen hasta que se inicie el juego nuevamente
    piecesClickable = false;
}



document.addEventListener("DOMContentLoaded", () => {

    // Iniciar el cronómetro al cargar la página y presionar el botón "Iniciar"
    document.querySelector("#startButton").addEventListener("click", () => {
        if (!gameStarted) {
            gameStarted = true;
            shufflePuzzle(); // Desordena el rompecabezas solo cuando se inicia el juego
            elapsedTime = 0;
            startTimer(); // Iniciar el cronómetro

            // Deshabilitar el botón "Iniciar" para evitar múltiples clics
            document.querySelector("#startButton").disabled = true;

            // Habilitar los botones de "Pausa" y "Reiniciar"
            document.querySelector("#pauseButton").disabled = false;
            document.querySelector("#restartButton").disabled = false;

            // Permitir interacción con las piezas y la imagen una vez que se haya iniciado el juego
            piecesClickable = true;
        }
    });

    // Pausar/Reanudar el cronómetro al presionar el botón "Pausa"
    document.querySelector("#pauseButton").addEventListener("click", () => {
        if (gameStarted) {
            if (isPaused) {
                // Reanudar el cronómetro
                resumeTimer();
            } else {
                // Pausar el cronómetro
                pauseTimer();
            }
        }
    });

    // Reiniciar el juego al presionar el botón "Reiniciar"
    document.querySelector("#restartButton").addEventListener("click", () => {
        // Mostrar un mensaje de confirmación antes de reiniciar el juego
        const confirmRestart = confirm("¿Estás seguro de que deseas reiniciar el juego?");
        if (confirmRestart) {
            restartGame();
        }
    });

    // Deshabilitar los botones de pausa y reiniciar al cargar la página
    document.querySelector("#pauseButton").disabled = true;
    document.querySelector("#restartButton").disabled = true;


});

