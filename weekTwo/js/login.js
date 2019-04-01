
var key = "username";
var username;
var users = firebase.database().ref('Users');


document.getElementById('login').addEventListener('click', e => {
         
  e.preventDefault();

    var login_email = document.getElementById('login_email').value;
    var login_password = document.getElementById('login_passwd').value;
    
    users.on("value", (snapshot) => {
      console.log(snapshot.val());
      snapshot.forEach((data) => {
          console.log(data.val());
          var val = data.val();
          console.log(val);
          console.log(val.email===login_email);
          console.log(val.email+" "+val.password);
          if(val.email===login_email)
            {
                if(val.password===login_password)
                {
                   document.cookie = key + "=" + val.name; 
                   //document.cookie = "id" + "=" + val.userId;
                   localStorage.setItem("id",val.userId);
                   sessionStorage.setItem(key,val.name);
                   sessionStorage.setItem("key",val.userId);
                   username = val.name;
                }
               else
                   alert("Invalid Password");
            }
      });
      if(sessionStorage.getItem(key)===null&&username!==undefined)
           alert("Account doesn't exists");
      check();
   }, function (error) {
       console.log("Error: " + error.code);
    });

    document.getElementById('loginForm').reset();

   // check(login_email);
 });

 var check = () =>
 {   
     console.log();
  console.log(sessionStorage.getItem(key)!==null);
   if(sessionStorage.getItem(key)!==null)
   {
      window.location.href="home.html";
   }
  // info();
 }

