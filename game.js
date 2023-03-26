var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + level);
}
function addMusicAndAnimation() { // on button clicks
    for (var index = 0; index < 4; index++) {
        let color = buttonColours[index];
        let elem = "#" + color;
        $(elem).on("click", function () {
            $(elem).fadeOut(100).fadeIn(100);
            animatePress(color);
            playSound(color);
        });
    }
}

function animatePress(currentColour) {
    let elem = "#" + currentColour;
    $(elem).addClass("pressed");
    setTimeout(function () {
        $(elem).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function (event) {
    if (started) {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    }
    else{
        gameOver();
    }
});
addMusicAndAnimation();

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
        gameOver();
    }
    else{
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
}

function gameOver(){
    level=0;
    started= false;
    gamePattern = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
}

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});