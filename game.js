var canvas, ctx, player;

const grid = 48;
const gridGap = 10;

var frame=0.2;
const rows = [];
var patterns;

function Sprite(props) {
    // shortcut for assigning all object properties to the sprite
    Object.assign(this, props);
}
Sprite.prototype.render = function() {
    ctx.fillStyle = this.color;
    // draw a rectangle sprite
    if (this.shape === 'rect') {
        // by using a size less than the grid we can ensure there is a visual space
        // between each row
        ctx.fillRect(this.x, this.y + gridGap / 2, this.size, grid - gridGap);
    }
        // draw a circle sprite. since size is the diameter we need to divide by 2
        // to get the radius. also the x/y position needs to be centered instead of
    // the top-left corner of the sprite
    else {
        ctx.drawImage(player, 0, 0, player.width / 8, 60, this.x, this.y, grid, grid);
    }
}

const frogger = new Sprite({
    x: grid * 6,
    y: grid * 13,
    color: 'greenyellow',
    size: grid,
    shape: 'circle'
});
const scoredFroggers = []

function init() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    makeSprites();
    preloadAssets();
    loadSprites();
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
            shape: 'rect',     // shape of the obstacle (rect or circle)
            speed: 0.75        // how fast the obstacle moves and which direction
        },

        // turtle
        {
            spacing: [0,2,0,2,0,2,0,4],
            color: '#de0004',
            size: grid,
            shape: 'circle',
            speed: -1
        },

        // long log
        {
            spacing: [2],
            color: '#c55843',
            size: grid * 7,
            shape: 'rect',
            speed: 1.5
        },

        // log
        {
            spacing: [3],
            color: '#c55843',
            size: grid * 3,
            shape: 'rect',
            speed: 0.5
        },

        // turtle
        {
            spacing: [0,0,1],
            color: '#de0004',
            size: grid,
            shape: 'circle',
            speed: -1
        },

        // beach is safe
        null,

        // truck
        {
            spacing: [3,8],
            color: '#c2c4da',
            size: grid * 2,
            shape: 'rect',
            speed: -1
        },

        // fast car
        {
            spacing: [14],
            color: '#c2c4da',
            size: grid,
            shape: 'rect',
            speed: 0.75
        },

        // car
        {
            spacing: [3,3,7],
            color: '#de3cdd',
            size: grid,
            shape: 'rect',
            speed: -0.75
        },

        // bulldozer
        {
            spacing: [3,3,7],
            color: '#0bcb00',
            size: grid,
            shape: 'rect',
            speed: 0.5
        },

        // car
        {
            spacing: [4],
            color: '#e5e401',
            size: grid,
            shape: 'rect',
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
    update();
    draw();
}

function update() {

}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    updateAndDraw();
    frogger.x += frogger.speed || 0;
    frogger.render();
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

function keyboardPressed(ev) {
    if (ev.which === 37) {
        frogger.x -= grid;
    }

    else if (ev.which === 39) {
        frogger.x += grid;
    }

    else if (ev.which === 38) {
        frogger.y -= grid;
    }

    else if (ev.which === 40) {
        frogger.y += grid;
    }

    frogger.x = Math.min( Math.max(0, frogger.x), canvas.width - grid);
    frogger.y = Math.min( Math.max(grid, frogger.y), canvas.height - grid * 2);
}

function preloadAssets() {
    var _toPreload = 0;

    var addImage = function (src) {
        var img = new Image();
        img.src = src;
        _toPreload++;

        img.addEventListener('load', function () {
            _toPreload--;
        }, false);
        return img;
    }
    player = addImage("bilder/froggerv2.png");

    var checkResources = function () {
        if (_toPreload === 0)
            setInterval (gameLoop,40);
        else
            setTimeout(checkResources, 200);
    }
    checkResources();

}
document.addEventListener("keydown", keyboardPressed)
document.addEventListener("DOMContentLoaded", init);
