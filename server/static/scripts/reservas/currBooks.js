$(document).ready(function(){
    console.log(currBooks.length)
    for (var i = 0; i < currBooks.length; i++) {
        var currBook = currBooks[i];
        var currBookID = currBook.ticketId;
        var currBookType = currBook.objectType;
        var currBookName = currBook.objectName;
        var currBookStart = currBook.startDate;
        var currBookEnd = currBook.endDate;

        let the = `<div class="single_row_user" id="`+ currBookID + `">
                    <div id="nombre">
                        <p>`+ currBookName +` </p>
                        <p>`+ currBookType + `</p>
                    </div>
                    <div  id="fecha">
                        <p>`+ currBookStart + `</p>
                        <p>`+ currBookEnd + `</p>
                    </div>
                    <div  id="botones">
                        <div><button id="qrCode" > <img src="{{url_for('static', filename='resources/qrCodes/1df7eac27c.png')}}" alt="QR Code" width="40" height="40"> </button></div>
                        <div><button id="row_delete" onclick="delete_button('`+ currBookID + `');"><HR WIDTH="100%" COLOR="black"></HR></button></div>
                    </div>
                    </div>
                    <br>        
                    <HR WIDTH="90%" COLOR="black"></HR>
                    <br>`;
        $('#currBookings').append(the);
        console.log("lol");
    }
})




function delete_button(id_val){
    if (confirm ("¿Estás seguro?")) {
        function move_rows(id_val){
            $(`#${id_val}`).remove();
        }
    
    setTimeout(move_rows, 800, id_val);
    $.ajax({
        url: 'api/deleteTicket', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "bookId" : id_val }),
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    
        });
}
    localtion.reload(true);
}
