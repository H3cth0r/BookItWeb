
    var name1 = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    var surname = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    var username = /^[a-zA-Z0-9\_\-]{4,16}$/; // Letras, numeros, guion y guion_bajo
    var email  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var emailTec  = /^[a-zA-Z0-9_.+-]+@tec.mx$/;
    var password = /^.{8,16}$/; // 4 a 16 digitos.
    var age1  = /^[0-9]{1,2}$/;


    $(document).ready(function () {
        $("#botonenvio").click(function () {
            var nombre = $("#name").val();
            var apellido = $("#surname").val();
            var usuario = $("#username").val();
            var birthdate = $("#birthdate").val();
            var organizacion = $("#organization").val();
            var correo = $("#email").val();
            var age = $("#age").val();
            var contrasena = $("#password").val();
            var contrasena2 = $("#password2").val();


            switch (true) {
                case (nombre == ""):
                    $("#name").focus();
                    $("#nameid").css("color", "red");
                case (!name1.test(nombre)):
                    $("#name").focus();
                    $("#nameid").css("color", "red");
                case (apellido == ""):
                    $("#surname").focus();
                    $("#surnameid").css("color", "red");
                case (!surname.test(apellido)):
                    $("#surname").focus();
                    $("#surnameid").css("color", "red");
                case (usuario == ""):
                    $("#username").focus();
                    $("#usernameid").css("color", "red");
                case (!username.test(usuario)):
                    $("#username").focus();
                    $("#usernameid").css("color", "red");
                case (birthdate == ""):
                    $("#birthdate").focus();
                    $("#birthdateid").css("color", "red");
                case (organizacion == ""):
                    $("#organization").focus();
                    $("#organizationid").css("color", "red");
                case (correo == ""):
                    $("#email").focus();
                    $("#emailid").css("color", "red");
                case (!email.test(correo)):
                    $("#email").focus();
                    $("#emailid").css("color", "red");
                case (age == ""):
                    $("#age").focus();
                    $("#ageid").css("color", "red");
                case (!age1.test(age)):
                    $("#age").focus();
                    $("#ageid").css("color", "red");
                case (contrasena == ""):
                    $("#password").focus();
                    $("#passwordid").css("color", "red");
                case (!password.test(contrasena)):
                    $("#password").focus();
                    $("#passwordid").css("color", "red");
                case (contrasena2 == ""):
                    $("#password2").focus();
                    $("#password2id").css("color", "red");
                case (!password.test(contrasena2)):
                    $("#password2").focus();
                    $("#password2id").css("color", "red");
                case (contrasena != contrasena2):
                    $("#password2").focus();
                    $("#password2id").css("color", "red");
                default:
                    return true;

           
            }
        });
    });

$(document).ready(function () {
    $("#formulario").on("input", function () {
        $("#nameid").css("color", "white");
        $("#surnameid").css("color", "white");
        $("#usernameid").css("color", "white");
        $("#birthdateid").css("color", "white");
        $("#organizationid").css("color", "white");
        $("#emailid").css("color", "white");
        $("#ageid").css("color", "white");
        $("#passwordid").css("color", "white");
        $("#passwordid2").css("color", "white");
    });
});


// hash256 

function hash256() {
    var hash = SHA256($("#password").val());
    $("#password").val(hash);

    console.log(hash);

}

//ajax 


/*
@app.route("/api/register")
def register():
    body = request.get_json()
    cur = get_db().cursor()
    emailSearch = cur.execute("SELECT Users.userId FROM Users WHERE email = ?", (body["email"],))
    usernameSearch = cur.execute("SELECT Users.userId FROM Users WHERE username = ?", (body["username"],))
    if emailSearch is not None:
        respBody = json.dumps({"registered":False, "errorId":110})#, "desc":"Email is already registered"
    elif usernameSearch is not None:
        respBody = json.dumps({"registered":False, "errorId":111})#, "desc":"Username is already registered"
    else:
        
        cur.execute('''INSERT INTO "main"."Users"
                       ("dateRegistered", "firstName", "lastName", "username", "birthDate", "organization", 
                       "email", "ocupation", "countryId", "hashPassword")
                       VALUES ('?', '?', '?', '?', '?', '?', '?', '?', ?, '?');''',
                       (datetime.now(timezone(-timedelta(hours=5))).strftime("%Y-%m-%d %H:%M:%S"), body["firstName"], body["lastName"], body["username"],
                       body["birthDate"], body["organization"], body["email"], body["ocupation"], body["countryId"], body["hashPassword"]))
        respBody = json.dumps({"registered":True})*/

$(document).ready(function () {
    $("#botonenvio").click(function () {
        var nombre = $("#name").val();
        var apellido = $("#surname").val();
        var usuario = $("#username").val();
        var birthdate = $("#birthdate").val();
        var organizacion = $("#organization").val();
        var correo = $("#email").val();
        var age = $("#age").val();
        var contrasena = $("#password").val();
        var contrasena2 = $("#password2").val();

        var data = {
            "firstName": nombre,
            "lastName": apellido,
            "username": usuario,
            "birthDate": birthdate,
            "organization": organizacion,
            "email": correo,
            "ocupation": age,
            "countryId": 1,
            "hashPassword": contrasena
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:5000/api/register",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    });
});