//attributes from the html files
const gameBox = document.getElementById("game-box");
const ctx = gameBox.getContext("2d");
const gameScoreBox = document.getElementById("score");

//attributes from the game
let speed = 10;

let tileCount = 20; //canvas 20x20
let tileSize = (gameBox.width / tileCount) - 2; //size slightly smaller
let headX = 10;
let headY = 10;
let foodX = 5;
let foodY = 5;
let xVelocity = 0, yVelocity = 0;
let score = 0;
let highestScore = 0;

//game loop update every interval
function drawGame(){
    
    clearScreen();
    updateSnakePosition();
    checkFoodEaten();
    drawFood();
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
}

function drawFood(){
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(foodX * tileCount, foodY*tileCount, tileSize-5, tileSize-5);
}

function checkFoodEaten(){
    if((headX == foodX) && (headY == foodY))
    {
        randomFoodPosition();
        score++;
        gameScoreBox.innerHTML = "Score: " + score;

    }
}

function randomFoodPosition(){
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
}

function newGame(){
    randomFoodPosition();
    drawGame();
    if(score > highestScore)
        highestScore = score;

    gameScoreBox.innerHTML = "Highest score: " + highestScore;
}

//check key input
document.addEventListener("keydown", keyDown);

function keyDown(event){
    //up key - cannot go down
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down key - cannot go up
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left key - cannot go right
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right key - cannot go left
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }

    
}


