//global variables:
var pictureRef = "";
var topScoreDisplay;
var totalPlayerScore = 0;
var totalComputerScore = 0;
var numArray = [1,1,1,1,1,1];
var playerS = 6;
var computerS = 0;
var rollLoss = 0;
var rollsLeft = 10;
var rounds = 10;
var lastRoll = 0;
var clicked = false;
var gameOver = false;
var playerScoreDisp;
var computerScoreDisp;
var roundDisp;
var rollsLeftDisp;
var intID;
var currentCubeClass = '';
var playerLastTotal = 0;

//gets called as soon as the window loads, adds event listeners to the dice
window.onload = function() {
  for(var i = 1; i <= 6; i++){
    var idName = 'placeholder'
    idName = idName + i;
    elem = document.getElementById(idName);

    elem.addEventListener('mousedown', {
        handleEvent(event) {
          //console.log("event type is: " + event.type);
          rolling(event.currentTarget.id);
        }
    });

    elem.addEventListener('mouseup', {
      handleEvent(event) {
        //console.log("event type is: " + event.type);
        rollEnd(event.currentTarget.id);
        }
    });

    elem.addEventListener('mouseleave', {
    handleEvent(event) {
      //console.log("event type is: " + event.type);
      mouseLeft(event.currentTarget.id);
        }
    });
  }

  //get references to the score and rounds displays
  this.getReferences();
};

function rolling(eID){
    console.log("rolling: " + eID);
    intID = setInterval(rotateCube,100,eID);
    clicked = true;
}
function rollEnd(eID){
  clicked = false;
  console.log("unclicked: " + eID + " num to index is: " + parseInt(eID.substring(eID.length - 1)));
  clearInterval(intID);
  rollDie(eID, parseInt(eID.substring(eID.length - 1)));
}
function mouseLeft(eID){
  if(clicked) {
  console.log("mouse left: " + eID);
  clearInterval(intID);
  rollEnd(eID);
  }
  clicked = false;

}

//rotates cubes by adding and removing classes that contain the animation and xyz rotation of the cube faces
function rotateCube(eID){
  var cube = document.getElementById(eID);
  //console.log(cube.classList);
  var showClass = 'show-' + getNextNumber();
  var cubeClass = 'cube';
  if ( currentCubeClass ) {
    cube.classList.remove( currentCubeClass );
  }
  cube.classList.add(cubeClass);
  cube.classList.add(showClass);
  currentCubeClass = showClass;
}

function restart(){
totalPlayerScore = 0;
totalComputerScore = 0;
gameOver = false;
pictureRef = "";
rollLoss = 0;
computerS = 0;
rollsLeft = 10;
rounds = 10;
lastRoll = 0;
}

function roundLost() {
  if (rollsLeft <= 0 && playerS <= computerS){
    return true;
  }
  else return false;
}

function loadGame(){
  var best = Math.max(playerLastTotal, totalPlayerScore);
  playerLastTotal = best;
  if(gameOver){
    restart();
    }
  resetPlayerScore();
  resetDice();
  computerRoll();
  updateDisp();
}

function computerRoll(){
  var nextScore = 0;
  for (i = 0; i < 4 + rollLoss; i++) {
    nextScore += getNextNumber();
    }
  computerS = Math.max(computerS,nextScore);
  totalComputerScore += computerS;
}

function nextRound(){
  var roundL = roundLost();
  if(roundL){
    totalPlayerScore += playerS;
    gameOver = true;
    showModal("Nice Try, but you lost! Play again?", "Your total score was: " + totalPlayerScore + " to " + totalComputerScore);
  }
  else if (rollsLeft<=0){
    totalPlayerScore += playerS;
    rounds -= 1;
    rollLoss++;
    rollsLeft = 10-rollLoss;
    showModal("Good Job! Your total score is " + totalPlayerScore + "... play next round?", 
    "On round: " + (10-rounds) + ", you will have " + rollsLeft + " total rolls.");
  }
}

function resetPlayerScore(){
  playerS = 6;
  numArray = [1,1,1,1,1,1];
}

function showModal(modalTitle, info){
  document.getElementById("modalTitle").innerHTML = modalTitle;
  document.getElementById("runningPlayerScore").innerHTML = "Player score: " + playerS;
  document.getElementById("runningComputerScore").innerHTML = "Computer score: " + computerS;
  document.getElementById("additionalInfo").innerHTML = info;
  $("#modalDisp").modal({
    backdrop: 'static',
    keyboard: false
  });
}

