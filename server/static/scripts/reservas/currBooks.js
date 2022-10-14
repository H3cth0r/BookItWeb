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
                    <div class="single_row_user" id="nombre">
                        <p>`+ currBookName +` </p>
                        <p>`+ currBookType + `</p>
                    </div>
                    <div class="single_row_user" id="fecha">
                        <p>`+ currBookStart + `</p>
                        <p>`+ currBookEnd + `</p>
                    </div>
                    <div class="single_row_user" id="botones">
                        <div><button id="qrCode" > <img src="{{ url_for('static',filename='resources/qr.png') }}" alt="QR Code" width="30" height="30"> </button></div>
                        <div><button id="row_delete" onclick="delete_button('`+ currBookID + `');">Delete</button></div>
                    </div>
                    <br>`;
        $('#currBookings').append(the);
        console.log("lol");
    }
})




function delete_button(id_val){
    if (confirm ("¿Estás seguro?")) {
    anime({
        targets: `#${id_val}`,
        translateX: 1500,
        easing: "easeInOutCubic"
    });
    setTimeout(move_rows, 800, id_val);
    $.ajax({
        url: 'api/edit/room', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "bookId" : currBookID }),
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    
        });
}
    localtion.reload(true);
}
