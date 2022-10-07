

$(document).ready(function(){
    let pick = document.cookie;
    var iframeInicio = '<iframe src="reservas.html"  scrolling="no" title="inicio.html "  id="i01"></iframe>'
    $('#contIframe').append(iframeInicio);
    var iframeCurrBooks = '<iframe src="currBooks.html"  scrolling="no" title="currBooks.html "  id="i03"></iframe>'
    var iframeStats = '<iframe src="stats.html"  scrolling="no" title="reservas.html "  id="i02"></iframe>'

    if (pick == "currBooks"){
        $('#contIframe').empty();
        $('#contIframe').append(iframeCurrBooks);
    }
    else if (pick == "stats"){
        $('#contIframe').empty();
        $('#contIframe').append(iframeStats);
    }
    else{
        $('#contIframe').empty();
        $('#contIframe').append(iframeInicio);
    }
});
