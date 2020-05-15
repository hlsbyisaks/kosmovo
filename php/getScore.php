<?php
include('connectToDB.php');
$pdo = connectDB();


$query = 'SELECT userName, userScore, userId from user';
    
$sql = $pdo->prepare($query);
$sql->execute();

$status = $sql->fetchAll(\PDO::FETCH_ASSOC);

$status = json_encode($status);
echo $status;
  

?>