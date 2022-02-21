console.log("H");
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
        this.position.y += this.velocity.y;
        // this.position.y + this.height = the bottom of the players sprite
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
        else {
            console.log("Else");
            this.velocity.y = 0;
        }
    }

}

// Creates new player object
const player = new Player();
player.drawPlayer();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.updateInfo();
}

animate();