"use strict";

//variabelen
var sushiIdLijst = [],
    redouaneLijst = [],
    aantalRedouanes = 0,
    fotolijst = ["sushi1.png", "sushi2.png", "sushi3.png", "sushi4.png", "sushi5.png", "sushi6.png", "sushi7.png", "sushi8.png", "sushi9.png", "sushi10.png"],
    sushiX = 50,
    sushiY = 50,
    sushiSpeedX = 0.1,
    sushiSpeedY = 5,
    totaalAantalSushis = 0,
    initialised = false,
    score = 0,
    timer = 0,
    levens = 3,
    redouane = $("<img src='redouane.png' id='redouane'></img>"),
    redouaneX,
    redouaneY,
    spawnredinterval,
    spawnsushiInterval,
    animationframe,
    optionsToggled = false;


//start van het spel
$(document).ready(function () {
    //randomsushis();
    fillSushiLijst();
    $("#startknop").on('click touchstart', function () {
        $(".startscherm").hide();
        startgame();
        UpdateScore();
        spawnredinterval = setInterval(spawnRed1, 1000);
    });

    $(".options").on('click touchstart', function () {
        if (!optionsToggled) {


            $(".startscherm").hide();
            $(".optiescherm").css("display", "block");
            optionsToggled = true;
        } else {
            optionsToggled = false;
            $(".startscherm").show();
            $(".optiescherm").css("display", "none");
        }

    })

    $("#optiescherm").css("display", "none");

    $("#btnTraagSpeed").on("click", function () {
        sushiSpeedY = 3;
    })
    $("#btnMiddleSpeed").on("click", function () {
        sushiSpeedY = 5;
    })
    $("#btnSnelSpeed").on("click", function () {
        sushiSpeedY = 7;
    })


})

//wanneer de speler verliest, toon de "verlorenbox" +opnieuw starten wanneer op "probeer opnieuw" wordt gedrukt
function gameOver() {
    console.log("game over");
    $("#verlorenbox").css("display", "block");
    $("#btnVerlorenTryAgain").on('click touchstart', function () {
        $("#verlorenbox").css("display", "none");


        //$(".startscherm").show();
    });
    ResetSpel();
}

//het spel resetten. levens en score op 0

function ResetSpel() {
    sushiIdLijst = [];
    totaalAantalSushis = 0;
    aantalRedouanes = 0;
    redouaneLijst = [];
    levens = 3;
    $(".sushi").each(function () {
        $("#" + this.id).remove();
    });
    $(".redouane").each(function () {
        $("#" + this.id).remove();
    })
    clearInterval(spawnredinterval);
    clearInterval(spawnsushiInterval);
    cancelAnimationFrame(animationframe);
    $(".startscherm").show();

}

function UpdateLives() {
    $(".levens").html("Levens:");
    $(".levens").append(levens);
}

//wanneer je Redouane raakt, ben je een leven kwijt.

function spawnRed1() {
    redouane = $("<img src='redouane.png'></img>").attr("id", "r" + aantalRedouanes);
    redouane.addClass('redouane');
    redouane.mouseenter(function () {
        sliceRedouane("r" + aantalRedouanes);
        console.log(levens);
        if (--levens <= 0) {
            gameOver();
        }
        UpdateLives();
    });
    redouane.css({
        "left": (Math.random() * 10),
        "top": -(Math.random() * 100)
    });
    $("#nan2").append(redouane);
    redouaneLijst[aantalRedouanes] = redouane;
    aantalRedouanes++;
}

//sushis snijden
function purgeSushis() {
    var i;
    for (i = 0; i < sushiIdLijst.length; i++) {
        ////console.log($("#nan").innerHeight());
        //console.log("de sushi " + i + "heeft:" + $("#" + sushiIdLijst[i]).css("margin-top"));

        if ($("#" + sushiIdLijst[i]).css("margin-top") > $("#nan").innerHeight()) {
            //console.log("sushi " + i + " has been purged, margin-top:" + $("#" + i).css("margin-top"));
            $("#" + sushiIdLijst[i]).remove();
            //sushiLijst[i].css("display", "none");
            sushiIdLijst.splice(i - 1, 1);
        }

    }
}

//random sushis uit de sushilijst laten verschijnen

function randomsushis() {

    var nieuwesushi = $("<img></img>").attr("id", totaalAantalSushis);
    nieuwesushi.addClass("sushi");
    nieuwesushi.attr("src", selectrandomimage());
    nieuwesushi.mouseenter(function () {
        sliceSushi(this.id);
    });
    nieuwesushi.on('click touchstart', function () {
        sliceSushi(this.id);
    });

    nieuwesushi.css({
        "left": (Math.random() * 10),
        "top": -(Math.random() * 100)
    });

    sushiIdLijst[totaalAantalSushis] = nieuwesushi;
    $("#nan2").append(nieuwesushi);
    totaalAantalSushis++;
}

//willekeurige foto selecteren uit de lijst
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

function sliceSushi(id) {
    // totaalAantalSushis--;
    console.log("sushi wordt gesliced");
    $("#" + id).remove(); //verstopt sushis achter achtergrond
    score = 10 + score;
    UpdateScore();

}

function sliceRedouane(id) {
    console.log("redouane wordt gesliced");
    console.log(id);
    $("#" + id).remove();
}

function UpdateScore() {
    console.log("score updated");
    $(".score").html("Score:");
    $(".score").append(score);
}



function fillSushiLijst() {
    var i;
    for (i = 0; i <= totaalAantalSushis; i++) {
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

    var i;
    for (i = 0; i < sushiIdLijst.length; i++) {
        ////console.log("id: " + i)
        sushiX = parseInt($("#" + i).css("left"));
        sushiY = parseInt($("#" + i).css("top"));
        ////console.log("sushiX: " + sushiX);
        ////console.log("sushiY: " + sushiY);
        sushiX += sushiSpeedX;
        sushiY += sushiSpeedY;
        if (sushiY > $("#nan2").css("height")) {
            resetSushi("#" + i)
            AddStrike();
        }
        //console.log("sushiX:" + sushiX + "sushiY:" + sushiY);
        $("#" + i).css("left", sushiX + "px");
        $("#" + i).css("top", sushiY + "px");

    };
    i = 0;
    for (i; i < redouaneLijst.length; i++) {
        redouaneX = parseInt($("#r" + i).css("left"));
        redouaneY = parseInt($("#r" + i).css("top"));
        redouaneX += sushiSpeedX;
        redouaneY += sushiSpeedY;
        redouane.css("left", redouaneX + "px");
        redouane.css("top", redouaneY + "px");
    }
    if (timer == 90) {
        randomsushis();
        timer = 0;

    }
    timer++;
    animationframe = requestAnimationFrame(startgame);
}

function resetSushi(id) {
    //console.log("sushi herzet: " + id);
    $(id).css({
        "left": (Math.random() * 10),
        "top": -(Math.random() * 100)
    });
    //console.log("new top is: " + $(id).css("top"));
}

function AddStrike() {
    strikes += 1;
    if (strikes == 3) {
        gameOver();
    }
}
/*Het spel is nog niet volledig af. Ik heb het spel wel in landscape kunnen zetten, maar de afmetingen kloppen niet, waardoor het niet mooi uitziet in landscape. Ook de knoppen om Redouane sneller te laten bewegen zijn niet af. Er zijn ook andere details die niet af zijn.
 */
