const header = document.getElementsByTagName("header")[0];

window.addEventListener("scroll", () => {
    
    if (window,scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
    if(window,scrollY > 350){
        header.classList.add("tagline-section");
    }else{
        header.classList.remove("tagline-section")

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
        location.href = "lessons.html"; // Redirect to home page
}
signup2.onclick = () => {
    signuppopup2.style.display = "block";
}

close2.onclick = () => {
    signuppopup2.style.display = "none";
}