<?php
session_start();
$name = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : (isset($_SESSION['user_name']) ? htmlspecialchars($_SESSION['user_name']) : 'User');
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Success</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;background:#f7f7f7;color:#222;padding:40px}
    .card{max-width:600px;margin:40px auto;background:#fff;padding:24px;border-radius:8px;box-shadow:0 6px 20px rgba(0,0,0,0.08)}
    a{color:#d84315;font-weight:600}
  </style>
</head>
<body>
  <div class="card">
    <h1>Welcome, <?php echo $name; ?>!</h1>
    <p>Your account was created / signed in successfully.</p>
    <p><a href="Lesson_Page/lesson.html">Go to lessons</a> · <a href="index.html">Home</a></p>
  </div>
</body>
</html>
