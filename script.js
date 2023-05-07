var isLoggedIn=false;
window.addEventListener('load', function() {
    // code to be executed after the page has loaded
    if(!JSON.parse(localStorage.getItem("currUser"))){
        // this.alert("please Login")
        // window.location.href="./login/login.html";
    }
    else{
    isLoggedIn=true;
    }
});

document.getElementById("Home").addEventListener("click",(e)=>{
    window.location.href="./index.html"
})
document.getElementById("Login").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="/ShoppingApp/login/login.html"
    else
    alert("already logged in !")
    console.log(localStorage.getItem("currUser"));
})
document.getElementById("SignUp").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="/ShoppingApp/signup/signup.html"
    else
        alert("alredy signed in!")
})
document.getElementById("MyCart").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="/ShoppingApp/login/login.html"
    else
    window.location.href="/ShoppingApp/cart/cart.html"
})
document.getElementById("Profile").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="/ShoppingApp/login/login.html"
    else
    window.location.href="/ShoppingApp/profile/profile.html";
})
document.getElementById("login").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="/ShoppingApp/login/login.html"
    else
    window.location.href="/ShoppingApp/profile/profile.html";
})

document.getElementById("signup").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="/ShoppingApp/signup/signup.html"
    else{
        alert("already signed in !")
    window.location.href="/ShoppingApp/profile/profile.html";
    }
})

  
