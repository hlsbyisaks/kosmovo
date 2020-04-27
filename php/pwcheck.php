<?php
include('connectToDB.php');
$pdo = connectDB();


$query = 'SELECT password FROM user WHERE userName = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['username']);
$sql->execute();


$hashedPwdInDb = $sql->fetchAll(\PDO::FETCH_ASSOC);
$hashedPwdInDb = password_verify($_GET['password'], $hashedPwdInDb[0]['password']);

if ($hashedPwdInDb == 1) {
    $query = 'SELECT * FROM user WHERE userName = ?';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['username']);
    $sql->execute();

    $status = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $status = json_encode($status);
    echo $status;
}else {
    echo 'wrong password';
}
       


?>