var playerTurnOver,gameOver = false;
var opponentTurnOver = true;
var opponentCardArray = [[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""], [0, 0, "<i class='fas fa-", " fa-10x'></i>","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""]];
var playerCardArray = [[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""]];
var iconArray = ['ghost','meteor','fire','user-graduate','bolt']
var deathIcon = 'skull-crossbones';
var score = 0;
var wins = 0;
var losses = 0;
var playerHealth = 0;
var opponentHealth= 0;
var attackDefendButtonRef= document.getElementById("attack-defend");
var playerScoreRef= document.getElementById("player-score");
var playerWinsRef = document.getElementById("wins");
var playerLossesRef = document.getElementById("losses");
var playAreaRef = document.getElementById("play-area");
var healthAreaRef = document.getElementById("health");
var playerHealthRef = document.getElementById("player-health");
var opponentHealthRef = document.getElementById("opponent-health");
var playerCardsRef = document.getElementById("player-cards");
var opponentCardsRef = document.getElementById("opponent-cards");

function getRandomColor() {
	var letters = "0123456789abcdef";
	var result = "#";
	for (var i = 0; i<6; i++) {
		result += letters.charAt(parseInt(Math.random() * letters.length));
	}
	return result;
}

function initializeGame() {
    playerHealth = 100;
    opponentHealth = 100;
    playerScoreRef.innerHTML = "Score: " + score;
    for (var i=0; i < opponentCardArray.length; i++) {
        var card = opponentCardArray[i];
        
        var damage = parseInt(Math.random() * 6) + 1;
        var health = 10-damage;
        card[0] = damage;
        card[1] = health;
        randomColor = getRandomColor();
        card[4] = randomColor;
        randomIcon = iconArray[parseInt(Math.random() * iconArray.length)];
        card[5] = randomIcon;
        

        opponentCardsRef.innerHTML += "<div class='card' style='color:" + randomColor + "'> <div class='container'> <h1 class='damage'>" 
        + damage + "</h1><h1 class='health'>" + health + "</h1> <div class='image'>" + card[2] +
        card[5] + card[3] + "</div></div></div>";
        }

    for (var i=0; i < playerCardArray.length; i++) {
        var card = playerCardArray[i];

        var damage = parseInt(Math.random() * 6) + 1;
        var health = 10-damage;
        card[0] = damage;
        card[1] = health;
        randomColor = getRandomColor();
        card[4] = randomColor;
        randomIcon = iconArray[parseInt(Math.random() * iconArray.length)];
        card[5] = randomIcon;
        

        playerCardsRef.innerHTML += "<div class='card' style='color:" + randomColor + "'> <div class='container'> <h1 class='damage'>" 
        + damage + "</h1><h1 class='health'>" + health + "</h1> <div class='image'>" + card[2] +
        card[5] + card[3] + "</div></div></div>";
        }
}

var round = 1;
var inPlayerTurn = true;
var inOpponentTurn = false;

function gameLoop() {
    if (!gameOver) {
        if(!inPlayerTurn) {
            playerTurn();
        }
        else if(!inOpponentTurn) {
            opponentTurn();
        }

    }
}
function opponentTurn(){
    playerScoreRef.innerHTML = "Opponent Turn... ready to defend against opponents attack?";
    attackDefendButtonRef.innerHTML = "Defend!"

}
function playerTurn(){
    playerScoreRef.innerHTML = "Player's Turn... ready to attack opponent?";
    attackDefendButtonRef.innerHTML = "Attack!"

}
function startTurn(){
    cardBattle();
    refreshCards();
    refreshHealth();
    inOpponentTurn = !inOpponentTurn; 
    inPlayerTurn = !inPlayerTurn;
}
function refreshHealth(){
    playerHealthRef.innerHTML = "Player Health: " + playerHealth;
    opponentHealthRef.innerHTML = "Opponent Health: " + opponentHealth;
}
function refreshCards(){
    playerCardsRef = document.getElementById("player-cards");
    playerCardsRef.innerHTML = "";
    opponentCardsRef = document.getElementById("opponent-cards");
    opponentCardsRef.innerHTML = "";
    for (var i=0; i < opponentCardArray.length; i++) {
        var card = opponentCardArray[i];
        opponentCardsRef.innerHTML += "<div class='card' style='color:" + card[4] + "'> <div class='container'> <h1 class='damage'>" 
        + card[0]+ "</h1><h1 class='health'>" + card[1] + "</h1> <div class='image'>" + card[2] +
        card[5] + card[3] + "</div></div></div>";
        }
    
    for (var i=0; i < playerCardArray.length; i++) {
        var card = playerCardArray[i];
        playerCardsRef.innerHTML += "<div class='card' style='color:" + card[4] + "'> <div class='container'> <h1 class='damage'>" 
        + card[0]+ "</h1><h1 class='health'>" + card[1] + "</h1> <div class='image'>" + card[2] +
        card[5] + card[3] + "</div></div></div>";
        }
}
function cardBattle(){
    for (var i = 0; i<playerCardArray.length; i++) {
          opponentCardArray[i][1] -= playerCardArray[i][0];
          playerCardArray[i][1] -= opponentCardArray[i][0];
          if (opponentCardArray[i][1] < 1){
            opponentHealth += opponentCardArray[i][1];
          }
          if(playerCardArray[i][1]<1) {
              playerHealth += playerCardArray[i][1];
          }
        
        
    }
}
initializeGame();
var game = setInterval(gameLoop,100);
