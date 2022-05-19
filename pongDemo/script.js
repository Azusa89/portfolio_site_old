import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"))
const player1Paddle = new Paddle(document.getElementById("player1-paddle"))
const player2Paddle = new Paddle(document.getElementById("player2-paddle"))
const player1ScoreElement = document.getElementById("player1-score")
const player2ScoreElement = document.getElementById("player2-score")
const clearScoreButton = document.getElementById("resetScoreButton")

//High score element
const player1HighScoreElement = document.getElementById("player1-highscore")
const player2HighScoreElement = document.getElementById("player2-highscore")

let moveBy = 15;

let lastTime

//Reset highscore function, Clear local storage and set highscore value to 0
function clearScore() {
    localStorage.clear();
    player1HighScoreElement.textContent = 0
    player2HighScoreElement.textContent = 0
}

function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [player1Paddle.rect(),player2Paddle.rect()])

        if (isLose()) handleLose() 
    }
    lastTime = time
    window.requestAnimationFrame(update)

}
function highScoreLoad() {
    if (player1HighScoreElement.textContent < parseInt(localStorage.player1highscore)) {
        player1HighScoreElement.textContent = parseInt(localStorage.player1highscore)
    }
    if (player2HighScoreElement.textContent < parseInt(localStorage.player2highscore)) {
        player2HighScoreElement.textContent = parseInt(localStorage.player2highscore)
    }
}
function handleLose() {
    const rect =ball.rect()
    if (rect.right >= window.innerWidth) {
        player1ScoreElement.textContent = parseInt(player1ScoreElement.textContent) + 1
        
    } else {
        player2ScoreElement.textContent = parseInt(player2ScoreElement.textContent) + 1
    }
    //Logic to update highscore if the current score is higher than the previous highscore
    if (player1HighScoreElement.textContent < parseInt(localStorage.player1highscore)) {
        player1HighScoreElement.textContent = parseInt(localStorage.player1highscore)
    }
    if (player2HighScoreElement.textContent < parseInt(localStorage.player2highscore)) {
        player2HighScoreElement.textContent = parseInt(localStorage.player2highscore)
    }
    if (Number(player1ScoreElement.textContent) > Number(player1HighScoreElement.textContent)) {
        player1HighScoreElement.textContent = parseInt(player1ScoreElement.textContent)
        localStorage.setItem("player1highscore", player1HighScoreElement.textContent)
        console.log(localStorage)
    }
    if (Number(player2ScoreElement.textContent) > Number(player2HighScoreElement.textContent)) {
        player2HighScoreElement.textContent = parseInt(player2ScoreElement.textContent)
        localStorage.setItem("player2highscore", player2HighScoreElement.textContent)
        console.log(localStorage)
    }
    ball.reset()
    
}

function isLose() {
    const rect =ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}
document.addEventListener("mousemove", e => {
    player1Paddle.position = (e.y / window.innerHeight) * 100
})

document.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'ArrowUp':
            player2Paddle.position = player2Paddle.position-moveBy
            break
            case 'ArrowDown':
                player2Paddle.position = player2Paddle.position+moveBy   
            break;  
    }
})

document.getElementById ("resetbtn").addEventListener("click",clearScore);
//Function to clear the local storage to reset the highscore

//On load, will run the highScoreLoad function
window.onload = highScoreLoad()

window.requestAnimationFrame(update)