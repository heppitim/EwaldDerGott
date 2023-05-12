var canvas, ctx;


var background;

var player;
var frame=0.2;

var x =0;
var y = 0;

function init() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d")

    preloadAssets();
}

function gameLoop() {
    update();
    draw();
}

function update() {

}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //drawBackground();
    //drawWorld();
    drawPlayer()

}

function drawBackground(){
    ctx.drawImage(background,0,0,);
}

function drawWorld(){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,50,50);

    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(200,200);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(95,50,40,0, 2* Math.PI);
    ctx.stroke();

    ctx.font ="bold 60px Tangerine";
    ctx.fillText("Hello WTA", 200,50);
}

function drawPlayer () {
    ctx.drawImage(player, 0, 0,
        player.width / 8, 60,
        x, y,
        player.width/8, 60);
}

function jumpPlayer() {
    frame += 0.2; //Slowdown Animation

    ctx.drawImage(player,  Math.floor(frame % 4) * player.width / 8, 0,
        player.width / 8, 60,
        100, 100,
        player.width / 8, 60);
}

function keyboardPressed(ev) {
    console.log("key pressed");
    var key_press = String.fromCharCode(ev.keyCode);

    if (key_press == "A") {
        jumpPlayer();
    }
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
    background = addImage("https://picsum.photos/640/480");
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