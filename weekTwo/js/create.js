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

  var blogPost = firebase.database().ref();

 

  document.getElementById('post').addEventListener('submit', (e) =>
  {
      e.preventDefault();

    /*var title = title;
    var shortDescription = shortDescription;
    var category = category;
    var author = author;
    var content = content;*/

    var title = document.getElementById('title').value;
    var shortDescription = document.getElementById('shortDescription').value;
    var category = document.getElementById('category').value;
    var author = document.getElementById('author').value;
    var content = document.getElementById('content').value;
    //var coverImage = document.getElementById('coverImage').value;

    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    insert(title,shortDescription,category,author,content,months[d.getMonth()]+" "+d.getDate()+","+d.getFullYear());
    document.getElementById('post').reset();

    window.location.href = "home.html";
  });

  var userId = sessionStorage.getItem('key');
  var url;

  var insert = (title,shortDescription,category,author,content,date) =>
  {
      var newUser = blogPost.child('UserPost').push().key;


      var data = {
          title : title,
          shortDescription : shortDescription,
          category : category,
          author : author,
          content : content,
          //coverImage : url,
          date : date,
          uid : userId,
          pid : newUser
      }

      var storage = firebase.storage().ref(newUser);
      var file = $('#coverImage').prop('files')[0];
      storage.put(file);
      console.log(file);

      var updates = {};
      updates['/UserPost/'+newUser] = data;
      firebase.database().ref().update(updates);
  }
   
  

 