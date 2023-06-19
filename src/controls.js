window.addEventListener("DOMContentLoaded", (event) => {
    const back = document.getElementById("back3");

    if(back) {
        back.addEventListener("click", function () {
            toggleScreen("start-screen", true);
            toggleScreen("controls-screen", false);
        });
    }
});