window.addEventListener("DOMContentLoaded", (event) => {


    const normal = document.getElementById("normal");
    const hard = document.getElementById("hard");
    const music = document.getElementById("music");
    const sounds = document.getElementById("sounds");
    const back = document.getElementById("back");




    if(normal) {

        if(JSON.parse(localStorage.getItem(GAME_MODE)) === "normal") {
            normal.checked = true;
        }

        normal.addEventListener("click", function () {
           localStorage.setItem(GAME_MODE, JSON.stringify(normal.value));
        });
    }

    if(hard) {
        if(JSON.parse(localStorage.getItem(GAME_MODE)) === "hard") {
            hard.checked = true;
        }

        hard.addEventListener("click", function () {
            localStorage.setItem(GAME_MODE, JSON.stringify(hard.value));
        })
    }


    if (music) {
        music.checked = JSON.parse(localStorage.getItem(SAFE_MUSIC));

        music.addEventListener("click", function () {
            if(music.checked) {
                localStorage.setItem(SAFE_MUSIC, "true");
            }
            else {
                localStorage.setItem(SAFE_MUSIC,"false");
            }
        })
    }

    if (sounds) {
        sounds.checked = JSON.parse(localStorage.getItem(SAFE_SOUND));

        sounds.addEventListener("click", function () {
            if (sounds.checked) {
                localStorage.setItem(SAFE_SOUND, "true");
            }
            else {
                localStorage.setItem(SAFE_SOUND, "false");
            }
        })
    }

    if (back) {
        back.addEventListener("click", function () {
            toggleScreen("start-screen", true);
            toggleScreen("option-screen", false);
        });
    }

});