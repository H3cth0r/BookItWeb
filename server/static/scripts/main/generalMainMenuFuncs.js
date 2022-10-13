$( document ).ready(function() {
    window.onmessage = function(e) {
        if (e.data == 'hello') {
            alert('It works!');
        }
    };
    //document.getElementsByTagName("html")[0].style.visibility = "visible";
});


$(window).on('load', function() {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
});
