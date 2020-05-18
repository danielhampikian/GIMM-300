var playerTurnOver,gameOver = false;
var opponentTurnOver = true;
var opponentCardArray = [[0, 0, "<i class='fas fa-", " fa-10x'></i>","","",""], [0, 0, "<i class='fas fa-", " fa-10x'></i>","","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","","",""]];
var playerCardArray = [[0, 0, "<i class='fas fa-", " fa-10x'></i>","","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","","",""]];
var iconArray = ['ghost','meteor','fire','user-graduate','bolt']
var deathIcon = 'skull-crossbones';
var score = 0;
var wins = 0;
var losses = 0;
var playerHealth = 0;
var opponentHealth= 0;
var cards;
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


var modalRef = document.getElementById("game-modal");
var cardUpgradeRef = document.getElementById("card-upgrade");
var modalHeaderRef = document.getElementById("modal-head");
var modalFooterRef = document.getElementById("modal-foot");
var modalInfoRef = document.getElementById("modal-info");
var modalTitleRef = document.getElementById("modal-title");
var spanRef = document.getElementsByClassName("close")[0];
var firstTurn=true;
var inPlayerTurn = true;
var inOpponentTurn = false;

// When the user clicks on <span> (x), close the modal
spanRef.onclick = function() {
    modalRef.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalRef) {
      modalRef.style.display = "none";
    }
  }

function showModal(title, info){
    modalRef.style.display = "block";
    modalHeaderRef.innerHTML = "Opponent Health: " + opponentHealth;
    modalFooterRef.innerHTML = "Your Health: " + playerHealth;
    modalInfoRef.innerHTML = info;
    modalTitleRef.innerHTML = title;
}

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
        card[6] = "enemyCard"+i;

        opponentCardsRef.innerHTML += "<div class='card opponentCard' id='opponentCard" + i + "' style='color:" + randomColor + "'> <div class='container'> <h1 class='damage'>" 
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
        card[6] = "playerCard" + i;

        playerCardsRef.innerHTML += "<div class='card playerCard' id='playerCard" + i + "' style='color:" + randomColor + "'> <div class='container'> <h1 class='damage'>" 
        + damage + "</h1><h1 class='health'>" + health + "</h1> <div class='image'>" + card[2] +
        card[5] + card[3] + "</div></div></div>";
        }
    }



    function addListeners() {
        cards = document.getElementsByClassName("card");
        cardsHealth = document.getElementsByClassName("health");
        cardsDamage = document.getElementsByClassName("damage");
        for (var i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', {
                handleEvent(event) {
                    console.log("event type is: " + event.type + " calling revive card and passing in param " + event.currentTarget.id);
                    focusOnCard(event.currentTarget);
                }
            });
        }
    }

function focusOnCard(cardID){
showModal("Upgrade or Revive a Card","Click on a single button to upgrade or revive")
cardUpgradeRef.style.display = "block";
}
function upgradeAttack(){
    modalRef.style.display = "none";
}
function upgradeHealth(){
    modalRef.style.display = "none";
}
function revive(){
    modalRef.style.display = "none";
}

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
    if(firstTurn){
        showModal("Click a card to upgrade or revive", "Don't forget each time you are ready to attack to first click on card you want to upgrade or revive to open the upgrade or revive options");
        firstTurn = false;
    }
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
            opponentCardArray[i][5] = deathIcon;
            opponentHealth += opponentCardArray[i][1];
          }
          if(playerCardArray[i][1]<1) {
              playerHealth += playerCardArray[i][1];
              playerCardArray[i][5] = deathIcon;
          }
    }
    if(playerHealth<0 && opponentHealth >0){
        gameOver = true;
        showModal("You lost!","Refresh your browser to play again.");
    }
    else if(opponentHealth<0 && playerHealth>0) {
        gameOver = true
        showModal("You won!","Refresh your browser to play again.");
    }
    else if (opponentHealth<0 && playerHealthRef < 0){
        gameOver = true;
        showModal("It was a tie, both players died!","Refresh your browser to play again");
    }
}
initializeGame();
addListeners();
showModal("How to Play", "You play this game by attacking and defending with the button at the bottom of the screen until your opponents health is 0 or less.  The cards attack each other and if your card is dead you can revive it, otherwise it's health is subtracted each turn from total health.  To revive a card, or to upgrade its health or attack power, click on the card.  You can do one upgrade or revive per turn, choose wisely. Close this window and click the button at the bottom to begin by defending against an enemy attack");
var game = setInterval(gameLoop,100);
