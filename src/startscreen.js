window.onload = function () {
    preloadTest();
    const button = document.querySelector("#start-game");
    button.addEventListener("click", function () {
        start();
    });
}


