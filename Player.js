import PlayerStates from "./PlayerStates.js";
import SpriteAnimation from "./SpriteAnimation.js";

export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.state = PlayerStates.idle;
        this.#createAnimations();
        document.addEventListener("keydown", this.#keydown);
        document.addEventListener("keyup", this.#keyup);

        Player.height = 64
        Player.width = 40

        this.x = 450;
        this.y = 800;

        let gravity = 0.06;
        let yVelocity = 2;
        let xVelocity = 0;

        this.speedY = 6;
        this.speedX = 6;
        
        this.isJumping = false;
        this.jumpCount = 0
        this.doubleJump = true;

        // Update player's position
        yVelocity += gravity;
        Player.x += xVelocity;
        Player.y += yVelocity;

        if (Player.y > this.canvasHeight - Player.height) {
            Player.y = this.canvasHeight - Player.height;
            yVelocity = 0;
        }


        if (Player.x < 0) {
            Player.x = 0;
        }
        
        
        
        
        
        
        
        
    }
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
            this.jumpVelocity += 0.5; /* Jump */
    
            if (this.jumpVelocity >= 12) { /* "time" before ability to jump reset */
                this.isJumping = false;
            }
        }
    
        if (this.doubleJump && this.jumpCount < 2 && this.isJumping) {
            if (this.jumpPressed) {
                this.y -= this.jumpVelocity;
                this.jumpVelocity -= 2;
                this.jumpCount++;
            }
        }
    
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
                        this.isJumping = true;
                        this.jumpVelocity = -10;
                        this.jumpCount = 1;
                    } else if (this.doubleJump && this.jumpCount < 2) {
                        this.jumpVelocity = -10;
                        this.jumpCount++
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
                this.rightPressed =false;
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



}