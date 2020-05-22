<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'UPDATE user SET userScore = userScore + ? where user.userId = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['score']);
$sql->bindParam(2, $_GET['userId']);
$sql->execute();

?>