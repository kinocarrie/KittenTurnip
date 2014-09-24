$(function() { 

$("#buttons, #replay, #score>div").hide();
$(".doorholder").addClass("begin");

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
}//end revealAllDoors

function editDoor(a, b, c, d) {
    for(var i=0; i<doors.length; i++) {
        if (doors[i][a] === b) {
            doors[i][c] = d;
        }
    }
}//end editDoor

function changeSelection() {
    $(".selected").removeClass("selected");
    var newSelection = returnDoors("switchable", true, "getID");
    $("#" + newSelection).addClass("selected complete");
}//end changeSelection

function appendScore() {
    gameTotal++;
    var switchTotal = switchScore + switchLost;
    var stickTotal = stickScore + stickLost;
    var overallStickWin = stickScore + switchLost;
    var overallSwitchWin = switchScore + stickLost;
    var switchTotalPercent = (switchScore + stickLost) / gameTotal * 100;
    var stickWinPercent = stickScore / stickTotal * 100;
    var switchWinPercent = switchScore / switchTotal * 100;


    if (gameTotal < 10) {
        $("#score .warning").html("<p>You've only played <strong>" + gameTotal + " " + timePlural(gameTotal) + "</strong>. You must play at least <strong>10 times</strong>.</p>");
    } 
    else {
        if (stickTotal < 3) {
            $("#stickscore>div").html("<p>You've chosen to switch a lot, try sticking a few times</p>");
            $("#switchscore>div").html("<h5>Won</h5> <p><strong>" + stickScore + "</strong> <span>out of</span> <strong>" + stickTotal + "</strong></p><p> That's <strong>" + Math.round(stickWinPercent) + "%</strong> of the time.</p>");
        }
        else if (switchTotal < 3) {
            $("#switchscore>div").html("<p>You've chosen to stick a lot, try switching a few times</p>");
            $("#stickscore>div").html("<h5>Won</h5> <p><strong>" + stickScore + "</strong> <span>out of</span> <strong>" + stickTotal + "</strong></p><p> That's <strong>" + Math.round(stickWinPercent) + "%</strong> of the time.</p>");
        }
        else {
        $("#stickscore>div").html("<h5>Won</h5> <p><strong>" + stickScore + "</strong> <span>out of</span> <strong>" + stickTotal + "</strong></p><p> That's <strong>" + Math.round(stickWinPercent) + "%</strong> of the time.</p>");
        $("#switchscore>div").html("<h5>Won</h5> <p><strong>" + switchScore + "</strong> <span>out of</span> <strong>" + switchTotal + "</strong></p><p> That's <strong>" + Math.round(switchWinPercent) + "%</strong> of the time.</p>");
        $("#otherstats").show().html("<p>If you had switched for every game you would have won " + overallSwitchWin + " times.<br> If you had stuck every time you would have won " + overallStickWin + " times.</p>");
        }
    }
    if (gameTotal >= 10) {
        $("#score>div").show();
        $("#score .warning").hide();
        console.log(switchTotalPercent);
    }

}//end appendScore

function beginGame() {
    $(".doors").click(function() {
        $(".doorholder").removeClass("begin");
        $(this).addClass("selected");
        var doorSelection = $(this).attr("id");
        var doorSelectionReadable = returnDoors("getID", doorSelection, "readable");
        var currentPrize = returnDoors("getID", doorSelection, "prize");
        var kittenDoor = returnDoors("prize", "kitten", "getID");
        var revealingTurnip = returnDoors("turnipReveal", true, "getID");
        editDoor("getID", doorSelection, "switchable", false);

        function selectedMessage (a) {
            var i = returnDoors("getID", a, "readable");
            $("#message").html("<p>You selected " + doorSelectionReadable + ". There is a turnip behind " + i + ". Will you <strong>switch</strong> or <strong>stick</strong> with your original choice?</p>").fadeIn();
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
    $("#buttons").delay(500).fadeOut();
    if (i === "won") {
        $("#message").html("<p>You " + j + " and won! Congratulations on finding the kitten.</p>");
    }
    else {
        $("#message").html("<p>You " + j + " and lost! Oh well, better luck next time.</p>");
    }
    $("#replay").fadeIn();
    $(".selected").addClass("complete");
    setTimeout(function() {
        revealAllDoors();
    }, 300);
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
    changeSelection();
    winLoseMessage("lost", "switched");
}
else {
    switchScore++;
    changeSelection();
    winLoseMessage("won", "switched");
}

appendScore();

});// end click
});

} // end beginGame

beginGame();



$("#replay > button").click(function() {
     $("#buttons > button").on("click");
    // appendScore();
    $(".doors, #message").fadeOut(300).fadeIn(600);
    setTimeout(function() {
        $(".doors").removeClass("kitten turnip selected complete");
        $(".doorholder").addClass("begin");
        $("#message").html("<p>Pick another door to play again!</p>");
    }, 300);
    $("#replay").hide();
    prizeReset();
    prizeSelector();
    $(".doors").on("click", beginGame());
});

}); // end ready.