//attributes from the html files
const gameBox = document.getElementById("game-box");
const ctx = gameBox.getContext("2d");

//attributes from the game
let speed = 10;

let tileCount = 20; //canvas 20x20
let tileSize = (gameBox.width / tileCount) - 2; //size slightly smaller
let headX = 10;
let headY = 10;
let xVelocity = 0, yVelocity = 0;

//game loop update every interval
function drawGame(){
    console.log("again?");
    clearScreen();
    updateSnakePosition();
    drawSnake();
    setTimeout(drawGame, 2000/speed);
}

function clearScreen(){
    ctx.fillStyle = "rgb(135, 110, 64)";
    ctx.fillRect(0,0, gameBox.width, gameBox.height);
}

function drawSnake(){
    ctx.fillStyle = "red";
    ctx.fillRect(headX * tileCount, headY*tileCount, tileSize, tileSize);
}

function updateSnakePosition(){
    headX += xVelocity;
    headY += yVelocity;
    //console.log("ayo");
}

function newGame(){
}

//check key input
document.addEventListener("keydown", keyDown);

function keyDown(event){
    //up key
    if(event.keyCode == 38){
        yVelocity = -1;
        xVelocity = 0;
    }

    //down key
    if(event.keyCode == 40){
        yVelocity = 1;
        xVelocity = 0;
    }

    //left key
    if(event.keyCode == 37){
        yVelocity = 0;
        xVelocity = -1;
    }

    //right key
    if(event.keyCode == 39){
        yVelocity = 0;
        xVelocity = 1;
    }

    
}


drawGame();