import img from "./img.js";
import Player from "./Player.js";



    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    export class Floor {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('floorImage');
            this.x = 0;
            this.y = gameHeight - this.image.height;
            this.width = 6000;
            this.height = 36;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            
        }
    }



    export class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 1200;
            this.height = 600;
            this.speed = 0.4;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }

        update() {
            // Scroll the background continuously at a constant speed
            this.x -= this.speed;
            
            // Reset background position when it starts moving off-screen
            if (this.x <= -this.width) {
                this.x += this.width;
            }
        
            // Check if the player is moving and adjust background position accordingly
            if (player.rightPressed && this.x < 0) {
                this.x -= player.speedX /3;
            } else if (player.leftPressed && this.x < -10) {
                this.x += player.speedX /8;
            }
        }
        
        
    }
    

    

    canvas.width = 1200; // Adjust as needed
    canvas.height = 600; // Adjust as needed

    const background = new Background(canvas.width, canvas.height);
    const player = new Player(canvas.width, canvas.height);
    const floor = new Floor(canvas.width, canvas.height);

    
    function game() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        floor.draw(ctx);
        // Draw player
        player.update();
        player.draw(ctx);

        
        
        
        requestAnimationFrame(game)

    }
game();
