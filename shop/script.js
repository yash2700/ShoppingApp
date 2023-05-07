// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };
isLoggedIn=false;
window.onload=function(){
  if(JSON.parse(localStorage.getItem("currUser"))!=null){
    isLoggedIn=true;
  }
  else{
    window.location.href="../../login/login.html"
  }
}
var dataFetched=[];
var menData=[];
var womenData=[];
var jewelleryData=[];
var electronicsData=[];
document.querySelectorAll(".filter").forEach((i)=>i.addEventListener("click",filterBytabs))
var mensClothing=document.getElementById("men");
mensClothing=mensClothing.querySelector("div:nth-of-type(1)")

var filteredElement=document.querySelector(".filtered");
filteredElement.style.display="none"
var womenClothing=document.getElementById("women");
womenClothing=womenClothing.querySelector("div:nth-of-type(1)")

var jewellery=document.getElementById("jewellery");
jewellery=jewellery.querySelector("div:nth-of-type(1)")

var electronics=document.getElementById("electronics");
electronics=electronics.querySelector("div:nth-of-type(1)")

async function fetchData(){
  const url="https://fakestoreapi.com/products";
  await fetch(url).then((response)=>response.json()).then((data)=>dataFetched=data);
  menData=dataFetched.filter((i)=>i.category.startsWith("men"));
  womenData=dataFetched.filter((i)=>i.category.startsWith("wom"));
  jewelleryData=dataFetched.filter((i)=>i.category.startsWith("jew"));
  electronicsData=dataFetched.filter((i)=>i.category.startsWith("elec"));
  renderData(dataFetched);
}
fetchData();
function renderData(dataFetched){
  if(dataFetched.length==0)
    alert("no search possibile")
  mensClothing.innerHTML=``
  womenClothing.innerHTML=``
  jewellery.innerHTML=``
  electronics.innerHTML=``
  console.log(dataFetched);
  dataFetched.map((item)=>{
    var strItem=JSON.stringify(item)
    var element=
   ` <div class="item" id=${item.id}>
              <img src="${item.image}" alt="Item" />
              <div class="info">
                <div class="row">
                  <div class="price">$ ${item.price}</div>
                  <div class="sized">S,M,L</div>
                </div>
                <div class="colors">
                  Colors:
                  <div class="row">
                    <div class="circle" style="background-color: #000"></div>
                    <div class="circle" style="background-color: #4938af"></div>
                    <div class="circle" style="background-color: #203d3e"></div>
                  </div>
                </div>
                <div class="row">Rating:${item.rating.rate}</div>
              </div>
              <button id="addBtn" onclick="addToCart(
              ${item.id})">Add to Cart</button>
              </div>`
    if(item.category.startsWith('men')){
      mensClothing.innerHTML+=element
    }
    else if(item.category.startsWith('wom')){
      womenClothing.innerHTML+=element
    }
    else if(item.category.startsWith('jew')){
      jewellery.innerHTML+=element
    }
    else if(item.category.startsWith('ele')){
      electronics.innerHTML+=element
    }
  })
}

function filterBytabs(e){
  filteredElement.style.display="block"
  var element=e.target;
  document.querySelectorAll(".filter").forEach((i)=>{i.style.backgroundColor="white";i.style.color="black"});
  element.style.color="white";
  element.style.backgroundColor="black";
  document.querySelector('.data').style.display="none";
  if(element.id=="filterAll"){
    document.querySelector('.data').style.display="block";
    filteredElement.style.display="none"
  }else{
    if(element.id.endsWith("Men"))
    displayFilteredData(menData);
    else if(element.id.endsWith("men"))
    displayFilteredData(womenData);
    else if(element.id.endsWith("Jew"))
    displayFilteredData(jewelleryData);
    else if(element.id.endsWith("Elec"))
    displayFilteredData(electronicsData);
  }

}
function displayFilteredData(arr){
  if(arr.length==0){
    alert("no search possible !");
    return;
  }
  var innerHtml="";
  filteredElement.innerHTML=``;
  var category=arr[0].category;
  category=category.charAt(0).toUpperCase()+category.slice(1)

  innerHtml+=`<title style="display:block;font-size:1.6rem;font-weight:400;margin:1rem 0 0 0">${category}</title>`;
 
 innerHtml+=`<div class="items">`

  arr.forEach((item)=>{
    var element=
   ` <div class="item" id=${item.id}>
              <img src="${item.image}" alt="Item" />
              <div class="info">
                <div class="row">
                  <div class="price">$ ${item.price}</div>
                  <div class="sized">S,M,L</div>
                </div>
                <div class="colors">
                  Colors:
                  <div class="row">
                    <div class="circle" style="background-color: #000"></div>
                    <div class="circle" style="background-color: #4938af"></div>
                    <div class="circle" style="background-color: #203d3e"></div>
                  </div>
                </div>
                <div class="row">Rating:${item.rating.rate}</div>
              </div>
              <button id="addBtn" onclick="addToCart(
              ${item.id})">Add to Cart</button>
              </div>`
          innerHtml+=element;
  })
  innerHtml+=`</div>`
  filteredElement.innerHTML+=innerHtml;
  
}

