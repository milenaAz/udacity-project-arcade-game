// Enemies our player must avoid
class Enemy {
   
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x+(this.speed*dt);
        if (this.x >= 500){
            this.x = -10;
            this.y = rows[Math.floor(Math.random() * rows.length)];
        }

        //check if there is any collisions
        this.checkCollision();
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }

    //check if player's position make a collision
    checkCollision() {
        if(player.x < this.x + 80 &&
           player.x + 80 > this.x &&
           player.y < this.y + 60 &&
           60 + player.y > this.y) {
                player.x = 200;
                player.y = 400;
                player.resetLevel();
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

    constructor(x, y, level) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.level = 1;
    }

    update() {  
        if(this.winGame()) {
            this.levelUp();
        }

        if(this.y > 400) {
            this.y = 400;
        }

        if(this.x < 0){
            this.x = 0;
        }

        if(this.x > 400){
            this.x = 400;
        }
    }

    //draw the image on canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //handles the move of player based on keypress
    handleInput(keypress) {
        switch (keypress) {
            case 'left':
                this.x -= 100;
                break;
            case 'right':
                this.x += 100;
                break;
            case 'up':
                this.y -= 83;
                break;
            case 'down':
                this.y += 83;
        }
    }

    //if player reach the water block reset the position to start
    winGame(){
        const levelUp = document.querySelector('.level');
        if(this.y < -50){
            this.x = 200;
            this.y = 400;
            return true;
        }
    }

    //level up
    levelUp() {
        const levelUp = document.querySelector('.level');   
        this.level += 1;
        levelUp.innerHTML = `Level ${this.level}`;
    }

    resetLevel() {
        const levelDown = document.querySelector('.level');   
        this.level = 1;
        levelDown.innerHTML = `Level ${this.level}`;
    }
}

// Now instantiate your objects.
// Place the player object in a variable called player
const player = new Player(200, 400);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];

//all possible positions for an enemy
const rows = [64, 147, 230];

//Returns a random integer between given parameters
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//Creates all three enemies and placed on random y position
for (let i = 0; i < 3; i++) {
    const x = -10;
    const y = rows[Math.floor(Math.random() * rows.length)];
    const speed = getRandomInt(100,500);
    allEnemies.push(new Enemy(x,y,speed));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
