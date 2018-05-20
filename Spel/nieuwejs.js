"use strict";

var fotolijst = ["sushi1.png", "sushi2.png", "sushi3.png", "sushi4.png", "sushi5.png", "sushi6.png", "sushi7.png", "sushi8.png", "sushi9.png", "sushi10.png"],
    sushiX = 50,
    sushiY = 50,
    sushiSpeedX = 0.1,
    sushiSpeedY = 5,
    strikes;


$(document).ready(function () {
    //randomsushis();
    fillSushiLijst();
    $("#startknop").click(function () {
        $(".startscherm").hide();
        startgame();
        setInterval(spawnRed1, 1000);
    });


    $(".options").click(function () {
        $(".startscherm").hide();
        $(".optiescherm").css("display", "block");
    });

    //setInterval(purgeSushis, 1000);
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // naar landscape gaan
        if (window.innerHeight > window.innerWidth) {
            $('body').css({
                "-webkit-transform": "rotate(90deg)"
            });
        }
        // in landscape blijven
        if (window.innerWidth > window.innerHeight) {
            $('body').css({
                "-webkit-transform": "rotate(0deg)"
            });
        }
    }

});


function selectrandomimage() {
    var random = Math.random();
    if (random > 0.90) {
        return fotolijst[0];
    } else if (random > 0.8) {
        return fotolijst[1];
    } else if (random > 0.70) {
        return fotolijst[2];
    } else if (random > 0.60) {
        return fotolijst[3];
    } else if (random > 0.50) {
        return fotolijst[4];
    } else if (random > 0.40) {
        return fotolijst[5];
    } else if (random > 0.30) {
        return fotolijst[6];
    } else if (random > 0.20) {
        return fotolijst[7];
    } else if (random > 0.10) {
        return fotolijst[8]
    } else if (random > 0.00) {
        return fotolijst[9];
    }
}