function updateDisp(){
  playerScoreDisp.innerHTML = "Player Score: " + playerS;
  computerScoreDisp.innerHTML = "Computer Score: " + computerS;
  roundDisp.innerHTML = "Round: " + (10-rounds);
  rollsLeftDisp.innerHTML = "Rolls Left: " + rollsLeft;
  topScoreDisplay.innerHTML = "Top score: " + playerLastTotal;
}

function getReferences(){
  topScoreDisplay = document.getElementById("topScoreDisplay");
  playerScoreDisp = document.getElementById("playerScoreDisp");
  computerScoreDisp = document.getElementById("computerScoreDisp");
  roundDisp = document.getElementById("roundDisp");
  rollsLeftDisp = document.getElementById("rollsLeftDisp");
  showModal("Try to beat the computers roll.  Scores compared after all rolls are used.", "Each round you start with less total rolls");
}

function getNextNumber(){
  var nextNum = Math.floor(Math.random() * 6 + 1)
  return nextNum;
}


function getPlayerScore(){
  var sum = numArray.reduce(function(a, b){
    return a + b;
    }, 0);
  //console.log(sum);
  playerS = parseInt(sum);
}

function rollDie(placeholderID, indx)
{
  rollsLeft -= 1;
  var num = getNextNumber();
  numArray[indx] = num;
  var cube = document.getElementById(placeholderID);
  var showClass = 'show-' + num;
  var cubeClass = 'cube';
  if ( currentCubeClass ) {
    cube.classList.remove( currentCubeClass );
  }
  cube.classList.add(cubeClass);
  cube.classList.add(showClass);
  currentCubeClass = showClass;
  //document.getElementById(placeholderID).src = pictureRef;
  getPlayerScore();
  nextRound();
  updateDisp();
}

function resetDice(){
  for(var i = 1; i <= 6; i++){
    var idName = 'placeholder'
    idName = idName + i;
    var cube = document.getElementById(idName);
    cube.classList.remove(...cube.classList);
    var showClass = 'show-1';
    var cubeClass = 'cube';
    cube.classList.add(cubeClass);
    cube.classList.add(showClass);
    //document.getElementById(idName).src = "d1.png";
  }
}


//no longer used code that was useful in development:

// function roll(){
//   var num = getNextNumber();
//   var newRef = "";
//   switch(num){
//     case 1:
//       newRef= "d1.png";
//       break;
//     case 2:
//       newRef = "d2.png"
//       break;
//     case 3:
//       newRef = "d3.png"
//       break;
//     case 4:
//       newRef = "d4.png"
//       break;
//     case 5:
//       newRef = "d5.png"
//       break;
//     case 6:
//       newRef = "d6.png"
//       break;
//     default:
//       console.log("value of roll is invalid: " + num);
//   }
  
//   rollsLeft -= 1;
//   pictureRef = newRef;
//   return num;
// }

//rotateCube('placeholder1');
//for debugging check all values in a single string and log them:

// function logValues(){
//   var values = "picturRef: " + pictureRef +" topScoreDisplay " + topScoreDisplay.innerHTML
//   + " totalPlayerScore " + totalPlayerScore + " totalComputerScore " + totalComputerScore 
//   + " numArray " + numArray + " playerS " + playerS + " computerS " + computerS + " rollLoss "
//   + rollLoss + " rollsLeft " + rollsLeft + " rounds " + rounds + " lastRoll " + lastRoll 
//   + " gameOver " + gameOver + " playerScoreDisp " + playerScoreDisp.innerHTML + " computerScoreDisp "
//   + computerScoreDisp.innerHTML + " roundDisp " + roundDisp.innerHTML + " rollsLeftDisp " + rollsLeftDisp.innerHTML;
//   console.log(values);
//   }

//useful for testing interval changes before setting up the dice 3d:

// function changeImageRandom(idName) {
//   console.log("Change image random called");
//   var num = getNextNumber();
//   var srcRef = "d" + num + ".png";
//   document.getElementById(idName).src = srcRef;
// }
// function changeImage(idName, num) {
//   console.log("Change image called");
//   var srcRef = "d" + num + ".png";
//   document.getElementById(idName).src = srcRef;
// }