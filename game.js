//Button colors
const buttonColors = ["red", "blue", "green", "yellow"];

//Rng computer pattern
var gamePattern = [];

//User pattern selections
var userClickedPattern = [];

//Starting game
var gameActive = false;
var level = 0;
var clicksLeft = 1;
//Start game keyboard input
$(document).keydown(function(){
  if (gameActive === false){
    gameActive = true;
    nextSequence();
    $(".clickCounter").removeClass("invisible");
  }
});

//Random number starting sequence
function nextSequence(){
  //Restart player selections
  userClickedPattern = [];

  ++level;
  $("#level-title").text("Level "+level);

  clicksLeft = gamePattern.length + 1;
  $(".clickCounter").text("Clicks Left: "+clicksLeft);

  var randomNumber = Math.floor(Math.random()*4);

  //Selecting color from buttonColors based off random number
  var randomChosenColor = buttonColors[randomNumber];

  //Add color to pattern array
  gamePattern.push(randomChosenColor);

  //Button animation and sound for colors in pattern
  var delay = 500;
  gamePattern.forEach(function(color){
    setTimeout(function(){
      $("."+color).fadeOut(100).fadeIn(100);
      playSound(color);
    },delay);
    delay += 500;
  })
}

//Player clicks button
$(".btn").click(function(event){
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

  clicksLeft--;
  $(".clickCounter").text("Clicks Left: "+clicksLeft);
});

//Audio from sounds file
var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");
function playSound(name){
  window[name].play();
}

//Press animation for user clicks
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(index){
  if(userClickedPattern[index] === gamePattern[index]){
    //Check if player has finished their sequence
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    playSound("wrong");

    //Red background animation
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100);

    //Game ended
    $("#level-title").text("Game over. Press any key to restart");
    restartGame();
    $(".clickCounter").addClass("invisible");

  }
}

function restartGame(){
  gameActive = false;
  gamePattern = [];
  level = 0;
}
