var gameOver = false;
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
var currentCardRef = document.getElementById("current-card");
var modalHeaderRef = document.getElementById("modal-head");
var modalFooterRef = document.getElementById("modal-foot");
var modalInfoRef = document.getElementById("modal-info");
var modalTitleRef = document.getElementById("modal-title");
var spanRef = document.getElementsByClassName("close")[0];
var currentCardRef = document.getElementById("current-card");
var currentCardInfo;
var currentCard;
var aiUpdated = false;
var turnNumber = 0;
var inPlayerTurn = false;


spanRef.onclick = function() {
    modalRef.style.display = "none";
}
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
                    focusOnCard(event.currentTarget.id);
                }
            });
            cardsHealth[i].addEventListener('click', {
                handleEvent(event) {
                    console.log("event type is: " + event.type + " calling update Health with " + event.currentTarget.id);
                    upgradeHealth(event.currentTarget.id);
                }
            });
            cardsDamage[i].addEventListener('click', {
                handleEvent(event) {
                    console.log("event type is: " + event.type + " calling update Attack with " + event.currentTarget.id);
                    upgradeAttack(event.currentTarget.id);
                }
            });
        }
    }

function focusOnCard(cardID){
showModal("Upgrade or Revive a Card","If it's your turn to attack, you can first click on a single button to upgrade or revive");
cardUpgradeRef.style.display = "block";

for (var i = 0; i < playerCardArray.length; i++){
    console.log("player card id: " +playerCardArray[i][6] );
    console.log("opponent card id: " +opponentCardArray[i][6] );

    if (playerCardArray[i][6]==cardID){
        currentCardInfo = playerCardArray[i];
        console.log("card info matched! player card");
        
    }
    else if (opponentCardArray[i][6]==cardID){
        currentCardInfo = opponentCardArray[i];
        console.log("card info matched! oppoenent card");
        
    }
}
currentCard = document.getElementById(cardID);
currentCardRef.innerHTML = currentCard.innerHTML;

}
function upgradeAttack(){
    if(inPlayerTurn) {
    if (currentCard.classList.contains("playerCard")) 
    {
        currentCardInfo[0]+=5;
    }
    else if (currentCard.classList.contains("enemyCard"))
    {
        currentCardInfo[0]-=5;
    }
    refreshCards();
    modalRef.style.display = "none";
}
    
}
function upgradeHealth(){
    if (inPlayerTurn) {
    if (currentCard.classList.contains("playerCard")) 
    {
        currentCardInfo[1]+=5;
    }
    else if (currentCard.classList.contains("enemyCard"))
    {
        currentCardInfo[1]-=5;
    }
    refreshCards();
    modalRef.style.display = "none";
}
}
function revive(){
    if(inPlayerTurn) {
    modalRef.style.display = "none";
    if (currentCard.classList.contains("playerCard")) 
    {
        var damage = parseInt(Math.random() * 6) + 1;
        var health = 10-damage;
        currentCardInfo[0]=damage;
        currentCardInfo[1]=health;
        var randomIcon = iconArray[parseInt(Math.random() * iconArray.length)];
        currentCardInfo[5] = randomIcon;
    }
    refreshCards();
    modalRef.style.display = "none";
}
}

