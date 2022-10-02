    var email  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    var password = /^.{8,16}$/; // 8  a 16 digitos.
    


    $(document).ready(function () {
        $("#botonenvio").click(function () {
            
            var correo = $("#email").val();
            var contrasena = $("#password").val();
            
            if (correo == "") {
                $("#email").focus();
                $("#emailid").css("color", "red");
                return false;
            } else if (!email.test(correo)) {
                $("#email").focus();
                $("#emailid").css("color", "red");
                return false;
            } else if (contrasena == "") {
                $("#password").focus();
                $("#passwordid").css("color", "red");
                return false;
            } else if (!password.test(contrasena)) {
                $("#password").focus();
                $("#passwordid").css("color", "red");
                return false;
            } else {
                return true;
            }

        });
    });

$(document).ready(function () {
    $("#formulario").on("input", function () {
 
        $("#emailid").css("color", "white");
        $("#passwordid").css("color", "white");
    });
});
