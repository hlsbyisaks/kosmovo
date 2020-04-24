<?php
include('connectToDB.php');

$pdo = connectDB();

if($_GET["activite"] == "getAllQuestion"){
    $query = 'SELECT *
        FROM question
        WHERE NOT EXISTS
        (SELECT * 
            FROM userplayed
            WHERE question.qId = userplayed.qId);';
    $sql = $pdo->prepare($query);
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
}
?>