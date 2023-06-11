window.addEventListener("DOMContentLoaded", (event) => {
    const back = document.getElementById("back2");
    const green = document.getElementById("green");
    const purple = document.getElementById("purple");
    const purple_yellow = document.getElementById("purple_yellow");


    if (back) {
        back.addEventListener("click", function () {
            toggleScreen("start-screen", true);
            toggleScreen("character-screen", false);
        });
    }

    if(green) {

        if(JSON.parse(localStorage.getItem(SAFE_PLAYER)) === "green") {
            green.checked = true;
        }

        green.addEventListener("click", function () {
                localStorage.setItem(SAFE_PLAYER, JSON.stringify(green.value));
        })
    }

    if(purple) {

        if(JSON.parse(localStorage.getItem(SAFE_PLAYER)) === "purple") {
            purple.checked = true;
        }

        purple.addEventListener("click", function () {
            localStorage.setItem(SAFE_PLAYER,JSON.stringify(purple.value));
        })
    }

    if(purple_yellow) {

        if(JSON.parse(localStorage.getItem(SAFE_PLAYER)) === "purple_yellow") {
            purple_yellow.checked = true;
        }

        purple_yellow.addEventListener("click", function () {
            localStorage.setItem(SAFE_PLAYER, JSON.stringify(purple_yellow.value));
        })
    }

});

