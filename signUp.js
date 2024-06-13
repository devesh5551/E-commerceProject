let form = document.querySelector("form");
let Name = document.querySelectorAll("input")[0];
let lName = document.querySelectorAll("input")[1];
let email =document.querySelectorAll("input")[2];
let phoneNo = document.querySelectorAll("input")[3];
let password = document.querySelectorAll("input")[4];
let confirmPassword = document.querySelectorAll("input")[5];
console.log(Name, email, phoneNo, password, confirmPassword);
let cName = document.querySelectorAll('span')[0];
let cLastName = document.querySelectorAll("span")[1]
let cEmail = document.querySelectorAll('span')[2];
let cPhoneNo = document.querySelectorAll('span')[3];
let cPassword = document.querySelectorAll('span')[4];
let cConfirmPassword = document.querySelectorAll('span')[5];
let storage=[];
console.log(storage);
let localData = JSON.parse(localStorage.getItem("data"));
console.log(localData);
if(localData){
    storage= localData;
    console.log(storage)
}
// e.preventDefault();
form.addEventListener("submit", (e)=>{
    let regex=/^[a-zA-Z]{2,15}$/;
    let regex2 = /^[6-9][0-9]{9}$/;
    let passRegex = /^[a-zA-Z0-9]{8,15}$/;
    let flag = true;
    if(Name.value==""){
        cName.innerHTML = "first name required! </br>";
        e.preventDefault();
        flag=false;
    }else if(regex.test(Name.value)){
        cName.innerHTML="";
    }else{
        cName.innerHTML="only Alphabets are allowed!";
        e.preventDefault();
        flag=false;
    }
    if(lName.value==""){
        cLastName.innerHTML = "last name required! </br>";
        e.preventDefault();
        flag=false;
    }else if(regex.test(lName.value)){
        cLastName.innerHTML="";
    }else{
        cLastName.innerHTML="only Alphabets are allowed!";
        e.preventDefault();
        flag=false;
    }
    if(email.value==""){
        cEmail.innerHTML="email required!";
        e.preventDefault();
        flag=false;
    }
    else {
        cEmail.innerHTML="";
    }
    if(phoneNo.value==""){
        cPhoneNo .innerHTML ="Mobile no required!";
        e.preventDefault();
        flag=false;
    }
    else if(regex2.test(phoneNo.value)){
        cPhoneNo.innerHTML = "";
    }
    else{
        cPhoneNo.innerHTML = "enter valid mobile no! </br>";
        e.preventDefault();
        flag=false;
    }
    if(password.value==""){
        cPassword.innerHTML = "password is required! </br>";
        e.preventDefault();
        flag=false;
    }
    else if(passRegex.test(password.value)){
        cPassword.innerHTML ="";
    }
    else{
        cPassword.innerHTML = "Invalid password! </br>";
        e.preventDefault();
        flag=false;
    }
    if(password.value==confirmPassword.value){
        cConfirmPassword.innerHTML ="";
    }
    else{
        cConfirmPassword.innerHTML = "password & confirm password not matched!";
        e.preventDefault();
        flag=false;
    }
    if(flag){
        let obj= {
            firstName: Name.value,
            lastName : lName.value,
            email : email.value,
            phoneNo : phoneNo.value,
            pass : password.value
        }
        console.log(obj);
        storage.push(obj);
        console.log(storage)
    }
    localStorage.setItem("data", JSON.stringify(storage))
})



//regular expression syntax
// ==> in square bracket we can pass which character are allowed and we can't use space, if we pass then space will also considered
//==> in curly bracket we can pass minlength and max length
// ==> eg. let regex=/^[a-zA-Z]{2,15}$/ where only alphabet are allowed and min length is 2 and max length is 15 
//==> eg2. regex2 = /^[6-9][0-9]{10}$/; first [6-9] is for first digit and in india phone no will starts with 6xxxxxxxxxxx

