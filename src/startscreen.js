window.addEventListener("DOMContentLoaded", (event) => {
    const button = document.getElementById("start-game");
    if(button) {
        button.addEventListener("click", function () {
            preloadTest();
            start();
        })
    }
})


