<?php
include('connectToDB.php');


function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

$newPass = randomPassword()

$newPassEncode = password_hash($newPass, PASSWORD_DEFAULT); 

$pdo = connectDB();
$query = 'UPDATE user SET user.password = ? where user.mail = ?';
$sql = $pdo->prepare($query);
$sql->bindParam(1, $newPassEncode);
$sql->bindParam(2, $_GET['mail']);
$sql->execute();


$to = $_GET["mail"];
$subject = "Kosmovo - Pasword Reset (No-Reply)";

$message = "
<html>
<head>
<title>Kosmovo</title>
</head>
<body>
<p>Here is your new password</p>
<table>
<tr>
<th>".$newPass."</th>
</tr>
</table>
<
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <kosmovo@no-reply.com>' . "\r\n";
$headers .= 'Cc: kosmovo@no-reply.com' . "\r\n";

mail($to,$subject,$message,$headers);


?>