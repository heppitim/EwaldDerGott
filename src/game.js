var canvas, ctx;

//sprites
var water, gras, brick;
var sprites_up, sprites_down, sprites_right,
    sprites_left, sprites_mirrored,
    sprites_down_mirrored, sprites_left_mirrored;
var turtles

//sounds
var theme, jump;

// score / time
var score = 0;
var playtime = 45;
var remaining_time = 0;
var start_time;
var lives = 6;

const grid = 48;
const gridGap = 10;

var frame_frogger = 0.2
var frame_turtles= 0.2;
var frame_death = 0.2;

var test = 0;


const rows = [];
var patterns;


function Sprite(props) {
    // shortcut for assigning all object properties to the sprite
    Object.assign(this, props);
}
Sprite.prototype.render = function() {

     //Slowdown Animation
    // draw a rectangle sprite

    if (this.name === 'log') {
        ctx.drawImage(sprites_up, 0, 210, sprites_up.width / 2.66, 40, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'turtle') {
        frame_turtles += 0.002;

        ctx.drawImage(turtles, Math.floor(frame_turtles % 4) * turtles.width / 4, 0, turtles.width / 4, 55, this.x, this.y, grid - gridGap, grid - gridGap);
    }
    else if (this.name === 'truck') {
        ctx.drawImage(sprites_down, 255, 579, sprites_down.width / 4, 55, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'fast car') {
        ctx.drawImage(sprites_up, 130, 452, sprites_down.width / 8, 52, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'car 2') {
        ctx.drawImage(sprites_down, 385, 585, sprites_down.width / 8 -1, 45, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'bulldozer') {
        ctx.drawImage(sprites_up, 257, 389, sprites_down.width / 8 -1, 58, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'car 1') {
        ctx.drawImage(sprites_down, 450, 584, sprites_down.width / 8 -1, 48, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'scoredFrog') {
        ctx.drawImage(sprites_up, 262, 8, sprites_up.width / 8 -12, 54, this.x, this.y, grid, grid- 10);
    }
    else if (this.state === 'dead') {
        frame_death += 0.03;

        ctx.drawImage(sprites_mirrored, 256 +Math.floor(frame_death % 4) * sprites_mirrored.width / 8, 64, sprites_mirrored.width / 8, 60, this.x, this.y, grid - gridGap, grid - gridGap);
    }
    else {
        frame_frogger += 0.3;
        if (this.direction === 'up') {

            if (this.secondstate === "jumping") {
                ctx.drawImage(sprites_up, Math.floor(frame_frogger % 4) * sprites_up.width / 8, 0, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
            } else {
                ctx.drawImage(sprites_up, 0, 0, sprites_up.width / 8 - 4, 48, this.x, this.y, grid, grid - gridGap);
            }
        }
        else if (this.direction === 'down') {

            if(this.secondstate === "jumping") {
                ctx.drawImage(sprites_down_mirrored, Math.floor(frame_frogger % 4) * sprites_up.width / 8, 960, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
            } else {
                ctx.drawImage(sprites_down, 452, 976, sprites_up.width / 8 - 4, 48, this.x, this.y, grid, grid - gridGap);
            }
        }
        else if (this.direction === 'right') {

            if(this.secondstate === "jumping") {
                ctx.drawImage(sprites_right, 960 , Math.floor(frame_frogger % 4) * sprites_right.height / 8, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
            }
            else {
                ctx.drawImage(sprites_right, 976, 0, sprites_up.width / 8 - 16, 60, this.x, this.y, grid, grid- gridGap);
            }
        }
        else {
            if(this.secondstate === "jumping") {
                ctx.drawImage(sprites_left_mirrored, 0 , Math.floor(frame_frogger % 4) * sprites_right.height / 8, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
            }
            else {
                ctx.drawImage(sprites_left, 0, 452, sprites_up.width / 8 - 16, 60, this.x, this.y, grid, grid- gridGap);
            }
        }

    }
}

const frogger = new Sprite({
    x: grid * 6,
    y: grid * 13,
    color: 'greenyellow',
    size: grid,
    name: 'frogger',
    direction: 'up',
    state: 'alive',
    secondstate: 'solid'
});
var scoredFroggers = []

//window.onload = init;

function start() {
    toggleScreen("start-screen", false);
    toggleScreen("game", true);
    init();
    start_time = new Date();
}

function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = (toggle) ? "block" : "none";
    element.style.display = display;
}

function init() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    theme = addSound("sounds/FroggerTheme.mp3");
    jump = addSound("sounds/jump.mp3");
    makeSprites();
    window.requestAnimationFrame(gameLoop);
    loadSprites();
    playTheme()
}

function playTheme() {
    theme.play();
}

function makeSprites() {
   patterns = [
        // end bank is safe
        null,

        // log
        {
            spacing: [2],      // how many grid spaces between each obstacle
            color: '#c55843',  // color of the obstacle
            size: grid * 4,    // width (rect) / diameter (circle) of the obstacle
            name: 'log',       // shape of the obstacle (rect or circle)
            speed: 0.75        // how fast the obstacle moves and which direction
        },

        // turtle
        {
            spacing: [0,2,0,2,0,2,0,4],
            color: '#de0004',
            size: grid,
            name: 'turtle',
            speed: -1
        },

        // long log
        {
            spacing: [2],
            color: '#c55843',
            size: grid * 7,
            name: 'log',
            speed: 1
        },

        // log
        {
            spacing: [3],
            color: '#c55843',
            size: grid * 3,
            name: 'log',
            speed: 0.5
        },

        // turtle
        {
            spacing: [0,0,1.5],
            color: '#de0004',
            size: grid,
            name: 'turtle',
            speed: -1
        },

        // beach is safe
        null,

        // truck
        {
            spacing: [3,8],
            color: '#c2c4da',
            size: grid * 2,
            name: 'truck',
            speed: -1
        },

        // fast car
        {
            spacing: [2,10],
            color: '#c2c4da',
            size: grid,
            name: 'fast car',
            speed: 2.0
        },

        // car
        {
            spacing: [3,3,7],
            color: '#de3cdd',
            size: grid,
            name: 'car 2',
            speed: -0.75
        },

        // bulldozer
        {
            spacing: [3,3,7],
            color: '#0bcb00',
            size: grid,
            name: 'bulldozer',
            speed: 0.5
        },

        // car
        {
            spacing: [4],
            color: '#e5e401',
            size: grid,
            name: 'car 1',
            speed: -0.5
        },

        // start zone is safe
        null
    ];
}

function loadSprites() {
// rows holds all the sprites for that row

    for (let i = 0; i < patterns.length; i++) {
        rows[i] = [];

        let x = 0;
        let index = 0;
        const pattern = patterns[i];

        // skip empty patterns (safe zones)
        if (!pattern) {
            continue;
        }

        // allow there to be 1 extra pattern offscreen so the loop is seamless
        // (especially for the long log)
        let totalPatternWidth =
            pattern.spacing.reduce((acc, space) => acc + space, 0) * grid +
            pattern.spacing.length * pattern.size;
        let endX = 0;
        while (endX < canvas.width) {
            endX += totalPatternWidth;
        }
        endX += totalPatternWidth;

        // populate the row with sprites
        while (x < endX) {
            rows[i].push(new Sprite({
                x,
                y: grid * (i + 1),
                index,
                ...pattern
            }));

            // move the next sprite over according to the spacing
            const spacing = pattern.spacing;
            x += pattern.size + spacing[index] * grid;
            index = (index + 1) % spacing.length;
        }
    }
}

function gameLoop() {
    draw()
    window.requestAnimationFrame(gameLoop);
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawTime();
    drawScore();
    drawLives();
    drawBackground();
    updateAndDraw();
    drawFrogger();
}

function drawTime() {
    var current_time = new Date();
    remaining_time = playtime - Math.floor((current_time.getTime() - start_time.getTime()) / 1000);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Time: " + remaining_time, grid * 10, grid*15 - 12);
}

function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 34);
}

function drawLives() {
    for(let i = 0; i < lives; i++) {
        let gap = 20 * i;
        ctx.drawImage(sprites_up, 64, 0, sprites_up.width / 8 - 4, 60, gap, grid * 14, 20, grid / 2);
    }
}

function drawBackground() {
    //Water
    ctx.fillStyle = '#020079';
    ctx.fillRect(0, grid, canvas.width, grid * 6);

    // End Zone
    ctx.drawImage(gras, 0, grid, canvas.width, 5);
    ctx.drawImage(gras, 0, grid, 5, grid);
    ctx.drawImage(gras, canvas.width - 5, grid, 5, grid);
    for(let i = 0; i < 4; i++) {
        ctx.drawImage(gras, grid + grid * 3 * i, grid, grid * 2, grid);
    }

    //beach
    for(let i = 0; i < 13; i++) {
        ctx.drawImage(brick, 48 * i, 7 * grid, 48, grid);
    }

    //start zone
    for(let i = 0; i < 13; i++) {
        ctx.drawImage(brick, 48 * i, canvas.height - grid * 2, 48, grid);
    }

}

function updateAndDraw() {
    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];

        for (let i = 0; i < row.length; i++) {
            const sprite = row[i]
            sprite.x += sprite.speed;
            sprite.render();

            // loop sprite around the screen
            // sprite is moving to the left and goes offscreen
            if (sprite.speed < 0 && sprite.x < 0 - sprite.size) {

                // find the rightmost sprite
                let rightMostSprite = sprite;
                for (let j = 0; j < row.length; j++) {
                    if (row[j].x > rightMostSprite.x) {
                        rightMostSprite = row[j];
                    }
                }

                // move the sprite to the next spot in the pattern so it continues
                const spacing = patterns[r].spacing;
                sprite.x =
                    rightMostSprite.x + rightMostSprite.size +
                    spacing[rightMostSprite.index] * grid;
                sprite.index = (rightMostSprite.index + 1) % spacing.length;
            }

            // sprite is moving to the right and goes offscreen
            if (sprite.speed > 0 && sprite.x > canvas.width) {

                // find the leftmost sprite
                let leftMostSprite = sprite;
                for (let j = 0; j < row.length; j++) {
                    if (row[j].x < leftMostSprite.x) {
                        leftMostSprite = row[j];
                    }
                }

                // move the sprite to the next spot in the pattern so it continues
                const spacing = patterns[r].spacing;
                let index = leftMostSprite.index - 1;
                index = index >= 0 ? index : spacing.length - 1;
                sprite.x = leftMostSprite.x - spacing[index] * grid - sprite.size;
                sprite.index = index;
            }
        }
    }
}

function drawFrogger() {
    frogger.x += frogger.speed || 0;
    frogger.render();

    // if all Frogs are Scored, reset
    if(scoredFroggers.length === 5) {
        scoredFroggers = [];
        score += 1000;
    }
    scoredFroggers.forEach(frog => frog.render());

    // check for collision with all sprites in the same row as frogger
    const froggerRow = frogger.y / grid - 1 | 0;
    let collision = false;
    for (let i = 0; i < rows[froggerRow].length; i++) {
        let sprite = rows[froggerRow][i];

        // axis-aligned bounding box (AABB) collision check
        // treat any circles as rectangles for the purposes of collision
        if (frogger.x < sprite.x + sprite.size - gridGap &&
            frogger.x + grid - gridGap > sprite.x &&
            frogger.y < sprite.y + grid &&
            frogger.y + grid > sprite.y) {
            collision = true;

            // reset frogger if got hit by car
            if (froggerRow > rows.length / 2 && frogger.state !== "dead" && frogger.secondstate !== "jumping") {
                death();
            }
            // move frogger along with obstacle
            else if (frogger.state !== "dead" && frogger.secondstate !== "jumping") {
                frogger.speed = sprite.speed;
            }
        }
    }

    if (!collision) {
        // if frogger isn't colliding reset speed
        frogger.speed = 0;

        // frogger got to end bank (goal every 3 cols)
        const col = (frogger.x + grid / 2) / grid | 0;
        if (froggerRow === 0 && col % 3 === 0 && frogger.y % grid === 0 &&
            // check to see if there isn't a scored frog already there
            !scoredFroggers.find(frog => frog.x === col * grid)) {
            scoredFroggers.push(new Sprite({
                ...frogger,
                x: col * grid,
                y: frogger.y + 5,
                name: 'scoredFrog'
            }));
            score += 50 + remaining_time / 2 * 10;
            start_time = new Date();
        }

        // reset frogger if not on obstacle in river
        if (froggerRow < rows.length / 2 - 1 && frogger.state !== "dead" && frogger.secondstate !== "jumping") {
            if(froggerRow === 0) {
                frogger.x = grid * 6;
                frogger.y = grid * 13;
            } else {
                death();
            }
        }
    }
}

function death() {
    frogger.state = "dead";
    setTimeout(function () {
        frame_death = 0;
        frogger.x = grid * 6;
        frogger.y = grid * 13;
        lives -= 1;
        frogger.state = "alive";
        start_time = new Date();
    }, 1900);
}

function keyboardPressed(ev) {
    let id
    let end = 0;
    let frame = 3;
    let timeout = 7;



    if(frogger.state !== "dead" && frogger.secondstate !== "jumping") {
        playJump();
        //links
        frogger.secondstate = "jumping";
        if (ev.which === 37) {
            frogger.direction = 'left';
            id = setInterval(function () {
                if(end === 48) {
                    clearInterval(id);
                    frogger.secondstate = "solid"
                }
                else {
                    frogger.x -= frame;
                }
                end += frame;
                frogger.x = Math.min( Math.max(0, frogger.x), canvas.width - grid);
            }, timeout)
        }
        //rechts
        else if (ev.which === 39) {
            frogger.direction = 'right';
            id = setInterval(function () {
                if(end === 48) {
                    clearInterval(id);
                    frogger.secondstate = "solid"
                }
                else {
                    frogger.x += frame;
                }
                end += frame;
                frogger.x = Math.min( Math.max(0, frogger.x), canvas.width - grid);
            }, timeout)
        }
        //hoch
        else if (ev.which === 38) {
            frogger.direction = 'up'
            id = setInterval(function () {
                if(end === 48) {
                    clearInterval(id);
                    frogger.secondstate = "solid"
                }
                else {
                    frogger.y -= frame;
                }
                end += frame;
                frogger.y = Math.min( Math.max(grid, frogger.y), canvas.height - grid * 2);
            }, timeout)
            score += 10;
        }
        //runter
        else if (ev.which === 40) {
            frogger.direction = 'down';
            id = setInterval(function () {
                if(end === 48) {
                    clearInterval(id);
                    frogger.secondstate = "solid"
                }
                else {
                    frogger.y += frame;
                }
                end += frame;
                frogger.y = Math.min( Math.max(grid, frogger.y), canvas.height - grid * 2);
            }, timeout)
        }
    }
   //frogger.y = Math.min( Math.max(grid, frogger.y), canvas.height - grid * 2);
   //frogger.x = Math.min( Math.max(0, frogger.x), canvas.width - grid);
}

function playJump() {
    jump.pause();
    jump.currentTime = 0;
    jump.play();
}

const addSound = function (src) {
    const sound = new Audio();
    sound.src = src;
    return sound;
}

function preloadTest() {
    let _toPreload = 0;

    const addImage = function (src) {
        const img = new Image();
        img.src = src;
        _toPreload++;

        img.addEventListener('load', function () {
            _toPreload--;
        }, false);
        return img;
    };

    //sprites
    water = addImage("sprites/water.png");
    gras = addImage("sprites/gras.png");
    brick = addImage("sprites/brick.png")
    sprites_up = addImage("sprites/frogger_sprites_up.png");
    sprites_down = addImage("sprites/frogger_sprites_down.png");
    sprites_right = addImage("sprites/frogger_sprites_right.png");
    sprites_left = addImage("sprites/frogger_sprites_left.png");
    sprites_mirrored = addImage("sprites/frogger_sprites_up_mirrored.png");
    sprites_down_mirrored = addImage("sprites/frogger_sprites_down_mirrored.png");
    sprites_left_mirrored = addImage("sprites/frogger_sprites_left_mirrored.png");
    turtles = addImage("sprites/turtles.png");

    //sounds
    //jump = addSound("sounds/jump.mp3");

    const checkResources = function () {
        if (_toPreload === 0) {

        }
        else {
            setTimeout(checkResources, 200);
        }
    };
    checkResources();
}

/*function preloadAssets() {
    let _toPreload = 0;

    const addImage = function (src) {
        const img = new Image();
        img.src = src;
        _toPreload++;

        img.addEventListener('load', function () {
            _toPreload--;
        }, false);
        return img;
    };

    //sprites
    water = addImage("sprites/water.png");
    gras = addImage("sprites/gras.png");
    brick = addImage("sprites/brick.png")
    sprites_up = addImage("sprites/frogger_sprites_up.png");
    sprites_down = addImage("sprites/frogger_sprites_down.png");
    sprites_right = addImage("sprites/frogger_sprites_right.png");
    sprites_left = addImage("sprites/frogger_sprites_left.png");
    sprites_mirrored = addImage("sprites/frogger_sprites_up_mirrored.png");
    sprites_down_mirrored = addImage("sprites/frogger_sprites_down_mirrored.png");
    sprites_left_mirrored = addImage("sprites/frogger_sprites_left_mirrored.png");
    turtles = addImage("sprites/turtles.png");

    //sounds
    //jump = addSound("sounds/jump.mp3");

    const checkResources = function () {
        if (_toPreload === 0) {
        window.requestAnimationFrame(gameLoop);
        }
        else {
            setTimeout(checkResources, 200);
        }
    };
    checkResources();

}*/
document.addEventListener("keydown", keyboardPressed)
