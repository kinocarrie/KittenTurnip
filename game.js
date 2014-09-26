$(function() { 

$("#buttons, #replay, #score>div, #switchscore .scorebar, #stickscore .scorebar").hide();
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
}];

var switchScore = 0;
var switchLost = 0;
var stickScore = 0;
var stickLost = 0;
var gameTotal = 0;
var kittenSelector = Math.random();
var turnipSelector = Math.random();

function wordPlural(i, j, k) {
            if (i == 1) {
                return (j)    
                }
            else {
                return (k)  
            }
        };//end wordPlural

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
    }; //end prizeReset

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
    // var overallStickWin = stickScore + switchLost;
    var overallSwitchWin = switchScore + stickLost;
    var switchTotalPercent = (switchScore + stickLost) / gameTotal * 100;
    var stickWinPercent = stickScore / stickTotal * 100;
    var switchWinPercent = switchScore / switchTotal * 100;

    function goodBadResults() {
        if (switchTotalPercent < 50 && gameTotal > 30) {
            return "<strong>Wow, you've had really bad luck!<strong> Sometimes that's life. Thankfully you can refresh the game and play again, cross your fingers you won't be so unlucky next time.";
        }
        else if (switchTotalPercent < 50) {
            return "Sometimes luck isn't on your side and it can ruin your results. The more you play, the better your results should be. <strong>Try playing at least 30 games for better results</strong>.";
        }
        else if (switchTotalPercent < 60) {
            return "<strong>Keep on playing</strong>, you've had some bad luck, but the more you play the better the results will be.";
        }
        else {
            return "<strong>These are some pretty good results!</strong> You can keep playing if you want, but I hope you can see how your chances are improved by switching doors instead of sticking with your first choice.";
        }
    }//end goodBadResults

    if (gameTotal < 10) {
        $("#score .warning").html("<p>You've only played <strong>" + gameTotal + " " + wordPlural(gameTotal, "time", "times") + "</strong>. You must play at least <strong>10 times</strong>.</p>");
    } 
    else {
        if (stickTotal < 3) {
            $("#switchscore .scorebar").show();
            $("#stickscore .scoredetails").html("<p class='smaller'>You've chosen to switch a lot, try sticking a few times</p>");
            $("#switchscore .scoredetails").html("<h5>Won</h5> <p><strong>" + switchScore + "</strong> <span>out of</span> <strong>" + switchTotal + "</strong></p><p> That's <strong>" + Math.round(switchWinPercent) + "%</strong> of the time</p>");
        }
        else if (switchTotal < 3) {
            $("#stickscore .scorebar").show();
            $("#switchscore .scoredetails").html("<p class='smaller'>You've chosen to stick a lot, try switching a few times</p>");
            $("#stickscore .scoredetails").html("<h5>Won</h5> <p><strong>" + stickScore + "</strong> <span>out of</span> <strong>" + stickTotal + "</strong></p><p> That's <strong>" + Math.round(stickWinPercent) + "%</strong> of the time</p>");
        }
        else {
            $("#switchscore .scorebar, #stickscore .scorebar").show();
        $("#stickscore .scoredetails").html("<h5>Won</h5> <p><strong>" + stickScore + "</strong> <span>out of</span> <strong>" + stickTotal + "</strong></p><p> That's <strong>" + Math.round(stickWinPercent) + "%</strong> of the time</p>");
        $("#switchscore .scoredetails").html("<h5>Won</h5> <p><strong>" + switchScore + "</strong> <span>out of</span> <strong>" + switchTotal + "</strong></p><p> That's <strong>" + Math.round(switchWinPercent) + "%</strong> of the time</p>");
        $("#otherstats").show().html("<p>If you had switched for every game you would have won <strong>" + Math.round(switchTotalPercent) + "%</strong> of the time.</p><p>" + goodBadResults() + "</p>");
        }
    } // end if
    if (gameTotal >= 10) {
        $("#score>div").show();
        $("#score .warning").hide();
        $("#switchscore .scorebar>div").css("width", Math.round(switchWinPercent) + "%");
        $("#stickscore .scorebar>div").css("width", Math.round(stickWinPercent) + "%");
        $(".finalpercent p").html("<strong>" + Math.round(switchTotalPercent) + "%</strong> if you always switched");
        $(".finalpercent .finalpercentbar").css("height", Math.round(switchTotalPercent) + "%");
    } //end if

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
            $("#message").html("<p>You selected <strong>" + doorSelectionReadable.toLowerCase() + "</strong>. There is a turnip behind <strong>" + i.toLowerCase() + "</strong>. Will you <strong>switch</strong> or <strong>stick</strong> with your original choice?</p>").fadeIn();
            $("#buttons").fadeIn();
            $("#" + a).addClass("turnip");
        } // end selectedMessagge

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
        }// end if

$("#buttons > button").click(function() {
     $("#buttons > button").off("click");

    var buttonClicked = $(this).attr("id");

function winLoseMessage(i, j) {
    $("#buttons").delay(300).fadeOut('fast');
    if (i === "won") {
        $("#message").html("<p><strong>You " + j + " and won!</strong> Congratulations on finding the kitten.</p>");
    }
    else {
        $("#message").html("<p><strong>You " + j + " and lost!</strong> Oh well, better luck next time.</p>");
    }
    $("#replay").fadeIn();
    $(".selected").addClass("complete");
    setTimeout(function() {
        revealAllDoors();
    }, 300);
}// end winLoseMessage

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
} // end if

appendScore();

});// end click stick/switch
});// end click doors

} // end beginGame

beginGame();

$("#replay > button").click(function() {
     $("#buttons > button").on("click");
    // appendScore();
    $(".doors, #message").delay(100).fadeOut(300).fadeIn(600);
    setTimeout(function() {
        $(".doors").removeClass("kitten turnip selected complete");
        $(".doorholder").addClass("begin");
        $("#message").html("<p class='arrow'>Pick another door to play again!</p>");
    }, 400);
    $("#replay").fadeOut(400);
    prizeReset();
    prizeSelector();
    $(".doors").on("click", beginGame());
});//end replay click

}); // end ready.