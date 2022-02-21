let canvas = document.getElementById("gameScreen");
//Context of the canvas
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Sets the dimensions of the gameScreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    }

}

// Creates new player object
const player = new Player();
player.drawPlayer();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.updateInfo();
}

animate();