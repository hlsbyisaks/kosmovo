<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'UPDATE user SET score = score + ? where question.qId = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['score']);
$sql->bindParam(2, $_GET['userId']);
$sql->execute();

?>