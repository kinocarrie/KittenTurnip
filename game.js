 $(document).ready(function() {

        var doorOne = "turnip";
        var doorTwo = "turnip";
        var doorThree = "turnip";

        var kittenSelector = Math.random();
        var turnipSelector = Math.random();

        var randomKitten = function() {
            if (kittenSelector <= 0.33333333) {
                doorOne = "kitten";
            } else if (kittenSelector > 0.66666666) {
                doorThree = "kitten";
            } else {
                doorTwo = "kitten";
            };
        };

        var stickWon = 0;
        var stickLost = 0;
        var switchWon = 0;
        var switchLost = 0;

        var printSwitchScores = function() {
            var switchTotal = switchWon + switchLost;
            var switchWinPercent = switchWon / switchTotal * 100;
            if (switchTotal < 10) {
                $(".switchScore").html("You have switched " + switchTotal + " times. You must switch in the game 10 times before you can see the score.");
            }
            else {
                $(".switchScore").html("You have switched " + switchTotal + " times. You won " + switchWon + " times.<br>You won " + Math.round(switchWinPercent) + "% of the time when you switched.");
            }
        };

        var printStickScores = function() {
            var stickTotal = stickWon + stickLost;
            var stickWinPercent = stickWon / stickTotal * 100;
            if (stickTotal < 10) {
                $(".stickScore").html("You have stuck " + stickTotal + " times. You must stick in the game 10 times before you can see the score.");
            }
            else {
                $(".stickScore").html("You have stuck " + stickTotal + " times. You won " + stickWon + " times.<br>You won " + Math.round(stickWinPercent) + "% of the time when you stuck.");
            }
        };

        var loadGame = function() {

            var turnipReveal;
            var foundTurnip;

            randomKitten();

            var removeMessage = function() {
                $("#switchmessage").remove();
            };

            var reloadGame = function() {
                removeMessage();
                $(".doors>div").on("click", singleGame());
                $(".doors img").delay( 1000 ).fadeOut( 800 )
                setTimeout(function(){
                $(".doors img").remove();
                }, 1800);
                $(".selectedDoor").removeClass("selectedDoor");
                $(".turnipone").removeClass("turnipone");
            };

            var kittenDoor = function() {
                        if (doorOne == "kitten") {
                            $("#doorOne").addClass("kitten").prepend("<img src='kotkitten.jpg' class='kittenimg'>");
                            if (turnipReveal == "Door Two") {
                                $("#doorThree").addClass("turniptwo").prepend("<img src='kotturnip.jpg' class='turnipimg'>");
                            }
                            else {
                                $("#doorTwo").addClass("turniptwo").prepend("<img src='kotturnip.jpg' class='turnipimg'>");
                            }
                        }
                        else if (doorTwo == "kitten") {
                            $("#doorTwo").addClass("kitten").prepend("<img src='kotkitten.jpg' class='kittenimg'>");
                            if (turnipReveal == "Door Three") {
                                $("#doorOne").addClass("turniptwo").prepend("<img src='kotturnip.jpg' class='turnipimg'>");
                            }
                            else {
                                $("#doorThree").addClass("turniptwo").prepend("<img src='kotturnip.jpg' class='turnipimg'>");
                            }
                        }
                        else {
                            $("#doorThree").addClass("kitten").prepend("<img src='kotkitten.jpg' class='kittenimg'>");
                            if (turnipReveal == "Door One") {
                                $("#doorTwo").addClass("turniptwo").prepend("<img src='kotturnip.jpg' class='turnipimg'>");
                            }
                            else {
                                $("#doorOne").addClass("turniptwo").prepend("<img src='kotturnip.jpg' class='turnipimg'>");
                            }
                        }
                    };

            var switchStick = function () {
                $("#switch").click( function() {
                    if (foundTurnip == true) {
                        alert("You made the right choice by switching! YOU FOUND THE KITTEN!");
                        switchWon++;
                    }
                    else {
                        alert("You should not have switched, you got stuck with the turnip!");
                        switchLost++;
                    }
                    kittenDoor();
                    printSwitchScores();
                    reloadGame();
                });
                $("#stick").click( function() {
                    if (foundTurnip == true) {
                        alert("You stuck to your guns, and guess what, you won the sodding turnip!");
                        stickLost++;
                    }
                    else {
                        alert("Oh look, you had the kitten all along! Well done, now take him home and give him love.");
                        stickWon++;
                    }
                    kittenDoor();
                    printStickScores();
                    reloadGame();
                });
            }

            var singleGame = function() {

                doorOne = "turnip";
                doorTwo = "turnip";
                doorThree = "turnip";
                kittenSelector = Math.random();
                turnipSelector = Math.random();
                randomKitten();

                $(".doors>div").click(function() {

                    $(".doors>div").off("click");

                    var userSelection = $( this ).attr("id");
                    var doorSelected = "";
                    var makeReadable = function() {
                        if (userSelection == "doorOne") {
                            doorSelected = "Door One";
                        }
                        else if (userSelection == "doorTwo") {
                            doorSelected = "Door Two";
                        }
                        else {
                            doorSelected = "Door Three";
                        }
                    };
                    makeReadable();
                    var ssMessage = function() {
                        $(".doors").after("<div id='switchmessage'>You selected " + doorSelected + ". There is a turnip behind " + turnipReveal + ". Would you like to STICK or SWITCH? <button id='stick'>STICK!</button> or <button id='switch'>SWITCH!</button></div>");
                    };

                    var highlightSelection = function(doorId) {
                        $(doorId).addClass("selectedDoor");
                    };

                    var turnipDoor = function(doorId) {
                        $(doorId).addClass("turnipone").prepend("<img src='kotturnip.jpg' class='turnipimg'>");
                    };


                    if ( userSelection == "doorOne") {
                        highlightSelection("#doorOne");
                      if (doorOne == "turnip") {
                        foundTurnip = true;
                        if (doorTwo == "turnip") {
                            turnipReveal = "Door Two";
                            turnipDoor("#doorTwo");
                        }
                        else {
                            turnipReveal = "Door Three";
                            turnipDoor("#doorThree");
                        }
                    }
                    else {
                        foundTurnip = false;
                        if (turnipSelector <= 0.5) {
                            turnipReveal = "Door Two";
                            turnipDoor("#doorTwo");
                        }
                        else {
                            turnipReveal = "Door Three";
                            turnipDoor("#doorThree");
                        }
                    }
                } 
                else if (userSelection == "doorTwo") {
                    highlightSelection("#doorTwo");
                   if (doorTwo == "turnip") {
                    foundTurnip = true;
                    if (doorOne == "turnip") {
                     turnipReveal = "Door One";
                     turnipDoor("#doorOne");
                 }
                 else {
                     turnipReveal = "Door Three";
                     turnipDoor("#doorThree");
                 }
             }
             else {
                foundTurnip = false;
                if (turnipSelector <= 0.5) {
                    turnipReveal = "Door One";
                    turnipDoor("#doorOne");
                }
                else {
                    turnipReveal = "Door Three";
                    turnipDoor("#doorThree");
                }
            }
        }
        else {
            highlightSelection("#doorThree");
           if (doorThree == "turnip") {
            foundTurnip = true;
            if (doorOne == "turnip") {
             turnipReveal = "Door One";
             turnipDoor("#doorOne");
         }
         else {
             turnipReveal = "Door Two";
             turnipDoor("#doorTwo");
         }
     }
     else {
        foundTurnip = false;
        if (turnipSelector <= 0.5) {
            turnipReveal = "Door One";
            turnipDoor("#doorOne");
        }
        else {
            turnipReveal = "Door Two";
            turnipDoor("#doorTwo");
        }
    }
}
ssMessage();

switchStick();

return false;

});
};

singleGame();

};

loadGame();

});