# kosmovo
<!-- 
IMPORT FROM CSV FILE

LOAD DATA INFILE 'C:/Users/isakp/Downloads/questions.csv' 
INTO TABLE question 
FIELDS TERMINATED BY ',' 
ENCLOSED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(`qString`, `lat`, `long`, `alt1`, `alt2`, `alt3`, `alt4`, `score`);





SET max login to 1
input email, check for @
back knapp från register
popup
fixa till header i game page

begränsa username till 1 pers 
Flytta kampanjrelaterade frågor till FP och SP


Padding på kosmovo 2020
kärlek till kanpparna. Bort med styling och gölr dem square med lite radius


<?php
    function connectDB() {
        return new PDO('mysql:host=10.209.2.88;dbname=244339-kosmovo2020', '244339_wa17534', 'kosmovo2020');
    }
?>

SELECT COUNT(score) AS score FROM (
    SELECT userplayed.qId, userplayed.userId, userplayed.correct, user.userName, question.score
    FROM userplayed
    INNER JOIN user ON userplayed.userId=user.userId
    INNER JOIN question ON userplayed.qId=question.qId
    WHERE correct = "1" AND userName = "?"
    ) AS tmp
-->

