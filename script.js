const header = document.getElementsByTagName("header")[0];

window.addEventListener("scroll", () => {
    
    if (window,scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
    
});

const close = document.getElementById('close');
const closesignin = document.getElementById('close-signin');
const signup = document.getElementById('signup');
const signin = document.getElementById('signin');
const signuppopup = document.getElementById('signup-popup');
const signinpopup = document.getElementById('signin-popup');

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

