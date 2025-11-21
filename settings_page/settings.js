
    // Populate display fields from localStorage if available
    document.addEventListener('DOMContentLoaded', () => {
      const name = localStorage.getItem('name') || localStorage.getItem('userName') || '';
      const email = localStorage.getItem('email') || localStorage.getItem('userEmail') || '';
      const dob = localStorage.getItem('dob') || localStorage.getItem('userDob') || '';
      const pw = localStorage.getItem('password') || '';

      if (name) document.getElementById('display-name').textContent = name;
      if (email) document.getElementById('display-email').textContent = email;
      if (dob) document.getElementById('display-dob').textContent = dob;
      if (pw && document.getElementById('display-password')) {
        document.getElementById('display-password').value = pw;
      }

      // Show password toggle (works similar to site-wide behavior)
      document.querySelectorAll('.show-password').forEach(chk => {
        chk.addEventListener('change', () => {
          const pwd = document.getElementById('display-password');
          if (!pwd) return;
          pwd.type = chk.checked ? 'text' : 'password';
        });
      });
    });
 