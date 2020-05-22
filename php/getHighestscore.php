<?php
    include('connectToDB.php');
    $pdo = connectDB();

    $query = 'SELECT user.userScore FROM user ORDER BY user.userScore DESC LIMIT 1';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['code']);
    $sql->execute();
    $status = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $status = json_encode($status);
    echo $status;

?>