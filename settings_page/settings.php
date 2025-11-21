<?php
session_start();
include('../connection.php');

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $stmt = $conn->prepare('SELECT name, email, dob FROM users WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $stmt->bind_result($name, $email, $dob);
    if ($stmt->fetch()) {
        $user_name = htmlspecialchars($name);
        $user_email = htmlspecialchars($email);
        $user_dob = htmlspecialchars($dob);
    }
    $stmt->close();
} else {
    header('Location: ../index.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Settings — NaijaTongues</title>
  <link rel="stylesheet" href="settings.css">
  <script src="https://kit.fontawesome.com/5be89bdbaf.js" crossorigin="anonymous"></script>
</head>
<body>
  <div class="back">
    <a href="../Lesson_Page/lesson.html"><i class="fa-solid fa-caret-left"></i> Back</a>
  </div>

  <div class="introduction">
    <h1>Settings</h1>
    <p class="description">View and manage your account details.</p>
  </div>

  <main class="sections">
    <section class="phrases settings-main">
      <h2>Account details</h2>

      <div class="phrase">
        <div class="words">
          <h3>Name</h3>
          <h3 id="display-name"><?php echo $user_name; ?></h3>
        </div>
      </div>

      <div class="phrase">
        <div class="words">
          <h3>Email</h3>
          <h3 id="display-email"><?php echo $user_email; ?></h3>
        </div>
      </div>

      <div class="phrase">
        <div class="words">
          <h3>Date of birth</h3>
          <h3 id="display-dob"><?php echo $user_dob; ?></h3>
        </div>
      </div>

      <div class="phrase">
        <div class="words">
          <h3>Password</h3>
          <label for="display-password" class="sr-only">Password</label>
          <div class="password-row">
            <input id="display-password" type="password" value="password123" readonly>
            <label class="show-label">
              <input type="checkbox" class="show-password"> Show
            </label>
          </div>
        </div>
      </div>

      <div class="settings-actions">
        <a href="logout.php" class="quiz">Sign out</a>
        <a href="../Lesson_Page/lesson.html" class="next">Back to lessons</a>
      </div>
    </section>
  </main>

  <script src="settings.js"></script>
</body>
</html>
