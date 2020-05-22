<?php
    include('connectToDB.php');

    $pdo = connectDB();

    if($_GET["activite"] == "getAllQuestion"){
        $query = 'SELECT *
        FROM question
        WHERE NOT EXISTS 
            (SELECT * 
            FROM userplayed
            WHERE (userplayed.qId = question.qId and userplayed.userId = ? ) OR (userplayed.qId = question.qId and userplayed.correct = 1))';
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['userId']);
        $sql->execute();

        $questions = $sql->fetchAll(\PDO::FETCH_ASSOC);

        $questions = json_encode($questions);
        echo $questions;

    }
?>