import img from "./img.js";
import Player from "./Player.js";

const canvas = document.createElement("canvas");
document.body.append(canvas);
let ctx = canvas.getContext("2d")

canvas.width = 2000 / 2;
canvas.height = 1200 / 2.5;


const background = img("BG.png");
const player = new Player();

let gravity = 0.06;
let yVelocity = 2;
let xVelocity = 0;





function game() {
    ctx.drawImage(background, 0, 0, 2000, 1200, 0, 0, 2000 / 2, 1200 / 2.5);

    yVelocity += gravity;
    player.x += xVelocity;
    player.y += yVelocity;


    player.draw(ctx);

    if (player.y > canvas.height - Player.height) {
        player.y = canvas.height - Player.height;
        yVelocity = 0;
    }
    if (player.x < 0){
        player.x = 0;
    }

    if (player.x > canvas.width - Player.width) { /*Border Højre */
        player.x = canvas.width - Player.width;
    }


    
}

setInterval(game, 1000 / 60);
