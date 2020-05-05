<?php
include('connectToDB.php');
$pdo = connectDB();

$query = 'SELECT * FROM user WHERE userName = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['username']);
$sql->execute();
$status = $sql->fetchAll(\PDO::FETCH_ASSOC);

//checks if username exists
if ($status[0]['userId'] != null) {
    echo 'Username already exists';
} else {
    // Creates hashed string of user password
    $hashedPwdInDb = password_hash($_GET['password'], PASSWORD_DEFAULT); 

    $query = 'INSERT INTO user (userName, password, mail, svgHat, colorHat, userScore, lat, lng, online) 
                            VALUES (?,?,?,"","",0,0,0,"")';
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['username']);
    $sql->bindParam(2, $hashedPwdInDb);
    $sql->bindParam(3, $_GET['mail']);
    $sql->execute();

    echo $_GET['username'];
}
?>