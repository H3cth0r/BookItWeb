$(document).ready(function () {
    img = '<img src="server/static/resources/qrCodes/'+qrCode +'" alt="QR Code"/>';
    imgprof = '<img src="server/static/resources/profile/'+ userID +'" alt="QR Code"/>';
    $("#imagenes").append(img);
    $("#imagenes").append(imgprof);
    ticketid = '<p> #'+ticketId+'</p>';
    $("#ticketsid").append(ticketid);
    datos_usuario = `<p>{</p>
                    <p> "reservation": {</p>
                    <p> "user": {</p>  
                    <p>"name":"`+name1+`"</p>
                    <p>"surname":"`+surname+`"</p>
                    <p>"birth":"`+birthdate+`"</p>
                    <p>"organization":"`+organization+`"</p>
                    <p>}</p>
                    <p>"type":"`+type+`"</p>
                    <p>"start_date":"`+start_date+`"</p>
                    <p>"end_date":"`+end_date+`"</p>
                    <p>"location":"`+location+`"</p>
                    <p>}</p>
                    <p>}</p>`;
    $("#datos_usuario").append(datos_usuario);

    dias = `<p> `+start_date+` -> `+end_date+`</p>`;
    $("#dias").append(dias);
    });