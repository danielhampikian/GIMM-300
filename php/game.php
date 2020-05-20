<!doctype html>
<html>
<head>
	<title>Game</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="https://kit.fontawesome.com/cd6864276f.js" crossorigin="anonymous"></script>
</head>

<body>
<?php
  $current_page = "game";
  require_once('nav.php');
  print($current_page);
?>
    <div id="score">
        <div class="center">
        <h1 class="info" id=player-score>Player Info</h1>
        <h2 class="info"id="player-health"></h2>
        <h2 class="info"id="opponent-health"></h2>
    </div>
        
    </div>
    
    <div id="play-area">
        <div id="opponent-cards">
        </div>
        <div id="player-cards">
        </div>
        <button id="attack-defend" onclick="startTurn()">Attack</button>
    </div>
    
    <!-- modal -->
    <div id="game-modal" class="modal">

    <!-- content -->
    <div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2 id="modal-head"></h2>
      </div>
      <div class="modal-body">
        <p id="modal-title"></p>
        <p id=modal-info></p>
        <div id="card-upgrade" class="card-focus">
            <div id=current-card></div>
            <button id="upgrade-attack" onclick="upgradeHealth()">+5/-5 Health</button>
            <button id="upgrade-health" onclick="upgradeAttack()">+5/-5 Attack</button>
            <button id="revive" onclick="revive()">Revive</button>
        </div>
      </div>
      <div class="modal-footer">
        <h3 id="modal-foot"></h3>
      </div>
    </div>
  
    </div>


	<?php
  	require('footer.php');
	?>
<script src="game.js"></script>
</body>
</html>