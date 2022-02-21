const img = new Image();
img.src = 'img/platform.png';
console.log(img);

let canvas = document.getElementById("gameScreen");
//Context of the canvas
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Hide scrollbar
document.body.style.overflow = 'hidden';

// Sets the dimensions of the gameScreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create global gravity
const gravity = 0.5

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
        console.log("draw");
        ctx.drawImage(img, this.position.x, this.position.y);
    }

}

// Creates new player object
const player = new Player();
// Creates new platform object
const platform1 = new Platform({x: 200, y: 500})
const platform2 = new Platform({x: 50, y: 50})


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.updateInfo();
    platform1.draw();
    platform2.draw();

    if (keys.right.pressed) {
        player.velocity.x = 5;
    }
    else if (keys.left.pressed) {
        player.velocity.x = -5;
    }
    else { player.velocity.x = 0; }
    // Collision detection against platform1
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

animate();


window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = true;
            break;
        case 87:
            console.log('up');
            // Moves the player up along the y axis
            player.velocity.y -= 20;
            break;
        case 68:
            console.log('right');
            keys.right.pressed = true;
            break;
    }

})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = false;
            break;
        case 87:
            console.log('up');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = false;
            break;
    }

})
