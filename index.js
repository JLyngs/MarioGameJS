import img from "./img.js";
import Player from "./Player.js";
window.addEventListener('load', function(){


    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 1200;
            this.height = 700;
            this.speed = 0.5;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    canvas.width = 1200; // Adjust as needed
    canvas.height = 600; // Adjust as needed

    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);


    function game() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        // Draw player
        player.draw(ctx);





    }

    setInterval(game, 1000 / 60);
})