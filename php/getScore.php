<?php
include('connectToDB.php');
$pdo = connectDB();


$query = 'SELECT COUNT(score) AS score FROM (
    SELECT userplayed.qId, userplayed.userId, userplayed.correct, user.userName, question.score
    FROM userplayed
    INNER JOIN user ON userplayed.userId=user.userId
    INNER JOIN question ON userplayed.qId=question.qId
    WHERE correct = "1" AND userName = "?"
    ) AS tmp;';
    
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['username']);
$sql->execute();

$status = $sql->fetchAll(\PDO::FETCH_ASSOC);

$status = json_encode($status);
echo $status;
  

?>