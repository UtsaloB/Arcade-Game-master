//TODO 
// Create enemies and player object
// handle player movement
// handle enemy movement
// handle collisions (gems and enemies)
// create responsive screens
// put in Scores and Live at top
// Link Lives and scores to gems and enemy collision
// test edge cases
// have fun! Play away!! 

// let Scores = 0;
// let Lives = 5;
// let game_over = false;

'use strict'

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x,
    this.y = y,
    this.speed = speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. 
 
    this.x += dt * this.speed
   
    if (this.x >= numCols) {
        // reset x-axis and speed
        this.x = -1;
        // todo - make enemy's speed random 
    }
        let enemyXMax = this.x + (dt * this.speed + 0.7);
        let enemyXMin = this.x - (dt * this.speed + 0.7);
        
        if(player.x > enemyXMin && player.x < enemyXMax && player.y === this.y) {
            // collision detected. 
            // reset player position
            // decrement life until zero then game's over, reset game
            player.lives--
            player.resetPosition()

            if(player.lives === 0) {
                // game over, get scores and display in alert
                alert('Game over')
                document.getElementById('Lives').innerHTML = 'Game Over! '
                document.getElementById('Scores').innerHTML = 'Your high score is '+ player.score
                reset()
            }

        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    
};

let Gem = function Gem(name, sprite, score, x, y){
    this.name = name,
    this.sprite = sprite,
    this.score = score,
    this.x = x,
    this.y = y
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
}

Gem.prototype.update = function(dt) {
    // get gem hit area
    if (this.x === player.x && this.y === player.y) {
        console.log('colliision gem deeted')
        player.score += this.score
        resetGem()
    }
}

let Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 3,
    this.y = 5,
    this.lives = 3,
    this.score = 0
};

// todo - ensure the dt param is required otherwise remove it.
Player.prototype.update = function(dt) {

};

Player.prototype.resetPosition = function(){
    this.x = 3,
    this.y = 5
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83)
}

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'up') {
        if (this.y > 0) {
            --this.y
        }
        
    } else if (keyCode === 'down') {
        if (this.y < 5){
            ++this.y
        } 
        
    } else if (keyCode === 'left') {
        if(this.x > 0) {
            --this.x
        }

    } else if (keyCode === 'right'){
        if (this.x < numCols-1){
            ++this.x
        }
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [
    new Enemy(0, 1, .5), new Enemy(0,3,1), 
    new Enemy(0,2,2), new Enemy(0,1,2.5),
];

let player = new Player();

let allGems = [
    new Gem('Green', 'images/Gem Green.png', 10),
    new Gem('Orange', 'images/Gem Orange.png',5),
    new Gem('Blue', 'images/gem-blue.png',  20),
]

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

  
    player.handleInput(allowedKeys[e.keyCode]);
});
