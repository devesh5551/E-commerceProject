let form = document.querySelector("form");
let userName = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
let eUser = document.querySelectorAll("span")[0];
let ePass = document.querySelectorAll("span")[1];
let eSubmit = document.querySelectorAll("span")[2];
let e2Submit = document.querySelector("#succ");
let localData = JSON.parse(localStorage.getItem("data"));
console.log(localData)
console.log(eUser, ePass, eSubmit);

// form.addEventListener("submit", (e)=>{
//     e.preventDefault();
    console.log(userName.value, password.value);
    // if(userName.value == "devesh@gmail.com" && password.value==123456789){
    //     alert("Login Successful");
    // }
//     else if(userName.value=="" && password.value==""){
//         alert("username & Password Required")
//     }
//     else if(userName.value !='' && password.value==""){
//         alert("password is required");
//     }
//     else if(userName.value =='' && password.value!=""){
//         alert("username is required");
//     }
//     else{
//         alert("OPPS! Invalid Credentials")
//     }
// })

form.addEventListener("submit", (e)=>{
    eUser.innerHTML ="";
    ePass.innerHTML="";
    eSubmit.innerHTML="";
    // e.preventDefault();
    let matching = localData.find((e)=>{
        if(userName.value==e.email && password.value == e.pass){
            return e;
        }
    });
    console.log(matching);
   
    if(matching){
        eSubmit.setAttribute("id", "succ");
        eSubmit.innerHTML=`<label for="">Succefull login</label> <button><i class="fa-solid fa-x"></i></button>`;
        localStorage.setItem("particularUser", JSON.stringify(matching));
        setTimeout(()=>{
           eSubmit.removeAttribute("id");
           eSubmit.innerHTML="";
        },5000);

    }
    else if(userName.value=="" && password.value==""){
        eUser.innerHTML = "Username required!";
        ePass.innerHTML = "Password required!";
        eSubmit.innerHTML = "something is missing!";
        e.preventDefault();
    }
    else if(userName.value=="" && password.value==""){
        eUser.innerHTML = "Username required!";
        eSubmit.innerHTML = "something is missing!";
        e.preventDefault();

    }
    else if(userName.value !='' && password.value==""){
        ePass.innerHTML = "Password is required";
        eSubmit.innerHTML = "something is missing!";
        e.preventDefault();
    }
    else if(userName.value =='' && password.value!=""){
        eUser.innerHTML = "Username required!";
        eSubmit.innerHTML = "something is missing!";
        e.preventDefault();
    }
    else{
        eSubmit.innerHTML = "Opps! Incorrect username or password!";
        e.preventDefault();
    }
    
})