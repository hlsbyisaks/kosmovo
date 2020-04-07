<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'SELECT lat,lng,svgHat,colorHat,userName,userScore FROM user';
$sql = $pdo->prepare($query);
$sql->execute();

$status = $sql->fetchAll(\PDO::FETCH_ASSOC);

$status = json_encode($status);
echo $status;
?>