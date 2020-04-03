<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'INSERT INTO user (userName, password, svgHat, colorHat, userScore) 
                        VALUES (?,?,"","",0)';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['username']);
$sql->bindParam(2, $_GET['password']);
$sql->execute();

echo $_GET['username'];
?>