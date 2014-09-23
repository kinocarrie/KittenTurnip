$(function() { 

$("#buttons").hide();
$("#replay").hide();
$("#score>div").hide();

var doors = [{getID: "doorOne",
    prize: "turnip",
    turnipReveal: false,
    readable: "Door One",
    switchable: true
    }, {getID: "doorTwo",
    prize: "turnip",
    turnipReveal: false,
    readable: "Door Two",
    switchable: true
    }, {getID: "doorThree",
    prize: "turnip",
    turnipReveal: false,
    readable: "Door Three",
    switchable: true,
}]

var switchScore = 0;
var switchLost = 0;
var stickScore = 0;
var stickLost = 0;
var gameTotal = 0;
var kittenSelector = Math.random();
var turnipSelector = Math.random();

function timePlural(i) {
            if (i == 1) {
                return ("time")    
                }
            else {
                return ("times")  
            }
        };

function accessDoors(a) {
    for(var i=0; i<doors.length; i++) {
        console.log(doors[i].readable + ": " + doors[i][a]);
} //end for
} //end accessDoors

function prizeReset() {
    for(var i=0; i<doors.length; i++) {
        doors[i].prize = "turnip";
        doors[i].turnipReveal = false;
        doors[i].switchable = true;
    }
    kittenSelector = Math.random();
    turnipSelector = Math.random();
    }; //end prize reset

function prizeSelector() {

if (kittenSelector <= 0.33333333333333) {
    doors[0].prize = "kitten";
    if (turnipSelector <= 0.5) {
        doors[1].turnipReveal = true;
    }
    else {
        doors[2].turnipReveal = true;
    }
} //end if
else if (kittenSelector <= 0.666666666666666) {
    doors[1].prize = "kitten";
    if (turnipSelector <= 0.5) {
        doors[0].turnipReveal = true;
    }
    else {
        doors[2].turnipReveal = true;
    }
} //end else if
else {
    doors[2].prize = "kitten";
    if (turnipSelector <= 0.5) {
        doors[0].turnipReveal = true;
    }
    else {
        doors[1].turnipReveal = true;
    }
} // end else
} //end prizeSelector

prizeSelector();

function returnDoors(a, b, c) {
    for(var i=0; i<doors.length; i++) {
        if (doors[i][a] === b) {
            return doors[i][c];
        }
} //end for
} //end returnDoors

function revealAllDoors() {
    for(var i=0; i<doors.length; i++) {
        var revealPrize = doors[i].prize;
        $("#" + doors[i].getID).addClass(revealPrize);
    }
}

function editDoor(a, b, c, d) {
    for(var i=0; i<doors.length; i++) {
        if (doors[i][a] === b) {
            doors[i][c] = d;
        }
    }
}

function changeSelection() {
    $(".selected").removeClass("selected");
    var newSelection = returnDoors("switchable", true, "getID");
    $("#" + newSelection).addClass("selected");
}

function beginGame() {
    $(".doors").click(function() {
        $(this).addClass("selected");
        var doorSelection = $(this).attr("id");
        var doorSelectionReadable = returnDoors("getID", doorSelection, "readable");
        var currentPrize = returnDoors("getID", doorSelection, "prize");
        var kittenDoor = returnDoors("prize", "kitten", "getID");
        var revealingTurnip = returnDoors("turnipReveal", true, "getID");
        editDoor("getID", doorSelection, "switchable", false);

        function selectedMessage (a) {
            var i = returnDoors("getID", a, "readable");
            $("#message").html("<p>You selected " + doorSelectionReadable + ". There is a turnip behind " + i + ". Will you STICK or SWITCH?</p>").fadeIn();
            $("#buttons").fadeIn();
            $("#" + a).addClass("turnip");
        }
        $(".doors").off("click");

        if (currentPrize === "kitten") {
            selectedMessage(revealingTurnip);
            editDoor("getID", revealingTurnip, "switchable", false);
        }
        else if (doorSelection === revealingTurnip) {
            function findOtherTurnip(a, b, c) {
                for(var i=0; i<doors.length; i++) {
                    if (doors[i].prize === "turnip" && doors[i].turnipReveal === false) {
                        return doors[i].getID;
                    }
                } //end for
            } //end otherTurnip
            var otherTurnip = findOtherTurnip();
            selectedMessage(otherTurnip);
            editDoor("getID", otherTurnip, "switchable", false);
        }
        else {
            selectedMessage(revealingTurnip);
            editDoor("getID", revealingTurnip, "switchable", false);
        }

$("#buttons > button").click(function() {
     $("#buttons > button").off("click");

    var buttonClicked = $(this).attr("id");


function winLoseMessage(i, j) {
    $("#buttons").hide();
    if (i === "won") {
        $("#message").html("You " + j + " and won! Congratulations on finding the kitten.");
    }
    else {
        $("#message").html("You " + j + " and lost! Oh well, better luck next time.");
    }
    $("#replay").fadeIn();
    revealAllDoors()
}

if (buttonClicked === "stick" && currentPrize === "kitten") {
    stickScore++;
    winLoseMessage("won", "stuck");
}
else if (buttonClicked === "stick" && currentPrize === "turnip") {
    stickLost++;
    winLoseMessage("lost", "stuck");
}
else if (buttonClicked === "switch" && currentPrize === "kitten") {
    switchLost++;
    winLoseMessage("lost", "switched");
    changeSelection();
}
else {
    switchScore++;
    winLoseMessage("won", "switched");
    changeSelection();
}

});// end click
});

} // end beginGame

beginGame();

function appendScore() {
    gameTotal++;
    var switchTotal = switchScore + switchLost;
    var stickTotal = stickScore + stickLost;
    var stickWinPercent = stickScore / stickTotal * 100;
var switchWinPercent = switchScore / switchTotal * 100;
    if (gameTotal < 10) {
        $("#score .warning").html("NO SCORE YET! You've only played " + gameTotal + " " + timePlural(gameTotal) + ". You must plat at least 10 games.");
    } 
    else {
        $("#stickscore>div").html("Won " + stickScore + " out of " + stickTotal + "<br> That's " + Math.round(stickWinPercent) + "% of the time.");
        $("#switchscore>div").html("Won " + switchScore + " out of " + switchTotal + "<br> That's " + Math.round(switchWinPercent) + "% of the time.");
    }
    if (gameTotal >= 10) {
        $("#score>div").show();
        $("#score .warning").hide();
    }
}

$("#replay > button").click(function() {
     $("#buttons > button").on("click");
    appendScore();
    $(".doors, #message").fadeOut(300).fadeIn(600);
    setTimeout(function() {
        $(".doors").removeClass("kitten turnip selected");
    }, 300);
    $("#replay").hide();
    $("#message").html("Pick another door to play again!");
    prizeReset();
    prizeSelector();
    $(".doors").on("click", beginGame());
});

}); // end ready.