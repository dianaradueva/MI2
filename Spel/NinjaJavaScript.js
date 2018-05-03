"use strict";
var sushiIdLijst = [],
    fotolijst = ["sushi1.png", "sushi2.png", "sushi3.png", "sushi4.png", "sushi5.png", "sushi6.png", "sushi7.png", "sushi8.png", "sushi9.png", "sushi10.png"],
    sushiX = 50,
    sushiY = 50,
    sushiSpeedX = 0.1,
    sushiSpeedY = 1,
    totaalAantalSushis = 1,
    initialised = false,
    score,
    timer = 0;


$(document).ready(function () {
    randomsushis();
    fillSushiLijst();
    $("#startknop").click(startgame);

    //setInterval(purgeSushis, 1000);
})

function purgeSushis() {
    var i;
    for (i = 0; i < sushiIdLijst.length; i++) {
        //console.log($("#nan").innerHeight());
        console.log("de sushi " + i + "heeft:" + $("#" + sushiIdLijst[i]).css("margin-top"));

        if ($("#" + sushiIdLijst[i]).css("margin-top") > $("#nan").innerHeight()) {
            console.log("sushi " + i + " has been purged, margin-top:" + $("#" + i).css("margin-top"));
            $("#" + sushiIdLijst[i]).remove();
            //sushiLijst[i].css("display", "none");
            sushiIdLijst.splice(i - 1, 1);
        }

    }
}

function randomsushis() {

    var nieuwesushi = $("<img></img>").attr("id", totaalAantalSushis);
    nieuwesushi.addClass("sushi");
    nieuwesushi.attr("src", selectrandomimage());
    nieuwesushi.mouseenter(sliceSushi);
    nieuwesushi.css({
        "left": (Math.random() * 10),
        "top": -(Math.random() * 100)
    });
    $("#nan2").append(nieuwesushi);
    sushiIdLijst[totaalAantalSushis] = nieuwesushi;
    totaalAantalSushis++;
}

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

function sliceSushi() {
    // totaalAantalSushis--;
    var i = this.id;
    $("#" + i).css("z-index", "-1"); //verstopt sushis achter achtergrond
    score += 10;
}

function fillSushiLijst() {
    var i;
    for (i = 0; i < totaalAantalSushis; i++) {
        sushiIdLijst[i] = i;
    }
}

function viewdata(i) {
    $("#" + i).css("margin-left");
    $("#" + i).css("margin-top");
}

function startgame() {
    if (!initialised) {
        var i;
        for (i = 0; i <= sushiIdLijst.length; i++) {
            $("#" + i).mouseenter(sliceSushi);

        }
        initialised = true;
    }
    //update();
    //console.log("joehoe");
    var i;
    for (i = 0; i < sushiIdLijst.length; i++) {
        sushiX = parseInt($("#" + i).css("left"));
        sushiY = parseInt($("#" + i).css("top"));
        console.log("sushix: " + $("#" + i).css("left"));
        console.log("sushiY: " + $("#" + i).css("top"));
        sushiX += sushiSpeedX;
        sushiY += sushiSpeedY;

        //console.log(i);
        $("#" + i).css("left", sushiX + "px");
        $("#" + i).css("top", sushiY + "px");
    }
    if (timer == 90) {
        randomsushis();
        timer = 0;

    }
    timer++;
    requestAnimationFrame(startgame);
}
