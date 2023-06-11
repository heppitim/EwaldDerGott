window.addEventListener("DOMContentLoaded", (event) => {

    const music = document.getElementById("music")
    const sounds = document.getElementById("sounds")
    const back = document.getElementById("back");

    if (back) {
        back.addEventListener("click", function () {
            toggleScreen("start-screen", true);
            toggleScreen("option-screen", false);
        });
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


})