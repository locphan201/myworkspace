var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.style = 'background-color:green'

function rescale() {
    var devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * devicePixelRatio
    canvas.height = canvas.clientHeight * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio);
}

class Ball {
    constructor(x, y, r, color='white') {
        this.x = x
        this.y = y
        this.r = r
        this.color = color
    }
  
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r-1, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Block {
    constructor(x, y, w, h, color='black') {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }
  
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    checkCollision(x, y) {
        return true
    }
}


// Game variables
var ball = new Ball(100, 100, 20)

var currentLevel = 1
var wallColor = 'brown'
var walls = [
    [0, 0, 5, canvas.clientHeight], [canvas.clientWidth-5, 0, 5, canvas.clientHeight],
    [0, 0, canvas.clientWidth, 5], [0, canvas.clientHeight-5, canvas.clientWidth, 5]
]

var levels = {
    1 : [

    ],
    2 : [

    ]
}

function initLevel(n) {
    var data = walls.concat(levels[n])
    var blocks = []
    data.forEach(d => {
        blocks.push(new Block(d[0], d[1], d[2], d[3], wallColor))
    })
    return blocks
}

var level_blocks = initLevel(currentLevel)
function gameLoop() {
    rescale()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    level_blocks.forEach(block => {
        block.draw()
        block.checkCollision()
    })
    ball.draw()
    requestAnimationFrame(gameLoop);
}

gameLoop();