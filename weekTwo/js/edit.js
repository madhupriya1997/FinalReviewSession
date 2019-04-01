$(document).ready(() => {
    
   
        $('#form div').removeClass('modal--hidden');

    $("#cancel").click(() => {
        $("#form div").addClass('modal--hidden');
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

var editPost;  

document.getElementById('edit').addEventListener('click', e => {
         
    e.preventDefault();
  
      var title = document.getElementById('E_title').value;
      var author = document.getElementById('E_author').value;
      var category = document.getElementById('E_category').value;
      
      blogPost.on("value",(doc) => {
        doc.forEach((data) =>
        {
          var get = data.val();
          if(get.uid===userId&&get.category===category&&get.title===title&&get.author===author)
          {
            document.getElementById('title').setAttribute('value',get.title);
            document.getElementById('shortDescription').setAttribute('value',get.shortDescription);
            document.getElementById('category').innerHTML = "<option value="+get.category+" selected>"+get.category+"</option>"
            document.getElementById('author').setAttribute('value',get.author);
            document.getElementById('content').innerHTML = get.content;
            editPost = get.pid;
          }
        });
        if(editPost===undefined)
        {
            alert("Post doesn't exist");
            window.location.href = "home.html";
        }
    });
      document.getElementById('editForm').reset();
      $("#form div").addClass('modal--hidden'); 

   });

   document.getElementById('post').addEventListener('submit', (e) =>
  {
      e.preventDefault();
      
    var title = document.getElementById('title').value;
    var shortDescription = document.getElementById('shortDescription').value;
    var category = document.getElementById('category').value;
    var author = document.getElementById('author').value;
    var content = document.getElementById('content').value;
   // var coverImage = document.getElementById('coverImage').value;

    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    insert(title,shortDescription,category,author,content,months[d.getMonth()]+" "+d.getDate()+","+d.getFullYear());
    document.getElementById('post').reset();

    window.location.href='home.html';
    
  });


  var insert = (title,shortDescription,category,author,content,date) =>
  {
     // var newUser = blogPost.child('UserPost').push().key;

      var data = {
          title : title,
          shortDescription : shortDescription,
          category : category,
          author : author,
          content : content,
          date : date,
          uid : userId,
          pid : editPost
      }

      var updates = {};
      updates['/UserPost/'+editPost] = data;
      firebase.database().ref().update(updates);
  }
