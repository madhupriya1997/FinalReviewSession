/*(function() {

    if (!sessionStorage.length) {
        // Ask other tabs for session storage
        localStorage.setItem('getSessionStorage', Date.now());
    };

    window.addEventListener('storage', function(event) {

        //console.log('storage event', event);

        if (event.key == 'getSessionStorage') {
            // Some tab asked for the sessionStorage -> send it

            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            localStorage.removeItem('sessionStorage');

        } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
            // sessionStorage is empty -> fill it

            var data = JSON.parse(event.newValue);

            for (key in data) {
                sessionStorage.setItem(key, data[key]);
            }

           // showSessionStorage();
        }
    });

    window.onbeforeunload = function() {
        //sessionStorage.clear();
    }
})();*/
$(document).ready(() =>{
 key = "username"
if(sessionStorage.getItem(key)!==null&&document.getElementById('info')!==null)
    document.getElementById('info').innerHTML = sessionStorage.getItem(key);
else
   {
       if((document.cookie).length===0)
          window.location.href = "index.html";
       else
          {
            var a = document.cookie;
            var value = a.substring(9,a.length);
            sessionStorage.setItem(key,value);
            if(document.getElementById('info')!==null)
                document.getElementById('info').innerHTML = sessionStorage.getItem(key);
          }
   }
   if((document.cookie).length===0)
   {
     sessionStorage.removeItem("key");
      sessionStorage.removeItem(key);
      localStorage.removeItem("id");
   }
    });

var info = () =>
{
//console.log(key);
   sessionStorage.removeItem(key);
   sessionStorage.removeItem("key");
   document.cookie =  "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   localStorage.removeItem("id");
    window.location.href = "index.html";
 
}