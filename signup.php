<?php
include('connection.php');

if (isset($_POST['submit'])) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $dob = trim($_POST['dob']);
    $password = $_POST['password'];
    $confirmpassword = $_POST['confirmpassword'];

    $errors = [];

    // Validation
    if (empty($name)) $errors[] = 'Name is required.';
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required.';
    if (empty($dob)) $errors[] = 'Date of birth is required.';
    if (empty($password)) $errors[] = 'Password is required.';
    if ($password !== $confirmpassword) $errors[] = 'Passwords do not match.';
    if (strlen($password) < 6) $errors[] = 'Password must be at least 6 characters.';

    if (empty($errors)) {
        // Check if email already exists
        $stmt = $conn->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $errors[] = 'An account with that email already exists.';
        }
        $stmt->close();
    }

    if (empty($errors)) {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare('INSERT INTO users (name, email, dob, password) VALUES (?, ?, ?, ?)');
        $stmt->bind_param('ssss', $name, $email, $dob, $hash);
        if ($stmt->execute()) {
            header("Location: success.php?name=" . urlencode($name));
            exit;
        } else {
            echo '<script>alert("Failed to create account. Please try again."); window.location.href = "index.html";</script>';
        }
        $stmt->close();
    } else {
        $errorMsg = implode('\\n', $errors);
        echo '<script>alert("' . $errorMsg . '"); window.location.href = "index.html";</script>';
    }
}
?>