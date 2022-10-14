    var email  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    var password = /^.{8,16}$/; // 8  a 16 digitos.
    


    $(document).ready(function () {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has('fromVerify')) {
            $('.prevMsg').append('<p>Verification was successfull</p>');
        }
        if (urlParams.has('error')) {
            $('.prevMsg').append('<p style="color:#FF0000";>User is alredy verified</p>');
        }


        $("#sendButton").click(function () {
            
            var correo = $("#email").val();
            var contrasena = $("#password").val();
            

            switch (true) {
                case (correo == ""):
                    $("#email").focus();
                    $("#emailId").css("color", "red");
                    break;
                case (contrasena == ""):
                    $("#password").focus();
                    $("#passwordId").css("color", "red");
                    break;
                default:
                    break;
            }

        });

    });


$(document).ready(function () {
    $("#password").on("input", function () {
        $("#passwordId").css("color", "white");
    });
    $("#email").on("input", function () {
        $("#emailId").css("color", "white");
    });
});

/*@app.route("/api/login", methods=['POST'])
def login(name=None):
    body = request.get_json()
    cur = get_db().cursor()
    resp = make_response()
    if "email" in body:
        user = cur.execute('''SELECT Users.userId, 
                                     Users.email,
                                     Users.firstName,
                                     Users.lastName,
                                     Users.hashPassword,
                                     Users.admin,
                                     Users.blocked
                                     FROM Users WHERE email = ?''', #es sensible que el usuario tenga acceso a su id?
                           (body['email'],)).fetchone()
    elif "username" in body:
        user = cur.execute('''SELECT Users.userId, 
                                     Users.email,
                                     Users.firstName,
                                     Users.lastName,
                                     Users.hashPassword,
                                     Users.admin,
                                     Users.blocked
                                     FROM Users WHERE username = ?''', #es sensible que el usuario tenga acceso a su id?
                           (body['username'],)).fetchone()
    else:
        user = None

    if user is None:
        respBody = json.dumps({"authorized":False, "errorId":101}) #, "desc":"Invalid username or email"
    elif user["blocked"]:
        respBody = json.dumps({"authorized":False, "errorId":102}) #, "desc":"User is blocked"
    elif compare_digest(user["hashPassword"], body["password"]):
        respBody = {"authorized":True}

        #respBody = render_template('main.html', name=name)
        user.pop("hashPassword")
        resp.set_cookie("JWT",jwt.encode(user, jwtKey, algorithm="HS256"))
    else:
        respBody = json.dumps({"authorized":False, "errorId":103}) #, "desc":"Wrong pwd"

    resp.set_data(respBody)

    return resp*/

    //ajax para el login

    $(document).ready(function () {
        $("#sendButton").click(function () {
            var correo = $("#email").val();
            if (email.test(correo) == true) {
                $.ajax({
                    url: "/api/login",
                    type: "POST",
                    data: JSON.stringify({
                        "email": $("#email").val(),
                        "password": $("#password").val()
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data.authorized) {
                            window.location.replace("/menu");
                        } else {
                            $("#error").html("Usuario o contraseña incorrectos");
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#error").html("Usuario o contraseña incorrectos");
            
                    }
                });
            }
            else {
                $.ajax({
                    url: "/api/login",
                    type: "POST",
                    data: JSON.stringify({
                        "username": $("#email").val(),
                        "password": $("#password").val()
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data.authorized) {
                            window.location.replace("/menu");
                        } else {
                            $("#error").html("Usuario o contraseña incorrectos");
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#error").html("Usuario o contraseña incorrectos");
            
                    }
                });
            }
        });
    });
