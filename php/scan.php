<?php
    include('connectToDB.php');
    $pdo = connectDB();

    $query = 'SELECT *
    FROM question
    WHERE NOT EXISTS 
        (SELECT * 
        FROM userplayed
        WHERE (userplayed.qId = question.qId and userplayed.userId = ? ) OR (userplayed.qId = question.qId and userplayed.correct = 1)) and question.code = ?';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['userId']);
    $sql->bindParam(2, $_GET['code']);
    $sql->execute();
    $status = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $status = json_encode($status);
    echo $status;

?>