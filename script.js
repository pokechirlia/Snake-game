//attributes from the html files
const gameBox = document.getElementById("game-box");
const ctx = gameBox.getContext("2d");

//attributes from the game
let speed = 8;

let tileCount = 20; //canvas 20x20
let tileSize = (gameBox.width / tileCount) - 2; //size slightly smaller
let headX = 10;
let headY = 10;

//game loop update every interval
function drawGame(){
    console.log("again?");
    clearScreen();
    drawSnake();
    //setTimeout(drawGame, 1000/speed);
}

function clearScreen(){
    ctx.fillStyle = "rgb(135, 110, 64)";
    ctx.fillRect(0,0, gameBox.width, gameBox.height);
}

function drawSnake(){
    ctx.fillStyle = "red";
    ctx.fillRect(headX * tileCount, headY*tileCount, tileSize, tileSize);
}

drawGame();