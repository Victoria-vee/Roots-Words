<?php
session_start();
include ('connection.php');

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];
    
    // SQL query to validate email exists
    $emailValidation = "SELECT COUNT(*) as count FROM users WHERE email = '$email'";
    $emailResult = mysqli_query($conn, $emailValidation);
    $emailRow = mysqli_fetch_assoc($emailResult);
    
    // SQL query to validate password matches
    $passwordValidation = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $passwordResult = mysqli_query($conn, $passwordValidation);
    
    // Check email validation
    if ($emailRow['count'] == 0) {
        $_SESSION['error'] = "Email not found!";
        header("Location:index.html#signin-popup");
        exit();
    }
    
    // Check password validation
    if (mysqli_num_rows($passwordResult) > 0) {
        $user = mysqli_fetch_assoc($passwordResult);
        
        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        
        header("Location:Lessons_Page/lessons.html");
        exit();
    } else {
        $_SESSION['error'] = "Invalid password!";
        header("Location:index.html#signin-popup");
        exit();
    }
}

mysqli_close($conn);
?>