function addToCart(item){
  console.log(item);
  if(JSON.parse(localStorage.getItem("carts"))!=null){
    var currUser=localStorage.getItem("currUser");
    currUser=JSON.parse(currUser);
    console.log(currUser);
    var carts=JSON.parse(localStorage.getItem("carts"));
    var isCart=false;
    carts.forEach((i)=>{
      if(i.email===currUser.email){
        isCart=true;
      }
    })
    console.log(isCart);
    if(isCart){
      carts.forEach((i)=>{
        if(i.email===currUser.email){
          i.items.push(item)
        }
      })
    }
    else{
      var cart={
        email:currUser.email,
        items:[]
      }
      carts.push(cart)
      carts.forEach((i)=>{
        if(i.email===currUser.email){
          i.items.push(item)
        }
      })
    }
    
    localStorage.setItem("carts",JSON.stringify(carts))
    console.log((carts));
  }else{
    var arr=[];
    var currUser=localStorage.getItem("currUser");
    currUser=JSON.parse(currUser);
    var cart={
      email:currUser.email,
      items:[]
    }
    cart.items.push(item)
    arr.push(cart);
    localStorage.setItem("carts",JSON.stringify(arr));
  }
  alert("item added successfully !")
}


function filterIndividual(arr){
  displayFilteredData(arr)
}

document.getElementById("search").addEventListener("input",(e)=>{
  var arrayToBeFiltered=[]
  var input=e.target.value.toLowerCase();
  if(filteredElement.style.display!="none"){
    if(filteredElement.querySelector("title").innerText.startsWith("Men")){
      arrayToBeFiltered=menData.filter((i)=>i.title.toLowerCase().includes(input.trim()));
      filterIndividual(arrayToBeFiltered);
    }
    else if(    filteredElement.querySelector("title").innerText.startsWith("Wom")){
      arrayToBeFiltered=womenData.filter((i)=>i.title.toLowerCase().includes(input.trim()));
      filterIndividual(arrayToBeFiltered);
    }
    else if(    filteredElement.querySelector("title").innerText.startsWith("Jew")){
      arrayToBeFiltered=jewelleryData.filter((i)=>i.title.toLowerCase().includes(input.trim()));
      filterIndividual(arrayToBeFiltered);
    }
    else if(    filteredElement.querySelector("title").innerText.startsWith("Elec")){
      arrayToBeFiltered=electronicsData.filter((i)=>i.title.toLowerCase().includes(input.trim()));
      filterIndividual(arrayToBeFiltered);
    }
  }else{
  arrayToBeFiltered=dataFetched.filter((i)=>i.title.toLowerCase().includes(input.trim()));
  renderData(arrayToBeFiltered);
}
})

document.getElementById("range").addEventListener("input",(e)=>{
  var rating=e.target.value;
  var arrayToBeFiltered=[]
  var input=e.target.value.toLowerCase();
  if(filteredElement.style.display!="none"){
    if(filteredElement.querySelector("title").innerText.startsWith("Men")){
      arrayToBeFiltered=menData.filter((i)=>i.rating.rate>=rating);
      if(arrayToBeFiltered.length==0){
        e.target.value=0;
        alert("no item with given rating !");
        displayFilteredData(menData);
        return;
      }
      filterIndividual(arrayToBeFiltered);
    }
    else if(    filteredElement.querySelector("title").innerText.startsWith("Wom")){
      arrayToBeFiltered=womenData.filter((i)=>i.rating.rate>=rating);
      if(arrayToBeFiltered.length==0){
        e.target.value=0;
        alert("no item with given rating !");
        displayFilteredData(womenData);
        return;
      }
      filterIndividual(arrayToBeFiltered);
    }
    else if(    filteredElement.querySelector("title").innerText.startsWith("Jew")){
      arrayToBeFiltered=jewelleryData.filter((i)=>i.rating.rate>=rating);
      if(arrayToBeFiltered.length==0){
        e.target.value=0;
        alert("no item with given rating !");
        displayFilteredData(jewelleryData);
        return;
      }
      filterIndividual(arrayToBeFiltered);
    }
    else if(    filteredElement.querySelector("title").innerText.startsWith("Elec")){
      arrayToBeFiltered=electronicsData.filter((i)=>i.rating.rate>=rating);
      if(arrayToBeFiltered.length==0){
        e.target.value=0;
        alert("no item with given rating !");
        displayFilteredData(electronicsData);
        return;
      }
      filterIndividual(arrayToBeFiltered);
    }
   
  }else{
  arrayToBeFiltered=dataFetched.filter((i)=>i.rating.rate>=rating);
  if(arrayToBeFiltered.length==0){
    e.target.value=0;
    alert("no item with given rating !");
    renderData(dataFetched);
    return;
  }
  renderData(arrayToBeFiltered);

}
})

