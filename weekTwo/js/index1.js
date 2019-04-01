$(document).ready(() => {

  if (document.cookie.length !== 0) window.location.href = "home.html";

  $("#cat1").hide();

  $("#loginMenu").click(() => {
    $('#form').show();
    $("#loginForm").show();
    $("#signinForm").hide();
  });
  $("#signinMenu").click(() => {
    $('#form').show();
    $("#loginForm").hide();
    $("#signinForm").show();
  });
  $("#cancel").click(() => {
    $("#form").hide();
  });

  $('#homeMenu').click(() => {
    $('#home').show();
    $("#cat1").hide();
  });
});

(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDT-K_4Xkw4a-kbF7OFLdv9TT0mh7dh3oc",
    authDomain: "blog-c5747.firebaseapp.com",
    databaseURL: "https://blog-c5747.firebaseio.com",
    projectId: "blog-c5747",
    storageBucket: "blog-c5747.appspot.com",
    messagingSenderId: "30673458227"
  };
  firebase.initializeApp(config);
})();

var blogPost = firebase.database().ref('UserPost');
var url = firebase.storage().ref();

var i = 0;
blogPost.on("value", doc => {
  $("#sec1").empty();
  doc.forEach(data => {
    //console.log(cImg);
    var get = data.val();
    var div = document.createElement('div');
    // var img = document.createElement('div');

    /*  var gurl = url.child(get.pid);
       gurl.getDownloadURL().then(function(geturl){
         console.log(geturl);
         document.getElementById('sec1').innerHTML = "<img src='"+geturl+"'>";
       });*/
    //if(get.title!==undefined && get.shortDescription!==undefined && get.date!==undefined)
    // {
    div.setAttribute('id', 'p' + i);
    div.setAttribute('class', 'container');
    document.getElementById('sec1').appendChild(div);
    document.getElementById('p'+i).innerHTML = get.title+"<br/>"+get.shortDescription+"<br/>"+get.author+"<br/>"+get.date;
    //document.getElementById('p' + i).innerHTML = "${get.title} <br/> ${get.shortDescription} <br/> ${get.author} <br/> ${get.date}";
    i++;
    // }
  });
  if (i === 0) document.getElementById('sec1').innerHTML = "<h3>No Recent Posts</h3>";
});

var filter = type => {
  i = 0;
  $("#type").text(type);
  $("#sec2").empty();
  blogPost.on("value", doc => {
    doc.forEach(data => {
      var get = data.val();
      if (get.category === type) {
        var div = document.createElement('div');
        div.setAttribute('id', 'cp' + i);
        div.setAttribute('class', 'container');
        document.getElementById('sec2').appendChild(div);
        document.getElementById('cp' + i).innerHTML = get.title + "<br/>" + get.shortDescription + "<br/>" + get.author + "<br/>" + get.date;

        var idiv = document.createElement('div');
        idiv.setAttribute('id', 't' + i);
        //idiv.setAttribute('class','panel');
        document.getElementById('cp' + i).appendChild(idiv);
        document.getElementById('t' + i).innerHTML = "<br/>" + get.content + "<br/>";
        i++;
      }
    });
    if (i === 0) document.getElementById('sec2').innerHTML = "<h3>No Posts available</h3>";
    $("#home").hide();
    $("#cat1").show();
  });
};

// var uid = blogPost.child('UserPost').push().key;
// console.log(uid);
/* firebase.database().ref('UserPost/-Lb8LaqrmepCFVXeMiO0').set({
   author: "Priya",
 }, function(error) {
   if (error) {
     console.log("Failed");// The write failed...
   } else {
       console.log("successfully");// Data saved successfully!
   }
 });*/

var signin = firebase.database().ref();

var nameTxt = document.getElementById('name');
var emailTxt = document.getElementById('email');
var passwdTxt = document.getElementById('passwd');
//var email = emailTxt.value;
// var passwd = passwdTxt.value;
var key;

document.getElementById('signin').addEventListener('click', e => {

  e.preventDefault();
  var name = nameTxt.value;
  var email = emailTxt.value;
  var passwd = passwdTxt.value;
  var cpasswd = document.getElementById('cpasswd').value;

  if (passwd === cpasswd) {
    user(name, email, passwd);

    console.log(email + " " + passwd);
    document.getElementById('signinForm').reset();
    $("#signinForm").hide();
    $("#loginForm").show();
  } else alert("Password Mismatch");
});

var user = (name, email, passwd) => {
  var newUser = signin.child('Users').push().key;

  var data = {
    name: name,
    email: email,
    password: passwd,
    userId: newUser
  };

  var updates = {};
  updates['/Users/' + newUser] = data;
  firebase.database().ref().update(updates);
};
