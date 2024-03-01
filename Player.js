import PlayerStates from "./PlayerStates.js";
import SpriteAnimation from "./SpriteAnimation.js";

export default class Player {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.state = PlayerStates.idle;
        this.#createAnimations();
        document.addEventListener("keydown", this.#keydown);
        document.addEventListener("keyup", this.#keyup);

        Player.height = 64
        Player.width = 40

        this.x = 100;
        this.y = 400;

        this.speedY = 6;
        this.speedX = 6;

        this.isJumping = false;
        this.jumpCount = 0

        this.jumpVelocity = 0;
        this.maxJumpVelocity = -12;
        


        


        
        
    }


    draw(ctx) {
        this.#setState();
        const animation = this.animations.find((animation) => 
            animation.isFor(this.state)
        );

        const image = animation.getImage();

        ctx.save();

        ctx.translate(this.x + image.width / 2, this.y + image.height / 2);
        
        if (this.velocityX < 0) {
            ctx.scale(-1, 1);
        }


        ctx.drawImage(image, -image.width / 2, -image.height / 2);

        ctx.restore();
        
        this.update()
    }

    #setState() {
        if (this.deadPressed) {
            this.state = PlayerStates.dead;
        } else if (this.jumpPressed) {
            this.state = PlayerStates.jump;
        } else if (this.runPressed) {
            this.state = PlayerStates.run;
        } else if (this.rightPressed || this.leftPressed) {
            this.state = PlayerStates.walk;
        } else {
            this.state = PlayerStates.idle;
        }
    }

    #createAnimations() {
        this.idleAnimation = new SpriteAnimation(
            "Idle (?).png",
            1,
            6,
            PlayerStates.idle
        );
        this.walkAnimation = new SpriteAnimation(
            "Walk (?).png",
            4,
            6,
            PlayerStates.walk,
        );

        this.runAnimatinon = new SpriteAnimation(
            "Run (?).png",
            8,
            6,
            PlayerStates.run,
            
        );
        this.jumpAnimation = new SpriteAnimation(
            "Jump (?).png",
            1,
            6,
            PlayerStates.jump
        );
        this.deadAnimation = new SpriteAnimation(
            "Dead (?).png",
            1,
            10,
            PlayerStates.dead,
            true
        );

        this.animations = [
            this.idleAnimation,
            this.walkAnimation,
            this.runAnimatinon,
            this.jumpAnimation,
            this.deadAnimation,
        ];
    }

     #keydown = (event) => {
        
        if (event.defaultPrevented) {
            return;
        }
            switch (event.code) {
                case "ArrowRight":
                    this.rightPressed = true;
                    break;
                case "ArrowLeft":
                    this.leftPressed = true;
                    break;
                case "ShiftLeft":
                    this.runPressed = true;
                    break;
                case "Space":
                    if (!this.isJumping) {
                        this.jumpVelocity = this.maxJumpVelocity;
                        this.isJumping = true;
                    }
                    break;
                case "KeyD":
                    this.deadPressed = true;
                    break;
                case "KeyR":
                    this.deadPressed = false;
                    this.deadAnimation.reset();
                    break;
            }
    };

    #keyup = (event) => {
        switch (event.code) {
            case "ArrowRight":
                this.rightPressed = false;
                break;
            case "ArrowLeft":
                this.leftPressed = false;
                break;
            case "ShiftLeft":
                this.runPressed = false;
                break;
            case "Space":
                this.jumpPressed = false;
        }
    };

    update() {


        if (this.rightPressed) {
            this.x += this.speedX;
            this.velocityX = 1;
            
        } else if (this.leftPressed) {
            this.x -= this.speedX;
            this.velocityX = -1;
        }


        if (!this.isJumping) {
            this.y += this.speedY; /* Gravity fall */
        } else {
            this.y += this.jumpVelocity;
            this.jumpVelocity += 0.5;   /* Jump */

            if (this.jumpVelocity >= 12 || this.jumpCount) { /* "time" before ability to jump reset */
                this.isJumping = false;
            }
        }

    }


}