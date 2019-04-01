$(document).ready(() => {
    $("#cat1").hide();

    $('#homeMenu').click(function(){
        $('#home').show();
        $("#cat1").hide();
    });

  });

( function()
 {// Initialize Firebase
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

var userId = sessionStorage.getItem('key');
if(userId===null)
  userId = localStorage.getItem("id");

var i=0;
blogPost.on("value",(doc) => {
  $("#sec1").empty();
    doc.forEach((data) =>
    {
      var get = data.val();
      if(get.uid===userId)
      {
       var div = document.createElement('div');
       div.setAttribute('id','p'+i);
       div.setAttribute('class','container');
       document.getElementById('sec1').appendChild(div); 
       document.getElementById('p'+i).innerHTML = get.title+"<br/>"+get.shortDescription+"<br/>"+get.author+"<br/>"+get.date;
       i++;
      }
    });
    if(i===0)
        document.getElementById('sec1').innerHTML = "<h3>No Recent Posts</h3>";
});

var filter = (type) => {
  i=0;
  $("#type").text(type);
  $("#sec2").empty();
  blogPost.on("value",(doc) => {
    doc.forEach((data) =>
    {
      var get = data.val();
      if(get.uid===userId&&get.category===type )
      {
       var div = document.createElement('div');
       div.setAttribute('id','cp'+i);
       div.setAttribute('class','container');
       document.getElementById('sec2').appendChild(div);
       document.getElementById('cp'+i).innerHTML = get.title+"<br/>"+get.shortDescription+"<br/>"+get.author+"<br/>"+get.date;

       var idiv = document.createElement('div');
       idiv.setAttribute('id','t'+i);
      // idiv.setAttribute('class','panel');
       document.getElementById('cp'+i).appendChild(idiv);
       document.getElementById('t'+i).innerHTML = "<br/>"+get.content+"<br/>";
       i++;
      }
    });
    if(i===0)
        document.getElementById('sec2').innerHTML = "<h3>No Posts available</h3>";
    $("#home").hide();
    $("#cat1").show();
});
}



  