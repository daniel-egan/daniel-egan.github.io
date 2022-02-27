const img = new Image();
img.src = 'img/platform.png';

let canvas = document.getElementById("gameScreen");
//Context of the canvas
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Hide scrollbar
document.body.style.overflow = 'hidden';

// Sets the dimensions of the gameScreen
canvas.width = 1024;
canvas.height = 576;

// Create global gravity
const gravity = 0.82;

class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.width = 30;
        this.height = 30;
        this.velocity = {
            x: 0,
            y: 1
        }
    }

    drawPlayer() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    updateInfo() {
        this.drawPlayer();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // this.position.y + this.height = the bottom of the players sprite
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
        else {
            this.velocity.y = 0;
        }
    }

}


class Platform {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.width = 348;
        this.height = 80;
    }

    draw() {
        ctx.drawImage(img, this.position.x, this.position.y);
    }

}

// Creates new player object
const player = new Player();
// Creates the floor objects
const floor1 = new Platform({ x: -32, y: canvas.height - 40 })
const floor2 = new Platform({ x: 280, y: canvas.height - 40 })
const floor3 = new Platform({ x: 590, y: canvas.height - 40 })
const floor4 = new Platform({ x: 900, y: canvas.height - 40 })
// Create center platform object
const platform1 = new Platform({ x: canvas.width / 2, y: canvas.height / 2 })
const platform2 = new Platform({ x: canvas.width / 2 - 310, y: canvas.height / 2 })


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}



function animateMainScreen() {
    requestAnimationFrame(animateMainScreen);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawFloor();
    platform1.draw();
    platform2.draw();
    player.updateInfo();

    if (keys.right.pressed) {
        player.velocity.x = 5;
    }
    else if (keys.left.pressed) {
        player.velocity.x = -5;
    }
    else { player.velocity.x = 0; }

    collisionDetection();

}

animateMainScreen();


window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            break;
        case 87:
            // Moves the player up along the y axis
            if (player.velocity.y == 0) {
                player.velocity.y -= 20;
            }
            break;
        case 68:
            keys.right.pressed = true;
            break;
    }

})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            break;
        case 87:
            break;
        case 68:
            keys.right.pressed = false;
            break;
    }

})
function collisionDetection() {

    // Collision detection against floor1
    if (player.position.y + player.height <= floor1.position.y &&
        player.position.y + player.height + player.velocity.y >= floor1.position.y &&
        player.position.x + player.width >= floor1.position.x &&
        player.position.x <= floor1.position.x + floor1.width) {
        player.velocity.y = 0;
    }
    // Collision detection against floor2
    if (player.position.y + player.height <= floor2.position.y &&
        player.position.y + player.height + player.velocity.y >= floor2.position.y &&
        player.position.x + player.width >= floor2.position.x &&
        player.position.x <= floor2.position.x + floor2.width) {
        player.velocity.y = 0;
    }

    if (player.position.y + player.height <= floor3.position.y &&
        player.position.y + player.height + player.velocity.y >= floor3.position.y &&
        player.position.x + player.width >= floor3.position.x &&
        player.position.x <= floor3.position.x + floor3.width) {
        player.velocity.y = 0;
    }

    if (player.position.y + player.height <= floor4.position.y &&
        player.position.y + player.height + player.velocity.y >= floor4.position.y &&
        player.position.x + player.width >= floor4.position.x &&
        player.position.x <= floor4.position.x + floor4.width) {
        player.velocity.y = 0;
    }

    if (player.position.y + player.height <= platform1.position.y &&
        player.position.y + player.height + player.velocity.y >= platform1.position.y &&
        player.position.x + player.width >= platform1.position.x &&
        player.position.x <= platform1.position.x + platform1.width) {
        player.velocity.y = 0;
    }

    if (player.position.y + player.height <= platform2.position.y &&
        player.position.y + player.height + player.velocity.y >= platform2.position.y &&
        player.position.x + player.width >= platform2.position.x &&
        player.position.x <= platform2.position.x + platform2.width) {
        player.velocity.y = 0;
    }
}

function drawFloor() {
    floor1.draw();
    floor2.draw();
    floor3.draw();
    floor4.draw();
}