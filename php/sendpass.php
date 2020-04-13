<?php
include('connectToDB.php');

$pdo = connectDB();
$query = 'SELECT userName, password from user where mail = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['mail']);
$sql->execute();

$status = $sql->fetchAll(\PDO::FETCH_ASSOC);

$status = json_encode($status);

$to = $_GET['mail'];
$subject = "Username & Password";
         
$message = "<b>".$status."</b>";
$message .= "<h1>Kosmovo - Username & Password</h1>";
         
$header = "From:kosmovo@gmail.com \r\n";
         
$retval = mail ($to,$subject,$message,$header);
         
if( $retval == true ) {
    echo "Message sent successfully...";
}else {
    echo "Message could not be sent...";
}

?>