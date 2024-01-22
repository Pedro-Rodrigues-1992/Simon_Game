var buttonColour =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;

$(document).one("keydown", function(){
    $("#level-title").text("level " + level);
    
    nextSequence();
});


function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColour[randomNumber]
    gamePattern.push(randomChosenColour)
    
    // changed this part so it only plays once when the function playSequence is working
    // $("#"+randomChosenColour).fadeIn(75).fadeOut(75).fadeIn(75);
    // playSound(randomChosenColour)
    level++
    $("#level-title").text("level " + level);
    playSequence(gamePattern)
}

function playSequence(pattern){
    for (i=0; i<pattern.length; i++){
        setTimeout(function(colour){
        $("#"+colour).fadeIn(75).fadeOut(75).fadeIn(75);
        playSound(colour);
        }, 500*i, pattern[i]);
}}


$(".btn").click(function(){

    var userChosenColour=($(this).attr('id'))
    userClickedPattern.push(userChosenColour)
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswear();  
});

function playSound(name){
    var audio= new Audio('./sounds/' + name + '.mp3');
    audio.play();
};

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function checkAnswear(currentLevel) {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            
            playSound("wrong");
            $("body").addClass("game-over");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);


            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();   
            return;
        
        }
    }

    if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(document).one("keypress", function () {
        $("#level-title").text("Level " + level);
        nextSequence();
    });
}