<?php
include('connection.php');
// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $dob = trim($_POST['dob'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmpassword'] ?? ''; // Note: Both inputs have name="password"

    // Validate inputs
    $errors = [];
    
    if (empty($name)) $errors[] = "Name is required";
    
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required";
    
    
    if (empty($dob))  $errors[] = "Date of birth is required";
    
    
    if (empty($password) || strlen($password) < 6) 
        $errors[] = "Password must be at least 6 characters";
    
    
    if ($password !== $confirmPassword) $errors[] = "Passwords do not match";
    
    // If there are errors, display them
  if (!empty($errors)) {
        $msg = addslashes(implode("\\n", $errors));
        echo "<script>alert('{$msg}'); window.location.href='index.html#signup-popup';</script>";
        exit;
    }
        

            // Hash password securely
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $sql = "INSERT INTO users (name, email, dob, password) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $email, $dob, $hashedPassword);
    if ($stmt->execute()) {

    echo "<!DOCTYPE html>
    <html>
    <head>
        <title>Signup Successful</title>
        <link rel='stylesheet' href='style.css' />
    </head>
    <body>
        <div style='padding: 20px; max-width: 500px; margin: 50px auto; text-align: center;'>
            <h2>Welcome, " . htmlspecialchars($name) . "!</h2>
            <p>Your account has been created successfully.</p>
            <p>Email: " . htmlspecialchars($email) . "</p>
            <a href='Lesson_Page/lesson.html' style='margin:10px auto; background-color:#d84315;'><button>Go to Lessons</button></a>
        </div>
    </body>
    </html>";
} else {
        echo "<script>alert('Signup failed: " . addslashes($stmt->error) . "'); window.location.href='index.html#signup-popup';</script>";
    }
    
    $stmt->close();
}
?>