$(document).ready(function(){
    var iframeInicio = '<iframe src="reservas.html"  scrolling="no" title="inicio.html "  id="i01"></iframe>'
    $('#contIframe').append(iframeInicio);
    var iframeCurrBooks = '<iframe src="currBooks.html"  scrolling="no" title="currBooks.html "  id="i03"></iframe>'
    var iframeStats = '<iframe src="stats.html"  scrolling="no" title="reservas.html "  id="i02"></iframe>'
    $('#newbook').click(function(){
        alert("new book");
        $('#contIframe').empty();
        $('#contIframe').append(iframeInicio);
    });
    $('#currbook').click(function(){
        alert("curr books");
        $('#contIframe').empty();
        $('#contIframe').append(iframeCurrBooks);
    });
    $('#stats').click(function(){
        alert("stats");     
        $('#contIframe').empty();
        $('#contIframe').append(iframeStats);
    });
});