function gameLoop() {
    if (!gameOver) {
        if(!inPlayerTurn) {
           opponentTurn();
        }
        else if(inPlayerTurn) {
            playerTurn();
        }

    }
}
function opponentTurn(){
    checkGameOver();
    var updateText = "";
        if(!aiUpdated) {
    updateText += opponentAI();
    aiUpdated = true;
    refreshCards();
    playerScoreRef.innerHTML = "Opponent turn: " + updateText;
    }
    attackDefendButtonRef.innerHTML = "Defend!"
}
function playerTurn(){
    checkGameOver();
    playerScoreRef.innerHTML = "Player's Turn: upgrade/revive then attack!";
    attackDefendButtonRef.innerHTML = "Attack!"
}
function opponentAI(){
    var retText = "ready to defend against opponents attack?";
    var cardRevive;
    var reviveCanidate = false;
    var cardUpgrade;
    var upgradeCanidate = false;
    var cardDowngrade;
    var downgradeCanidate = false;
    for(var i = 0; i< opponentCardArray.length; i++){
        if (opponentCardArray[i][1] < 1){
            cardRevive = opponentCardArray[i];
            reviveCanidate = true;
          }

        if(playerCardArray[i][1]<5) {
            cardDowngrade=playerCardArray[i];
            downgradeCanidate = true;
        }

        if(opponentCardArray[i][1]<5) {
            cardUpgrade = opponentCardArray[i];
            upgradeCanidate = true;
        }

    }
    var choice = parseInt(Math.random() * 6)+1;
    if (reviveCanidate && choice<=4) {
        var damage = parseInt(Math.random() * 6) + 1;
        var health = 10-damage;
        cardRevive[0]=damage;
        cardRevive[1]=health;
        var randomIcon = iconArray[parseInt(Math.random() * iconArray.length)];
        cardRevive[5] = randomIcon;
        retText = "chose to revive card";
    }

    if(upgradeCanidate && choice==5) {
        choice = parseInt(Math.random() * 2);
        if (choice==0) {
        cardUpgrade[0]+=5;
        }
        else if (choice==1) {
            cardUpgrade[1]+=5;
        }
        retText = "chose to upgrade card"
    }
    if(downgradeCanidate && choice==6) {
        choice = parseInt(Math.random() * 2);
        if (choice==0) {
        cardDowngrade[0]-=5;
        }
        else if (choice==1) {
            cardDowngrade[1]-=5;
        }
        retText = "chose to downgrade card"
    }
return retText;
}
function startTurn(){
    //we'll force a reload if the player keeps playing for whatever reason:
    if(gameOver){
        location.reload();
    }
    turnNumber++;
    cardBattle();
    refreshCards();
    //we only addListeners after the player takes a turn, preventing them from upgrading continously on the same turn
    addListeners();
    refreshHealth();
    inPlayerTurn = !inPlayerTurn;
    if(inPlayerTurn) {
        aiUpdated = false;
    }
    if(turnNumber==1){
        showModal("During your turn before you attack, click a card to upgrade, downgrade or revive, or you can directly upgrade by clicking on health or attack", "Don't forget each time you are ready to attack to first click on card you want to upgrade or revive to open the upgrade or revive options");
        cardUpgradeRef.style.display = "none";
    }
    console.log("And set playerTurn value to: " + inPlayerTurn)

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
    //don't forget to update this to reflect changes made to card array
    for (var i=0; i < opponentCardArray.length; i++) {
        var card = opponentCardArray[i];
        opponentCardsRef.innerHTML += "<div class='card opponentCard' id='" + card[6] + "' style='color:" + card[4] + "'> <div class='container'> <h1 class='damage'>" 
        + card[0]+ "</h1><h1 class='health'>" + card[1] + "</h1> <div class='image'>" + card[2] +
        card[5] + card[3] + "</div></div></div>";
        }
    //don't forget to update this to reflect changes made to card array
    for (var i=0; i < playerCardArray.length; i++) {
        var card = playerCardArray[i];
        playerCardsRef.innerHTML += "<div class='card playerCard' id='" + card[6] + "' style='color:" + card[4] + "'> <div class='container'> <h1 class='damage'>" 
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
    checkGameOver();
}
function checkGameOver() {
    if (playerHealth < 0 && opponentHealth > 0) {
        gameOver = true;
        showModal("You lost!", "Refresh your browser to play again.");
        cardUpgradeRef.style.display = "none";
    }
    else if (opponentHealth < 0 && playerHealth > 0) {
        gameOver = true;
        showModal("You won!", "Refresh your browser to play again.");
        cardUpgradeRef.style.display = "none";
    }
    else if (opponentHealth < 0 && playerHealthRef < 0) {
        gameOver = true;
        showModal("It was a tie, both players died!", "Refresh your browser to play again");
        cardUpgradeRef.style.display = "none";
    }
}
initializeGame();
addListeners();
showModal("How to Play", "You play this game by attacking and defending with the button at the bottom of the screen until your opponents health is 0 or less.  The cards attack each other and if your card is dead you can revive it, otherwise it's health is subtracted each turn from total health.  To revive a card, or to upgrade its health or attack power, click on the card.  You can do one upgrade or revive per turn, choose wisely. Close this window and click the button at the bottom to begin by defending against an enemy attack");
var game = setInterval(gameLoop,100);
