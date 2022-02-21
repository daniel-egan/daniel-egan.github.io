let canvas = document.getElementById("gameScreen");
//Context of the canvas
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        this.velocity = { x: 0, y: 1 };
    }

    drawPlayer() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    updateInfo() {
        this.drawPlayer();
        this.position.x = this.velocity.x;
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

// Creates new player object
const player = new Player();
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
}

animate();

// W = 87, A = 65, D = 68
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = true;
            player.velocity.x -= 20;
            break;
        case 87:
            console.log('up');
            // Moves the player up along the y axis
            player.velocity.y -= 20;
            break;
        case 68:
            console.log('right');
            keys.right.pressed = true;
            player.velocity.x += 20;
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
            // Moves the player up along the y axis
            break;
        case 68:
            console.log('right');
            keys.right.pressed = false;
            break;
    }
})
