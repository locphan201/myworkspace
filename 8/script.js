const size = 200
const canvas = document.getElementById('play-area')
const myImage = document.getElementById('myImage')
var ctx = canvas.getContext('2d')
ctx.lineWidth = 3
var board = [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]]

function drawUI() {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()
    ctx.moveTo(size, 0)
    ctx.lineTo(size, size*3)
    ctx.moveTo(size*2, 0)
    ctx.lineTo(size*2, size*3)
    
    ctx.moveTo(0, size)
    ctx.lineTo(size*3, size)
    ctx.moveTo(0, size*2)
    ctx.lineTo(size*3, size*2)
    ctx.strokeStyle = 'white'
    ctx.stroke()
}

function isCheckmate() {
    for (var i = 0; i < 3; i++) {
        if (Math.abs(board[i][0] + board[i][1] + board[i][2]) == 3) {
            return true
        }
        if (Math.abs(board[0][i] + board[1][i] + board[2][i]) == 3) {
            return true
        }
    }

    if (Math.abs(board[0][0] + board[1][1] + board[2][2]) == 3) {
        return true
    }
    if (Math.abs(board[0][2] + board[1][1] + board[2][0]) == 3) {
        return true
    }

    return false
}

function newRound() {
    board = [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]]
    drawUI()
}

function makeMove() {
    if (isCheckmate()) {
        myImage.src = `Images/thumb${2}.png`
        return -1
    }

    for (var i = 0; i < 3; i++) {
        if (board[i][0] + board[i][1] + board[i][2] == 2) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    myImage.src = `Images/thumb${0}.png`
                    return [j, i]
                }
            }
        }
        if (board[0][i] + board[1][i] + board[2][i] == 2) {
            for (var j = 0; j < 3; j++) {
                myImage.src = `Images/thumb${0}.png`
                return [i, j]
            }
        }
    }

    if (board[0][0] + board[1][1] + board[2][2] == 2) {
        for (var i = 0; i < 3; i++) {
            if (board[i][i] == 0) {
                myImage.src = `Images/thumb${0}.png`
                return [i, i]
            }
        }
    }
    if (board[0][2] + board[1][1] + board[2][0] == 2) {
        for (var i = 0; i < 3; i++) {
            if (board[i][2-i] == 0) {
                myImage.src = `Images/thumb${0}.png`
                return [2-i, i]
            }
        }
    }

    for (var i = 0; i < 3; i++) {
        if (board[i][0] + board[i][1] + board[i][2] == -2) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    myImage.src = `Images/thumb${0}.png`
                    return [j, i]
                }
            }
        }
        if (board[0][i] + board[1][i] + board[2][i] == -2) {
            for (var j = 0; j < 3; j++) {
                if (board[j][i] == 0) {
                    myImage.src = `Images/thumb${0}.png`
                    return [i, j]
                }
            }
        }
    }

    if (board[0][0] + board[1][1] + board[2][2] == -2) {
        for (var i = 0; i < 3; i++) {
            if (board[i][i] == 0) {
                myImage.src = `Images/thumb${0}.png`
                return [i, i]
            }
        }
    }
    if (board[0][2] + board[1][1] + board[2][0] == -2) {
        for (var i = 0; i < 3; i++) {
            if (board[i][2-i] == 0) {
                myImage.src = `Images/thumb${0}.png`
                return [2-i, i]
            }
        }
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 0) {
                myImage.src = `Images/thumb${1}.png`
                return [j, i]
            }
        }
    }
    return -1
}

newRound()

canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect()
    var x = parseInt((event.clientX - rect.left)/size, 10)
    var y = parseInt((event.clientY - rect.top)/size, 10)

    if (board[y][x] != 0 || isCheckmate()) {
        return
    }

    board[y][x] = -1
    ctx.beginPath();
    ctx.arc(x*size + size/2, y*size + size/2, size/4, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    var p = makeMove()
    if (p == -1) {
        return
    }

    board[p[1]][p[0]] = 1
    ctx.beginPath();
    ctx.moveTo((p[0] + 0.25)*size, (p[1] + 0.25)*size)
    ctx.lineTo((p[0] + 0.75)*size, (p[1] + 0.75)*size)
    ctx.moveTo((p[0] + 0.25)*size, (p[1] + 0.75)*size)
    ctx.lineTo((p[0] + 0.75)*size, (p[1] + 0.25)*size)
    ctx.strokeStyle = 'green';
    ctx.stroke();
})

var restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', newRound);