window.addEventListener("DOMContentLoaded", (event) => {
    const startGame = document.getElementById("start-game");
    const options = document.getElementById("options");
    const character = document.getElementById("character");
    const controls = document.getElementById("controls");

    preloadAssets();

    if(startGame) {
        startGame.addEventListener("click", function () {
            start();
        });
    }

    if (options) {
        options.addEventListener("click", function () {
            toggleScreen("start-screen", false);
            toggleScreen("option-screen", true);
        });
    }

    if (character) {
        character.addEventListener("click", function () {
            toggleScreen("start-screen", false);
            toggleScreen("character-screen", true);
        })
    }

    if(controls) {
        controls.addEventListener("click", function () {
            toggleScreen("start-screen", false);
            toggleScreen("controls-screen", true);
        })
    }

})


