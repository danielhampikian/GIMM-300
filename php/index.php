<!doctype html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<title>Home</title>
</head>

<body>
<?php
  $current_page = "home";
  require('nav.php');
  print($current_page);
?>
	<h1 class="info">HI</h1>
	<?php
  	require('footer.php');
	?>
</body>
</html>