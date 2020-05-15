<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'SELECT lat, lng from user WHERE userId = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();

$cords = $sql->fetchAll(\PDO::FETCH_ASSOC);

$cords = json_encode($cords);
echo $cords;
?>