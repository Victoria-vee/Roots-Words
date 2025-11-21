<?php
// Database configuration for both local and production environments
if ($_SERVER['SERVER_NAME'] === 'localhost' || $_SERVER['SERVER_ADDR'] === '127.0.0.1') {
    // Local development (XAMPP)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $db_name = "naijatongues";
    $port = 3306;
} else {
    // Production (InfinityFree)
    // Replace these with your actual InfinityFree database credentials
    $servername = "sql303.infinityfree.com"; // Your MySQL hostname from InfinityFree
    $username = "if0_40466756"; // Your database username
    $password = "CvdwNjHD2Iu3D"; // Your database password
    $db_name = "if0_40466756_mydb"; // Your database name
    $port = 3306;
}

$conn = new mysqli($servername, $username, $password, $db_name, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8mb4 for better Unicode support
$conn->set_charset("utf8mb4");
?>
   
?>