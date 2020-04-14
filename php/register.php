<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'INSERT INTO user (userName, password, mail, svgHat, colorHat, userScore, lat, lng, online) 
                        VALUES (?,?,?,"","",0,0,0,"")';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['username']);
$sql->bindParam(2, $_GET['password']);
$sql->bindParam(3, $_GET['mail']);
$sql->execute();

echo $_GET['username'];
?>