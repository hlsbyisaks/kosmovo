<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'UPDATE user SET lat = ?, lng = ? WHERE userId = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['lat']);
$sql->bindParam(2, $_GET['lng']);
$sql->bindParam(3, $_GET['userId']);
$sql->execute();

?>