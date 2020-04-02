<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'SELECT * FROM user WHERE userName = ? AND password = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['username']);
$sql->bindParam(2, $_GET['password']);
$sql->execute();

$status = $sql->fetchAll(\PDO::FETCH_ASSOC);

$status = json_encode($status);
echo $status;
?>