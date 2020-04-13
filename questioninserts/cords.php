<?php

include('connectToDB.php');

$pdo = connectDB();
$query = 'INSERT INTO question (`lat`, `long`, `qString`, `alt1`, `alt2` , `alt3` , `alt4` , `score`) VALUES (? ,? , "" , "" ,"" ,"" ,"" , 0 )';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['long']);
$sql->bindParam(2, $_GET['lat']);
$sql->execute();

?>