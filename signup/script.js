const fname=document.getElementById("fname");
const lname=document.getElementById("lname");
const email=document.getElementById("email");
const password=document.getElementById("password");
const cpassword=document.getElementById("cpassword");

function User(fname,lname,email,password){
    return {
        fname:fname,
        lname:lname,
        email:email,
        password:password
    };
}
var isLoggedIn=false;
window.addEventListener('load', function() {
    // code to be executed after the page has loaded
    if(!localStorage.getItem("currUser")){
        // this.alert("please Login")
        // window.location.href="./login/login.html";
    }
    else{
    isLoggedIn=true;
    }
});

document.getElementById("submit").addEventListener("click",(e)=>{
    e.preventDefault();
    if(fname.value.length>0 && lname.value.length>0 && email.value.length>0 && password.value.length>0 && cpassword.value.length>0 && password.value===cpassword.value)
    {
        const user=new User(fname.value,lname.value,email.value,password.value);
        console.log(user);
        let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
        
        if (allUsers.some((i)=>{return i.email==email.value})) {
            alert("Email already exists.");
            return;
        }
    
        allUsers.push(user);
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
        document.getElementsByTagName("form")[0].reset();
    window.location.href="../login/login.html";
    }
    else{
        alert("Please fill in all the fields correctly.");
    }
    
});

document.getElementById("Home").addEventListener("click",(e)=>{
    window.location.href="../../index.html"
})

document.getElementById("Login").addEventListener("click",(e)=>{
    window.location.href="../login/login.html"
})

document.getElementById("MyCart").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="../login/login.html"
    else
    window.location.href="../cart/cart.html"
})