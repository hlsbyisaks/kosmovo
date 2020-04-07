<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'SELECT * FROM question';
$sql = $pdo->prepare($query);
$sql->execute();

$questions = $sql->fetchAll(\PDO::FETCH_ASSOC);

$questions = json_encode($questions);
echo $questions;
?>