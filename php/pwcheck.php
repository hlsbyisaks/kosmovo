<?php
include('connectToDB.php');
$pdo = connectDB();



    $query = 'SELECT password FROM user WHERE userName = ?';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['username']);
    $sql->execute();

    $status = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $status = json_encode($status);
    echo $status;


?>