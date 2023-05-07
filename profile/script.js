var userEmail;
var fname=document.getElementById("fname");
var lname=document.getElementById('lname');
var oldPassword=document.getElementById("oldPassword");
var newPassword=document.getElementById("newPassword");
var cPassword=document.getElementById("cPassword");
window.onload=function(){
    if(JSON.parse(localStorage.getItem("currUser"))!=null){
         userEmail = JSON.parse(localStorage.getItem("currUser"));
         var allUsers = JSON.parse(localStorage.getItem("allUsers"));
         var user = allUsers.find((i) => i.email === userEmail.email);
         if (user) {
             console.log(user);
         } 
         fname.value=user.fname;
         lname.value=user.lname;
    }
    else{
        window.location.href='../../login/login.html';
    }
}

document.getElementById("save").addEventListener("click",(e)=>{
    e.preventDefault();
    cFname=fname.value;
    cLname=lname.value;
    var allUsers = JSON.parse(localStorage.getItem("allUsers"));
    userEmail = JSON.parse(localStorage.getItem("currUser"));
    allUsers.forEach((i)=>{
        if(i.email===userEmail.email){
            i.fname=cFname;
            i.lname=cLname;
        }
    })
    localStorage.setItem("allUsers",JSON.stringify(allUsers));
    alert("changed successfully ");


})

document.getElementById("change").addEventListener("click",(e)=>{
    e.preventDefault();
    userEmail = JSON.parse(localStorage.getItem("currUser"));
    if(oldPassword.value===userEmail.password){
        if(newPassword.value===cPassword.value){
            userEmail.password=cPassword.value;
            localStorage.setItem("currUser",JSON.stringify(userEmail));
            var allUsers = JSON.parse(localStorage.getItem("allUsers"));
            allUsers.forEach((i)=>{
                if(i.email===userEmail.email){
                    i.password=userEmail.password;
                }
            })
            localStorage.setItem("allUsers",JSON.stringify(allUsers));
            alert("changed successfully ");

        }
        else{
            alert("new password and confirm password donot match")
        }
    }
    else{
        alert("please provide correct details !")
    }
    document.getElementsByTagName("form")[1].reset()
})

document.getElementById("logout").addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.setItem("currUser",null);
    window.location.href="../../index.html";
})

document.getElementById("cart").addEventListener("click",(e)=>{
    window.location.href="../../cart/cart.html"
})