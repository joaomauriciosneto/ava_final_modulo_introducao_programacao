
// function to show/hide password (index.html) : password field

function showHidePassword1() {
   let pass = document.getElementById('password1');
   if (password1.type == 'password') {
      password1.type = 'text';
   }else {
      password1.type = 'password';
   }
}

// function to show/hide password (create_account.html) : password field

function showHidePassword2() {
   let passPass = document.getElementById('password2');
   if (password2.type == 'password') {
      password2.type = 'text';
   }else {
      password2.type = 'password';
   }
}

// function to show/hide password (create_account.html) : confirm your password field

function showHidePassword3() {
   let passConfPass = document.getElementById('password3');
   if (password3.type == 'password') {
      password3.type = 'text';
   }else {
      password3.type = 'password';
   }
}

// function register (create_account.html)

function register(){
   
   let userAccount = formAccount.txtUserNameAccount.value;
   let passAccount = formAccount.password2.value;
   let confPass = formAccount.password3.value;

   if(userAccount == "" || userAccount.length <= 3){
      alert('UserName must be at least 4 characters!');
      //formAccount.txtUserNameAccount.focus();
      return false;
   }

   if(userAccount.search(/[^a-z0-9]/i) != -1){
      alert('Special characters are not allowed in this field!');
      formAccount.txtUserNameAccount.focus();
      return false;
   }

   if(userAccount.search(/\s/g) != -1){
      alert('This field cannot have a blank space!');
      formAccount.password2.focus();
      return false;
   }

   if(passAccount == "" || passAccount.length <= 3){
      alert('Password must be at least 4 characters!');
      return false;
   }

   if(passAccount.search(/\s/g) != -1){
      alert('This field cannot have a blank space!');
      formAccount.password2.focus();
      return false;
   }

   if(confPass == "" || confPass.length <= 3){
      alert('To confirm you need at least 4 characters!');
      formAccount.password3.focus();
      return false;
   }

   if(passAccount != confPass){
      alert('Passwords with different values!')
      formAccount.password2.focus();
      return false;
   }

   let userList = JSON.parse(localStorage.getItem('userList') || '[]')

   for(let indice in userList){
      if(userAccount == userList[indice].userCad){
         alert('User already exist!')
         document.getElementById('txtUserNameAccount').value = ''
         document.getElementById('password2').value = ''
         document.getElementById('password3').value = ''
         document.getElementById('txtUserNameAccount').focus()
         return false
      }
   }

   userList.push(
   {
      userCad: txtUserNameAccount.value,
      passCad: password2.value,
   }
   )   

   localStorage.setItem('userList', JSON.stringify(userList))
   alert('Registered successfully!')
   window.location.href = 'index.html'   
}

// function login (index.html)

function login(){

   let userIndex = formIndex.txtUserName.value;
   let passIndex = formIndex.txtPassword.value;

   if(userIndex == "" || userIndex.length <= 3){
      alert('UserName must be at least 4 characters!');
      formIndex.txtUserName.focus();
      return false;
   }

   if(passIndex == "" || passIndex.length <= 3){
      alert('Password must be at least 4 characters!');
      formIndex.txtPassword.focus();
      return false;
   } 

   let userList = []
   let userValid = {
      userName: '',
      password: ''
   }

   let txtUserName = document.getElementById('txtUserName')
   let password1 = document.getElementById('password1')
   userList = JSON.parse(localStorage.getItem('userList'))

   userList.forEach((item) => {
      if(txtUserName.value == item.userCad && password1.value == item.passCad){
         userValid = {
            userName: item.userCad,
            password: item.passCad
         }
      }
   })

   if(txtUserName.value == userValid.userName && password1.value == userValid.password){
      location.href = 'home.html'

      let token = Math.random().toString(16).substring(2)
      localStorage.setItem('token', token)

      localStorage.setItem('loggedUser', JSON.stringify(userValid))
   }else {
      alert('Username or password is invalid!')
      txtUserName.focus()
   }
}

// settings labels (index.html)
//--------------- UserName---------------
let labelFocusUserName = document.querySelector('.labelNames')
let labelOnBlurUserName = document.querySelector('.labelNames')

function focusFildeUserNameIndex(){
   labelFocusUserName.setAttribute('style', 'color: #01AEAA;')
}

function onBlurFildeUserNameIndex(){
   labelOnBlurUserName.setAttribute('style', 'color: white')
}
//-------------- Password -----------------
let labelFocusUserName1 = document.querySelector('.labelNames1')
let labelOnBlurUserName1 = document.querySelector('.labelNames1')

function focusFildeUserNameIndex1(){
   labelFocusUserName1.setAttribute('style', 'color: #01AEAA;')
}

function onBlurFildeUserNameIndex1(){
   labelOnBlurUserName1.setAttribute('style', 'color: white')
}
// settings labels (create_account.html)
//--------------- UserName -----------------
let labelFocusUserName2 = document.querySelector('.labelNames2')
let labelOnBlurUserName2 = document.querySelector('.labelNames2')

function focusFildeUserNameIndex2(){
   labelFocusUserName2.setAttribute('style', 'color: #01AEAA;')
}

function onBlurFildeUserNameIndex2(){
   labelOnBlurUserName2.setAttribute('style', 'color: white')
}
//-------------- Password -----------------
let labelFocusUserName3 = document.querySelector('.labelNames3')
let labelOnBlurUserName3 = document.querySelector('.labelNames3')

function focusFildeUserNameIndex3(){
   labelFocusUserName3.setAttribute('style', 'color: #01AEAA;')
}

function onBlurFildeUserNameIndex3(){
   labelOnBlurUserName3.setAttribute('style', 'color: white')
}
//-------------- Confirm Password -----------------
let labelFocusUserName4 = document.querySelector('.labelNames4')
let labelOnBlurUserName4 = document.querySelector('.labelNames4')

function focusFildeUserNameIndex4(){
   labelFocusUserName4.setAttribute('style', 'color: #01AEAA;')
}

function onBlurFildeUserNameIndex4(){
   labelOnBlurUserName4.setAttribute('style', 'color: white')
}
