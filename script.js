//attributes from the html files
const gameBox = document.getElementById("game-box");
const ctx = gameBox.getContext("2d");
const gameScoreBox = document.getElementById("score");
const messageBox = document.getElementById("message-box");
const speedBox = document.getElementById("speed");


//snake class
class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//attributes from the game
let speed = 5;
speedBox.defaultValue = speed;
let tileCount = 20; //canvas 20x20
let tileSize = (gameBox.width / tileCount) - 2; //size slightly smaller
let headX = 10;
let headY = 10;
let foodX = 5;
let foodY = 5;
let xVelocity = 0, yVelocity = 0;

let snakeParts = [];
let score = 0;
let initialLength = 2;
let highestScore = 0;
let edge = 3;
let message;

//game loop update every interval
function drawGame(){
    
    speed = speedBox.value; 

    clearScreen();
    updateSnakePosition();
    checkFoodEaten();
    drawFood();
    drawSnake();

    let gameOver = checkGameOver();
    updateMessage(gameOver);
    if(gameOver)
        return;

    setTimeout(drawGame, 1000/speed);
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, gameBox.width, gameBox.height);

    ctx.fillStyle = "rgb(135, 110, 64)";
    ctx.fillRect(edge,edge, gameBox.width-edge*2, gameBox.height-edge*2);
}

function drawSnake(){
    ctx.fillStyle = "red";
    ctx.fillRect(headX * tileCount, headY*tileCount, tileSize, tileSize);

    //draw snake parts other than head
    ctx.fillStyle = "red";
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    //keep adding the previous coordinate of the head
    snakeParts.push(new SnakePart(headX, headY));

    //delete the last coordinate of the array - as the tail move away from it
    if(snakeParts.length > score + initialLength){
        snakeParts.shift();
    }
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

    //random so that the food is not too close to the edge
    foodX = Math.floor(Math.random() * (tileCount-2) + 1);
    foodY = Math.floor(Math.random() * (tileCount-2) + 1);
}

function updateMessage(gameOver){
    
    if(gameOver){
        message = "Did I just hit something? GAME OVER :("
    }
    else{

        if(score > highestScore)
            message = "I just pass my highest score! Keep going!";

        if(score == 1)
            message = "Yay! My first score!";

        if(score == 5)
            message = "Yummm so gooooood!!!";

        if(score == 10)
            message = "We are having a party today!!";

        if(score == 20)
            message = "I'm starting to get full now...";

        if(score == 40)
            message = "We actually reach this far?";

    }


    messageBox.innerHTML = message;
}

function checkGameOver(){
    let gameOver = false;

    //game cannot be over if it is not started yet
    if(yVelocity == 0 && xVelocity == 0)
        return gameOver;

    if(headX <= 0 || headX >= tileCount-1 || headY <= 0 || headY >= tileCount-1)
        gameOver = true;

    for(let i = 0; i < snakeParts.length-1; i++){
        let part = snakeParts[i];
        if(headX == part.x && headY == part.y)
        {
            gameOver = true;
            break;
        }
    }

    if(gameOver)
    {
        if(score > highestScore)
        {
            highestScore = score;
            
        }
        gameScoreBox.innerHTML = "Highest score: " + highestScore;
    }

    return gameOver;
}

function newGame(){

    message = "Hello, welcome to my snake game!";

    //reset all attributes
    headX = 10;
    headY = 10;
    xVelocity = 0;
    yVelocity = 0;

    snakeParts = [];
    score = 0;

    randomFoodPosition();
    drawGame();

    
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


