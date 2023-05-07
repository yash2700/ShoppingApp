var isLoggedIn=false;
window.addEventListener('load', function() {
    // code to be executed after the page has loaded
    if(JSON.parse(localStorage.getItem("currUser"))==null){
        // this.alert("please Login")
        // window.location.href="./login/login.html";
    }
    
    else{
    isLoggedIn=true;
    }
});

document.getElementById("login").addEventListener("click",(e)=>{
    e.preventDefault()
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    if(password.length>0){
        var allUsers=localStorage.getItem("allUsers");
        allUsers=JSON.parse(allUsers);
        var isCorrect=false;
        allUsers.forEach((i)=>{
                if(i.email===email && i.password===password){
                    isCorrect=true;
                }
        });
        if(isCorrect){
            console.log(email);
            const randomString = Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
            const currUser={
                access_token:randomString,
                email:email,
                password:password
            }
            localStorage.setItem("currUser",JSON.stringify(currUser));
        }else{
            alert("provide correct details !");
        }
        document.getElementsByTagName("form")[0].reset();
        if(isCorrect){
            window.location.href="ShoppingApp/profile/profile.html"
        }
    }
})

document.getElementById("Home").addEventListener("click",(e)=>{
    window.location.href="../../index.html"
})
document.getElementById("Login").addEventListener("click",(e)=>{
    window.location.href="../../login/login.html"
})

document.getElementById("SignUp").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="../../signup/signup.html"
    else{
        alert("already signed in !")
    window.location.href="../../profile/profile.html";
    }
})
document.getElementById("MyCart").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="../../login/login.html"
    else
    window.location.href="../../cart/cart.html"
})
