<?php
require_once 'connection.php';

function clean($v){ return trim(strip_tags($v)); }

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Please provide a valid email.';
    } elseif (!$password) {
        $error = 'Please provide your password.';
    } else {
        $stmt = $conn->prepare('SELECT id, name, password FROM users WHERE email = ? LIMIT 1');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows === 1) {
            $stmt->bind_result($id, $name, $hash);
            $stmt->fetch();
            if (password_verify($password, $hash)) {
                // success — redirect to success page
                header('Location: success.php?name=' . urlencode($name));
                exit;
            } else {
                $error = 'Invalid credentials.';
            }
        } else {
            $error = 'No account found for that email.';
        }
        $stmt->close();
    }
}
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Sign in</title></head>
<body>
<?php if ($error): ?>
  <h2>Sign in error</h2>
  <p><?php echo htmlspecialchars($error); ?></p>
  <p><a href="index.html">Back</a></p>
<?php endif; ?>
</body>
</html>
<?php
session_start();
include ('connection.php');

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Sanitize input
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') {
        $_SESSION['error'] = "Please provide both email and password.";
        header("Location: index.php#signin-popup");
        exit();
    }

    // Use prepared statement to fetch user by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    if ($stmt === false) {
        $_SESSION['error'] = "Server error. Please try again later.";
        echo "Location: index.html#signin-popup";
        exit();
    }
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        $_SESSION['error'] = "Email not found!";
        echo "Location: index.html#signin-popup";
        $stmt->close();
        exit();
    }

    $user = $result->fetch_assoc();
    $stmt->close();

    // Verify password against hashed password stored at signup
    if (password_verify($password, $user['password'])) {
        // Set session variables
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];

        header("Location: Lesson_Page/lesson.html");
        exit();
    } else {
        $_SESSION['error'] = "Invalid password!";
        header("Location: index.html#signin-popup");
        exit();
    }
}

mysqli_close($conn);
?>