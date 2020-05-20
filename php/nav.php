<style>
  #current_page {
  text-decoration-color: #262626;
  text-decoration: underline;
}
.not_current_page {
text-decoration:none;
}
.topnav {
  overflow: hidden;
  padding: 20px;
  background-color: rgba(97, 95, 204, 0.1);

}

.topnav a {
  float: left;
  display: block;
  font-size: x-large;
  color: rgb(221, 137, 207);
  text-align:  center;
  padding: 10px;
  margin: 10px;
  border-color: skyblue;
  border: 2px solid rgb(246, 238, 238);
}
.topnav a:hover {
  color: black;
  background-color: rgb(221, 137, 207);

}
</style>
<div <?php echo 'class="topnav"';?>>
		<a <?php
		if($current_page == "home") 
		{ 
		echo 'id="current_page"';
		}
		else {
		echo 'class="not_current_page"';
		}
		?>
		href="index.php">home</a>
		<a <a <?php
		if($current_page == "game") 
		{ 
		echo 'id="current_page"';
		}
		else {
		echo 'class="not_current_page"';
		}
		?>href="game.php">game</a>
</div>
<?php 
if($current_page == "home") 
{ 
	echo "<h1 class='info'>Welcome to my home page</h1>";
	
}
else if ($current_page == "game")
{
	echo "<h1 class='info'>Ready to play?</h1>";
}
?>