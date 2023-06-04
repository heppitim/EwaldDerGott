window.addEventListener("DOMContentLoaded", (event) => {
    const yes = document.getElementById("yes");
    const no = document.getElementById("no");
    if(yes) {
        yes.addEventListener("click", function () {
            start();
        })
    }

    if (no) {
        no.addEventListener("click", function () {
            toggleScreen("start-screen", true);
            toggleScreen("game", false);
            toggleScreen("gameover-screen", false);
        })
    }
})
