


<?php
include('connection.php');

if (isset($_POST['submit'])) {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $errors = [];

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email is required.';
    }
    if (empty($password)) {
        $errors[] = 'Password is required.';
    }

    if (empty($errors)) {
        $stmt = $conn->prepare('SELECT id, name, password FROM users WHERE email = ? LIMIT 1');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows == 1) {
            $stmt->bind_result($id, $name, $hashed_password);
            $stmt->fetch();
            if ($hashed_password && password_verify($password, $hashed_password)) {
                // Successful login, perhaps start session
                session_start();
                $_SESSION['user_id'] = $id;
                $_SESSION['user_name'] = $name;
                $redirectName = isset($name) ? $name : 'User';
                header("Location: success.php?name=" . urlencode($redirectName));
                exit;
            } else {
                $errors[] = 'Invalid email or password.';
            }
        } else {
            $errors[] = 'Invalid email or password.';
        }
        $stmt->close();
    }

    if (!empty($errors)) {
        $errorMsg = implode('\\n', $errors);
        echo '<script>alert("' . $errorMsg . '"); window.location.href = "index.html";</script>';
    }
}
?>