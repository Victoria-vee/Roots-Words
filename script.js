const header = document.getElementsByTagName("header")[0];
const span = document.getElementsByTagName("span")[1];

window.addEventListener("scroll", () => {
    
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
    if(window.scrollY > 350){
        header.classList.add("tagline-section");
        span.classList.add("tagline-section");
    }else{
        header.classList.remove("tagline-section");
        span.classList.remove("tagline-section");
    }   
    if (window.scrollY > 630) {
        header.classList.add("feature1");
        span.classList.remove("tagline-section");
    } else {
        header.classList.remove("feature1");
    }
    if (window.scrollY > 1160) {
        header.classList.add("feature2");
    } else {
        header.classList.remove("feature2");
    }
    if (window.scrollY > 1690) {
        header.classList.add("feature4");
    } else {
        header.classList.remove("feature4");
    }
    if (window.scrollY > 2220) {
        header.classList.add("feature5");
    } else {
        header.classList.remove("feature5");
    }  
    if (window.scrollY > 2750) {
        header.classList.add("tagline-section2");
        span.classList.add("tagline-section2");
    } else {
        header.classList.remove("tagline-section2");
        span.classList.remove("tagline-section2");
    } 
});

const close = document.getElementById('close');
const close2 = document.getElementById('close2');
const closesignin = document.getElementById('close-signin');
const signup = document.getElementById('signup');
const signup2 = document.getElementById('signup2');
const signin = document.getElementById('signin');
const signuppopup = document.getElementById('signup-popup');
const signuppopup2 = document.getElementById('signup-popup2');
const signinpopup = document.getElementById('signin-popup');
const signupsubmit = document.getElementById('signupsubmit');


signup.addEventListener("click",()=>{
    signuppopup.style.display="block";
});

close.onclick=()=>{
    signuppopup.style.display = "none";
};

signin.onclick=()=>{
    signinpopup.style.display = "block";
};

closesignin.onclick=()=>{
    signinpopup.style.display = "none";
};

signupsubmit.onclick=()=>{
        location.href = "/Lesson Page/lesson.html"; // Redirect to home page
}
signup2.onclick = () => {
    signuppopup2.style.display = "block";
}

close2.onclick = () => {
    signuppopup2.style.display = "none";
}

// Show password functionality for signup
const checkbox = document.getElementById("showPassword");
const password = document.getElementById("signup-password");
const confirmPassword = document.getElementById("signup-confirmpassword");

if (checkbox) {
  checkbox.addEventListener("change", function () {
    const type = this.checked ? "text" : "password";
    if (password) password.type = type;
    if (confirmPassword) confirmPassword.type = type;
  });
}

// Show password functionality for signin
const signinCheckbox = document.getElementById("showPasswordSignin");
const signinPassword = document.getElementById("signin-password");

if (signinCheckbox) {
  signinCheckbox.addEventListener("change", function () {
    const type = this.checked ? "text" : "password";
    if (signinPassword) signinPassword.type = type;
  });
}
