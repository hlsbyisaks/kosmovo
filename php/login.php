<?php
include('connectToDB.php');
$pdo = connectDB();


/*
    $query = 'UPDATE user SET lat = ?, lng = ? WHERE userName = ? AND password = ?';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['lat']);
    $sql->bindParam(2, $_GET['lng']);
    $sql->bindParam(3, $_GET['username']);
    $sql->bindParam(4, $_GET['password']);
    $sql->execute();
*/

    $query = 'SELECT * FROM user WHERE userName = ? AND password = ?';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['username']);
    $sql->bindParam(2, $_GET['password']);
    $sql->execute();

    $status = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $status = json_encode($status);
    echo $status;

   

?>