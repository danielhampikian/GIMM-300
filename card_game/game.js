var opponentCardArray = [[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""], [0, 0, "<i class='fas fa-", " fa-10x'></i>","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""]];
var playerCardArray = [[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""],[0, 0, "<i class='fas fa-", " fa-10x'></i>","",""]];
var iconArray = ['ghost','meteor','fire','user-graduate','bolt']
var deathIcon = 'skull-crossbones';
var score = 0;
var wins = 0;
var losses = 0;
var playerHealth = 0;
var enemyHealth= 0;
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
    playerWinsRef.innerHTML = "Wins: " + wins;
    playerLossesRef.innerHTML ="Losses: " + losses;
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
initializeGame();