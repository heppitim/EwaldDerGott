var x = 0;
var y = 0;

$(document).ready(function() {
    takt = window.setInterval(taktung, 300);

    var spielbrett = document.getElementById('leinwand');
    spielfeld = spielbrett.getContext('2d');

    var spielfigur = new Image();
    spielfigur.src='bilder/spielfigur.png';
    
    spielfigur.onload=function() {
        spielfeld.drawImage(spielfigur, x, y);    
    }

    function taktung() {
        spielfeld.clearRect(0, 0, 600, 480);
        spielfeld.drawImage(spielfigur, x, y);
    }

    $(document).bind('keydown', function (evt) {
        console.log(evt.keyCode);
        switch (evt.keyCode) {
            case 40:
                y += 20;
                if (y >= 480) {
                    y = 460;
                }
                //console.log("Wert y: "+y);
                return false;
                break; 
            case 38:
                y -= 20;
                if(y <= 0) {
                    y = 0;
                }
                return false;
                break;
            case 37:
                x -= 20;
                if(x <= 0) {
                    x = 0;
                }
                return false;
                break;
            case 39:
                x += 20;
                if(x >= 600) {
                    x = 580;
                }
                return false;
                break;
        }
    });
});