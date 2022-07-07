const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = '800'
canvas.height = '500'

const cols = 8;
const rows = 4
const blocks = []
let key = true;

for(let i = 0; i < cols; i++){
    blocks[i] = []
    for(let j = 0; j < rows; j++){
        blocks[i][j] = {x: 0, y: 0, w: 70, h: 20, status: 1}
    }
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    r: 20,
    xspeed: 5,
    yspeed: 5
}

const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    w: 100,
    h: 15
}



let score = 0

function getScore() {
    ctx.font = `25px helvetica`;

    ctx.fillText(`Score ${score}`, 20, 30)
}

function Win() {
    ctx.font = `50px helvetica bold blue`;
    ctx.fillText(`You Won`, canvas.width / 2 - 100, canvas.height / 2)
}

function drawWalls () {
    for(let i = 0; i < blocks.length; i++){
        for(let j = 0; j < blocks[i].length; j++){
            if(blocks[i][j].status == 1){
                blocks[i][j].x = i * 80 + 90;
                blocks[i][j].y = j * 30 + 40;
                ctx.fillStyle = `purple`
                ctx.fillRect(blocks[i][j].x, blocks[i][j].y, blocks[i][j].w, blocks[i][j].h)
                if(collision(ball, blocks[i][j])){
                    blocks[i][j].status = 0;
                    ball.yspeed *= -1 ;
                    score++
                    if(Math.sign(ball.xspeed) == 1){
                        ball.xspeed += 0.1;
                    }else if(Math.sign(ball.xspeed) == -1){
                        ball.xspeed -= 0.1
                    }
                    if(Math.sign(ball.yspeed) == 1){
                        ball.yspeed += 0.1
                    }else if(Math.sign(ball.yspeed) == -1){
                        ball.yspeed -= 0.1
                    }
                    if(score === cols * rows){
                        key = false;
                        Win()
                        setTimeout(() => {
                            window.location = 'index.html'
                        },2000)
                    }
                } 
            }

        }
    }
}

function drawBall () {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI)
    ctx.fill()
    ball.x += ball.xspeed;
    ball.y -= ball.yspeed;
    if(ball.x + ball.r > canvas.width || ball.x - ball.r < 0){
        ball.xspeed *= -1;

    }
    if(ball.y - ball.r < 0){
        ball.yspeed *= -1
    }

    if(ball.y > canvas.height + 30){
        key = false;
        setTimeout(() =>{
            window.location = `index.html`
        }, 1000)
    }

}

canvas.addEventListener('mousemove', e => {
    paddle.x = e.offsetX - (paddle.w / 2);

})

function drawPaddle () {
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    if(paddle.x >= canvas.width - paddle.w ){
        paddle.x = canvas.width - paddle.w
    }else if(paddle.x <= 0){
        paddle.x = 0
    }
    if(collision(ball, paddle)){
        ball.yspeed *= -1
    }
}

function collision(rect1, rect2){
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.r > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.r > rect2.y) {
            return true
     }else{
        return false
     }
}


function update () {
    if(key){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawBall();
        drawPaddle();
        drawWalls();
        getScore();
        requestAnimationFrame(update)
    }
}

update()