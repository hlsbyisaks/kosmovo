<?php
include('connectToDB.php');
$pdo = connectDB();


$query = 'SELECT userScore from user WHERE userId = ?';
    
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();

$status = $sql->fetchAll(\PDO::FETCH_ASSOC);

$status = json_encode($status);
echo $status;
  

?>