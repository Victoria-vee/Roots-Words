<?php
require_once 'connection.php';

// Simple sanitizer helper
function clean($v){
    return trim(strip_tags($v));
}

$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? clean($_POST['name']) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $dob = isset($_POST['dob']) ? clean($_POST['dob']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirm = isset($_POST['confirmpassword']) ? $_POST['confirmpassword'] : '';

    // Basic validation
    if (!$name) $errors[] = 'Name is required.';
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required.';
    if (!$dob) $errors[] = 'Date of birth is required.';
    if (!$password) $errors[] = 'Password is required.';
    if ($password !== $confirm) $errors[] = 'Passwords do not match.';
    if (strlen($password) < 6) $errors[] = 'Password must be at least 6 characters.';

    if (empty($errors)) {
        

        // Check for existing email
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
        $insert = $conn->prepare('INSERT INTO users (name,email,dob,password) VALUES (?,?,?,?)');
        $insert->bind_param('ssss', $name, $email, $dob, $hash);
        if ($insert->execute()) {
            // On success redirect to simple success page (pass name safely URL-encoded)
            header('Location: success.php?name=' . urlencode($name));
            exit;
        } else {
            $errors[] = 'Failed to create account. Please try again.';
        }
    }
}

// If we reach here show errors (very simple)
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Sign up result</title></head>
<body>
<?php if (!empty($errors)): ?>
  <h2>There were errors with your submission</h2>
  <ul>
    <?php foreach($errors as $e): ?>
      <li><?php echo htmlspecialchars($e); ?></li>
    <?php endforeach; ?>
  </ul>
  <p><a href="index.html">Go back</a></p>
<?php endif; ?>
</body>
</html>
