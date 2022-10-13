$( document ).ready(function() {
    window.onmessage = function(e) {
        if (e.data == 'hello') {
            alert('It works!');
        }
    };

    
});