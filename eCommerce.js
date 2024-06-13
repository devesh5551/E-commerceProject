let login = document.querySelector("#right1");

console.log(login);
let particularUser = JSON.parse(localStorage.getItem("particularUser"));
console.log(particularUser);

let maleCont = document.querySelector("#maleCont");
let femaleCont=document.querySelector("#femaleCont");
let kidsCont = document.querySelector("#kidsCont");
let popUp = document.querySelector("#popUp");
let dynamic = document.querySelector("#dynamic");
let x = document.querySelector("#x");
let cartStorage =[];
// console.log(femaleCont) ;
// console.log(maleCont)
// console.log(kidsCont)
// console.log(dynamic);

x.addEventListener("click", ()=>{
    popUp.style.right = "-100%"
})
if(particularUser){
    login.innerHTML= `<span>${particularUser.firstName}</span>
    <a href="./eCommerce.html" id="logout"><button>Logout</button></a>
    `;
    let logout = document.querySelector("#logout");
    logout.addEventListener("click", ()=>{
        localStorage.removeItem("particularUser");
    })
}

async function fetchData(){
    let dataFromServer =await fetch("https://www.shoppersstack.com/shopping/products/alpha");
    let allData = await dataFromServer.json();
    console.log(dataFromServer);
    console.log(allData);
    let maleData = allData.data.filter((e)=>{
        if(e.category =='men'){
            return e;
        }
    })
    console.log(maleData)
    maleData.map((e)=>{
        maleCont.innerHTML+=` <div id="${e.productId}">
        <div><img src="${e.productImageURLs[0]}" alt=""></div>
        <h2>${e.name}</h2>
        <h3>₹${e.price}</h3>
        <h4>Rating: ${e.rating}</h4>
        <button class="btn">Add to Cart</button>
        </div>`;
    });
    let femaleData = allData.data.filter((e)=>{
        if(e.category =="women"){
            return e;
        }
    })
    console.log(femaleData)
    femaleData.map((e)=>{
        femaleCont.innerHTML+=` <div id="${e.productId}">
        <div><img src="${e.productImageURLs[0]}" alt=""></div>
        <h2>${e.name}</h2>
        <h3>₹${e.price}</h3>
        <h4>Rating: ${e.rating}</h4>
        <button class="btn">Add to Cart</button>
        </div>`;
    });
    let kidsData = allData.data.filter((e)=>{
        if(e.category =="kids"){
            return e;
        }
    })
    console.log(kidsData)
    kidsData.map((e)=>{
        kidsCont.innerHTML+=` <div id="${e.productId}">
        <div><img src="${e.productImageURLs[0]}" alt=""></div>
        <h2>${e.name}</h2>
        <h3>₹${e.price}</h3>
        <h4>Rating: ${e.rating}</h4>
        <button class="btn">Add to Cart</button>
        </div>`;
    });

    let btn = document.querySelectorAll(".btn");
    btn.forEach((e)=>{
        e.addEventListener("click", ()=>{
            popUp.style.right="0";
            if(particularUser){
                let parentElement =e.parentElement.id;
                console.log(parentElement);
                let oneProduct = allData.data.find((e)=>{
                    if(e.productId==parentElement){
                        return e;
                    }
                })
                console.log(oneProduct);
                cartStorage.push(oneProduct);
                print();
                console.log(cartStorage);
                dynamic.innerHTML="";
                cartStorage.map((e)=>{
                    dynamic.innerHTML +=` <div class="cart-design" id="${e.productId}">
                    <div><img src="${e.productImageURLs[0]}" alt=""></div>
                    <div>
                        <h3>${e.name}</h3>
                        <input type="number" name="" id="">
                    </div>
                    <div>
                        <h4 class="price">${e.price}</h4>
                    </div>
                    <div>
                        <h4 class="sub">${e.price}</h4> <br />
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>`;
                })
                subtotal();
                del();
                grandTotal();
            }else{
                dynamic.innerHTML = '<a href="./login.html"> login first </a>';

            }
        })
    })
    console.log(btn);
}
fetchData();

function print(){
    dynamic.innerHTML="";
    cartStorage.map((e)=>{
        dynamic.innerHTML +=` <div class="cart-design" id="${e.productId}">
        <div><img src="${e.productImageURLs[0]}" alt=""></div>
        <div>
            <h3>${e.name}</h3>
            <input type="number" name="" id="">
        </div>
        <div>
            <h4 class="price">${e.price}</h4>
        </div>
        <div>
            <h4 class="sub">${e.price}</h4> <br />
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>`;
    });
    del();
    
}

function del(){
    let trash= document.querySelectorAll(".fa-trash");
                trash.forEach((e)=>{
                    e.addEventListener("click", ()=>{
                        
                        let parentElement = e.parentElement.parentElement;
                        cartStorage = cartStorage.filter((e)=>{
                            if(e.productId != parentElement.id){
                                return e;
                            }
                        })
                        print();
                        console.log(cartStorage)
                    })
                })
}

function subtotal(){
    let sub = document.querySelectorAll(".sub");
                console.log(sub);
                let quantity = document.querySelectorAll("input");
                console.log(quantity);
                quantity.forEach((e)=>{
                    e.addEventListener("click", ()=>{
                        if(e.value<1){
                            e.value=1;
                        }
                        let parentElement=e.parentElement.parentElement;
                        console.log(parentElement);
                        let price =parentElement.querySelector(".price");
                        let sub = parentElement.querySelector(".sub");
                        sub.innerHTML= e.value *price.innerHTML;
                        grandTotal();
                    });
                });
}

function grandTotal(){
    let gt = document.querySelector("#gt");
    let sub = document.querySelectorAll(".sub");
    let sum = 0;
    sub.forEach((e)=>{
        let total = parseInt(e.innerHTML);
        sum = sum+ total;
    })
    gt.innerHTML = sum;
}