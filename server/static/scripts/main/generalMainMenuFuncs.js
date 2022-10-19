$( document ).ready(function() {
    window.onmessage = function(e) {
        if (e.data == 'hello') {
            alert('It works!');
       
        }
    };
    hiddeMenu();
    
    //document.getElementsByTagName("html")[0].style.visibility = "visible";
});


$(window).on('load', function() {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
});

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function hiddeMenu () {
    var users = document.cookie.split("=");
    var token = users[1];
   
    var decoded = parseJwt(token);
  
    if (decoded.admin < 1 ){
        document.getElementById("adminU").style.display = "none";
        document.getElementById("adminS").style.display = "none";
        document.getElementById("adminD").style.display = "none";
        document.getElementById("adminT").style.display = "none";

    }
}