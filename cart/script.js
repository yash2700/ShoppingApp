var isLoggedIn=false;
window.addEventListener('load', function() {
    // code to be executed after the page has loaded
    if(!JSON.parse(localStorage.getItem("currUser"))){
        this.alert("please Login")
        window.location.href="/ShoppingApp/login/login.html";
    }
    else{
    isLoggedIn=true;
    }
});
var itemId=0;

var currUser=localStorage.getItem("currUser");
currUser=JSON.parse(currUser);
var items=document.querySelector('.items');


var list=document.querySelector(".list-item")
var totalPrice=0;
var currCartList=[];
var productsList=[]
var currCart=[];
productsList=JSON.parse(localStorage.getItem("carts"));
   
var dataFetched;
async function addData(){
     dataFetched= await fetch("https://fakestoreapi.com/products").then((response)=>response.json()).then((data)=>data);
   productsList.forEach((i)=>{
    if(i.email===currUser.email){
        currCartList=[...i.items];
}});
console.log(currCartList);

currCartList.forEach((i)=>{
    dataFetched.forEach((j)=>{
        if(i==j.id){
            currCart.push(j)
        }
    })
})
    renderData(currCart);
}


function renderData(currCart){
 
    list.innerHTML=``;
    items.innerHTML=``;
    var totalPrice=0;
    var listItemPos=0;
        currCart.forEach((j)=>{
        totalPrice+=j.price
           
                var element=
                `<div class="item" id=${++itemId}>
                <img src="${j.image}" alt="Item" />
                <div class="info">
                  <div class="row">
                    <div class="">Title : ${j.title}</div>
                  </div>
                    <div class="row">
                    <div>Price :$ ${j.price}</div>
                    </div>
                  <div class="row">Rating: ${j.rating.rate}</div>
                </div>
                <button id="removeBtn" onclick="removeFromCart(${listItemPos})">Remove From Cart</button>
          </div>`
          var priceElement=`
            
          <div class="left-item">
              ${++listItemPos}. ${j.title}
          </div>
          <div class="right-item">
              $ ${j.price};
                </div>`
          list.innerHTML+=priceElement;
          items.innerHTML+=element;
            }
        )
        if(currCart.length==0){
            
    document.getElementById("total").innerText=0
        }
   
    document.getElementById("total").innerText=totalPrice.toFixed(2);
}
function removeFromCart(e){
    console.log(e);
    currCartList.splice(e,1);
   currCart.splice(e,1);

    productsList.forEach((i)=>{
        if(i.email===currUser.email){
            i.items=currCartList;
            console.log(currCartList);
        }
    })
    localStorage.setItem("carts",JSON.stringify(productsList));

    renderData(currCart);

}

addData();
document.getElementById("checkout").addEventListener("click",(e)=>{
    if(currCart.length==0){
        alert("please add items to your cart !")
    }
    else{
        currCartList=[];
        productsList.forEach((i)=>{
            if(i.email===currUser.email){
                i.items=currCartList;
            }
        })
        localStorage.setItem("carts",JSON.stringify(productsList));
        currCart=[];
        alert("checkout successfully !");
        renderData(currCart);
        
    }
})


document.getElementById("Home").addEventListener("click",(e)=>{
    window.location.href="/ShoppingApp/index.html"
})
document.getElementById("Login").addEventListener("click",(e)=>{
    if(!isLoggedIn)
    window.location.href="/ShoppingApp/login/login.html"
    else
    alert("already logged in !")
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



  
