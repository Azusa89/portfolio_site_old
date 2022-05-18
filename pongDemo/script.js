import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"))
const player1Paddle = new Paddle(document.getElementById("player1-paddle"))
const player2Paddle = new Paddle(document.getElementById("player2-paddle"))
const player1ScoreElement = document.getElementById("player1-score")
const player2ScoreElement = document.getElementById("player2-score")
let moveBy = 15;

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [player1Paddle.rect(),player2Paddle.rect()])

        if (isLose()) handleLose()
    }

    lastTime = time
    window.requestAnimationFrame(update)

}

function handleLose() {
    const rect =ball.rect()
    if (rect.right >= window.innerWidth) {
        player1ScoreElement.textContent = parseInt(player1ScoreElement.textContent) + 1
    } else {
        player2ScoreElement.textContent = parseInt(player2ScoreElement.textContent) + 1
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

window.requestAnimationFrame(update)