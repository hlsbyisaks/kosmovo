<?php
include('connectToDB.php');

$pdo = connectDB();

if($_GET["activite"] == "getAllQuestion"){
    $query = 'SELECT *
    FROM question
    WHERE NOT EXISTS 
        (SELECT * 
         FROM userplayed
         WHERE userplayed.qId = question.qId and userplayed.userId = ?)';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['userId']);
    $sql->execute();

    $questions = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $questions = json_encode($questions);
    echo $questions;

}else if($_GET["activite"] == "checkifplayed"){
    $query = 'SELECT * FROM question where qId = ? and play = "no"';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['questionID']);
    $sql->execute();

    $questions = $sql->fetchAll(\PDO::FETCH_ASSOC);
    if(empty($questions)){
        echo "NotOK";
    }else{
        echo "OK";
    }
}else if($_GET["activite"] == "isPlaying"){
    $query = 'UPDATE question SET play = "yes" where question.qId = ?';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['questionID']);
    $sql->execute();

}else if($_GET["activite"] == "isNotPlaying"){
    $query = 'UPDATE question SET play = "no" where question.qId = ?';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['questionID']);
    $sql->execute();
}
?>