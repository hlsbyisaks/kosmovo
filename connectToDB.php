<?php
    function connectDB() {
        return new PDO('mysql:host=localhost;dbname=kosmovo', 'root', 'root');
    }
?>