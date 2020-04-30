<?php

include('connectToDB.php');

$pdo = connectDB();
$query = "INSERT INTO userplayed(userId, qId, correct) VALUES (?,?,?)";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->bindParam(2, $_GET['questionID']);
$sql->bindParam(3, $_GET['correct']);
$sql->execute();

?>