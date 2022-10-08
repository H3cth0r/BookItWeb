from flask import Flask, request, g, make_response, redirect, render_template
from flask_mail import Mail, Message
from hashlib import new, sha256, sha1
from hmac import compare_digest
import json
import jwt
import sqlite3
import base64
from datetime import datetime, timedelta, timezone
from qrcode import QRCode, constants

print("Server started")

mail = Mail()
app = Flask(__name__)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'bookmebot@gmail.com'
app.config['MAIL_PASSWORD'] = 'czufauxtrhvdwnic'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

DATABASE = 'DB\BookMeDB.db'
jwtKey = 'BooKMeIsCool'
hashedAdminPwd = sha256(jwtKey.encode('utf-8'))
baseUrl = "http://4.228.81.149:5000"
#app.config['SECRET_KEY'] = 'super-secret'

def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = make_dicts
    return db

def createJWT(jsnDict):
    return jwt.encode(jsnDict, jwtKey, algorithm="HS256")
    
def jwtValidated(token):
    try:
        jwt.decode(token, jwtKey, algorithms="HS256")
    except jwt.InvalidSignatureError:
        print("There was an attempt to use an invalid JWT Signature")
        return False
    except Exception as e:
        print(e)
        return False
    else:
        return True

def genQr(code):
    qr = QRCode(version=1,
                error_correction=constants.ERROR_CORRECT_L,
                box_size=8,
                border=1,
    )
    qr.add_data(baseUrl + "/api/getTicket/" + code[:10]) #would idealy show ticket html
    qr.make(fit=True)
    img = qr.make_image(fill_color='black', black_color='white')
    print(type(img))
    img.save("static/resources/qrCodes/" + code + ".png")

'''-----------------------'''
'''----FRONTEND ROUTES----'''
'''-----------------------'''

'''---VIEWS---'''

@app.route("/")
def mainView(): 
    return render_template('main.html')

@app.route("/authPrev", methods=["GET"])
def authPrevView():
    if True:
        return render_template('LogandReg.html')

@app.route("/login", methods=["GET"])
def loginView():
    if True:
        return render_template('log.html')

@app.route("/register", methods=["GET"])
def registerView():
    if True:
        return render_template('reg.html')

@app.route("/logout", methods=['GET'])
def logoutView(name=None):
    resp = make_response(redirect('/', ))
    resp.set_cookie("JWT", expires=0)
    resp.set_cookie("testCookie", expires=0)
    resp.set_cookie("jwt", expires=0)
    return resp

@app.route("/register/verifying", methods=["GET"])
def registerVerifying():
    if True:
        return render_template('verify.html')

@app.route("/register/verify/<hashKey>", methods=["GET"])
def registerVerifyView(hashKey):
    if True:
        cur = get_db().cursor()
        u = cur.execute('''SELECT * FROM ToVerify WHERE hashKey = ? ORDER BY id DESC''').fetchone()
        dateRegistered = (datetime.now(timezone.utc) - timedelta(hours=5)).strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        cur.execute('''INSERT INTO "main"."Users" ("dateRegistered", "firstName", "lastName", "username", "birthDate",
                       "organization", "email", "ocupation", "countryId", "hashPassword", "admin", "blocked", "deleted") 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);''',
                       (dateRegistered, u["firstName"], u["lastName"], u["username"], u["birthDate"],
                       u["organization"], u["email"], u["ocupation"], u["countryId"], u["hashPassword"], 0, 0, 0))
        return redirect("/login", code=302) # maybe redirect to confirmation

'''---RESERVATIONS---'''

@app.route("/reservations/currentBookings", methods=["GET"])
def currentBookingsView():
    if jwtValidated(request.cookies.get('jwt')):
        body = {}
        userData = jwt.decode(request.cookies.get("jwt"), jwtKey, algorithms="HS256")
        if "ignoreTicket" in body:
            ignoreTicket = body["ignoreTicket"]
        else:
            ignoreTicket = "-1"

        cur = get_db().cursor()
        tickets = cur.execute('''SELECT ticketId, objectType, objectName, startDate, endDate FROM ReservationTicket 
                                 WHERE ReservationTicket.userId = ?
                                 AND ReservationTicket.endDate > datetime('now', '-5 hours') 
                                 AND ticketId != ?
                                 ORDER BY startDate''', 
        (userData["userId"], ignoreTicket)).fetchall()
        print(tickets)
        return render_template('currBooks.html', tickets=tickets)
    else:
        return redirect("/login", code=302)


'''---ADMIN---'''

# Show new object view
@app.route("/admin/nuevoObjeto", methods=["GET"])
def newObjectView():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        return render_template('objeto_nuevo.html')
    else:
        return redirect("/login", code=302)

# Show hardware view
@app.route("/admin/materialesHardware", methods=["GET"])
def getHardwareView():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        cur = get_db().cursor()
        hardware = cur.execute('''
        SELECT DT.*, COUNT(inClassId) as quantity FROM
        (SELECT * FROM HardwareClass WHERE deleted = 0) DT
        LEFT JOIN HardwareObjects ON (DT.classId = HardwareObjects.classId)
        GROUP BY DT.classId
        ''').fetchall()

        return render_template('materialesHard.html', hardW=hardware)
    else:
        return redirect("/login", code=302)

# Show software view
@app.route("/admin/materialesSoftware", methods=["GET"])
def getSoftwareView():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        cur = get_db().cursor()
        software = cur.execute('''
        SELECT DT.*, COUNT(inClassId) as quantity FROM
        (SELECT * FROM SoftwareClass WHERE deleted = 0) DT
        LEFT JOIN SoftwareObjects ON (DT.classId = SoftwareObjects.classId)
        GROUP BY DT.classId
        ''').fetchall()
        return render_template('materialesSoftware.html', softW=software)
    else:
        return redirect("/login", code=302)

# Show rooms view
@app.route("/admin/materialesSalas", methods=["GET"])
def getSalasView():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        cur = get_db().cursor()
        rooms = cur.execute('''
        SELECT * FROM Rooms WHERE deleted = 0
        ''').fetchall()
        return render_template('materialesSalas.html', salas=rooms)
    else:
        return redirect("/login", code=302)

# Show rooms view
@app.route("/admin/users", methods=["GET"])
def getUsersView():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        cur = get_db().cursor()
        rooms = cur.execute('''
        SELECT * FROM Users WHERE deleted = 0
        ''').fetchall()
        return render_template('materialesSalas.html', salas=rooms)
    else:
        return redirect("/login", code=302)

# Show users view
@app.route("/admin/tickets", methods=["GET"])
def getTicketsView():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        cur = get_db().cursor()
        tickets = cur.execute('''
        SELECT DT.*, Users.username FROM
        (SELECT * FROM ReservationTicket WHERE weight > 0) DT
        LEFT JOIN Users ON (Users.userId =  DT.userId)
        ''').fetchall()
        return render_template('reservaciones.html', res=tickets)
    else:
        return redirect("/login", code=302)


'''-------------------'''
'''--------API--------'''
'''-------------------'''

'''---USER MANAGEMENT---'''

# --- auth errors ---
# 101 invalid email
# 102 blocked
# 103 wrong pwd
# Authenticate a user
# Expecting request: {("username":newUsername || "email":newEmail), "hashPassword":hashPassword}
# Response: {"available":bool}
# Optional response: {"errorId":errorId}
@app.route("/api/login", methods=['POST'])
def login(name=None):
    body = request.get_json()
    cur = get_db().cursor()
    resp = make_response()
    if "email" in body:
        user = cur.execute('''SELECT Users.userId, 
                                     Users.email,
                                     Users.username,
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
                                     Users.username,
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
    elif user["hashPassword"] == body["password"]:
        user.pop("hashPassword")
        user["exp"] = datetime.now(timezone.utc) + timedelta(days=7)
        respBody = json.dumps({"authorized":True})
        resp.set_cookie("jwt", jwt.encode(user, jwtKey, algorithm="HS256"))
    else:
        respBody = json.dumps({"authorized":False, "errorId":103}) #, "desc":"Wrong pwd"

    resp.set_data(respBody)
    return resp


@app.route("/api/logout", methods=['GET'])
def logout(name=None):
    resp = make_response('main.html')
    resp.set_cookie("JWT", expires=0)
    resp.set_cookie("testCookie", expires=0)
    resp.set_cookie("jwt", expires=0)
    return resp
# --- register errors ---
# 110 email already registered
# 111 email already registered

# Expecting request:
{
  "username":"nonwiz",
  "firstName":"Victor",
  "lastName":"Portilla",
  "birthDate":"2002-11-01 00:00:00.000",
  "organization":"Tec",
  "email":"a01659198@tec.mx",
  "ocupation":"Estudihambre",
  "countryId":107,
  "hashPassword":"5f77c2500f56fe1a4abe06bf961012a3ea513ce8fbbbf4fec4d58339f95630d9"
}

@app.route("/api/register", methods=["POST"])
def register():
    body = request.get_json()
    cur = get_db().cursor()
    emailSearch = cur.execute("SELECT Users.userId FROM Users WHERE email = ?", (body["email"],)).fetchone()
    usernameSearch = cur.execute("SELECT Users.userId FROM Users WHERE username = ?", (body["username"],)).fetchone()
    if emailSearch is not None:
        print(emailSearch)
        respBody = json.dumps({"registered":False, "errorId":110})#, "desc":"Email is already registered"
    elif usernameSearch is not None:
        respBody = json.dumps({"registered":False, "errorId":111})#, "desc":"Username is already registered"
    else:
        
        cur.execute('''INSERT INTO "main"."Users"
                       ("dateRegistered", "firstName", "lastName", "username", "birthDate", "organization", 
                       "email", "ocupation", "countryId", "hashPassword")
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);''',
                       (datetime.now(timezone(-timedelta(hours=5))).strftime("%Y-%m-%d %H:%M:%S"), body["firstName"], body["lastName"], body["username"],
                       body["birthDate"], body["organization"], body["email"], body["ocupation"], body["countryId"], body["hashPassword"]))
        respBody = json.dumps({"registered":True})
    return respBody

'''
{
  "quantity":3,
  "name":"iPhone 11",
  "operativeSystem":"iOS 12",
  "description":"Núcleos = 4\nRAM = 6GB\nSSD = 64GB",
  "prefix":"IPHONE11",
  "maxDays":"15"
}
'''
@app.route("/api/newHardware", methods=["POST"])
def newHardware():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
    
        cur.execute('''INSERT INTO "main"."HardwareClass" ("name", "operativeSystem", "description", "prefix","maxDays")
                            VALUES (?, ?, ?, ?, ?);''',
                            (body["name"], body["operativeSystem"], body["description"], body["prefix"], 
                            body["maxDays"]))

        classId = cur.lastrowid
        for i in range(1, body["quantity"]+1):
            cur.execute('''INSERT INTO HardwareObjects (classId, inClassId) VALUES (?, ?)''', (classId, i))
            cur.execute('''INSERT INTO AvailableObjects (hO) VALUES (?)''', (cur.lastrowid, ))        
        return json.dumps({"saved":True})

    return json.dumps({"saved":False})

'''
{
  "quantity":5,
  "name":"Adobe Photoshop",
  "brand":"Adobe",
  "operativeSystem":"Windows 10+",
  "description":"Adobe XD apoya al diseño vectorial y a los sitios web wireframe, creando prototipos simples e interactivos con un solo clic.",
  "prefix":"ADBXDW10",
  "maxDays":"12"
}
'''
@app.route("/api/newSoftware", methods=["POST"])
def newSoftware():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()

        cur.execute('''INSERT INTO "main"."SoftwareClass" ("brand", "name", "description", "operativeSystem", "prefix", "maxDays")
                       VALUES (?, ?, ?, ?, ?, ?);''',
                            (body["brand"], body["name"], body["description"], body["operativeSystem"], body["prefix"], 
                             body["maxDays"]))

        classId = cur.lastrowid
        for i in range(1, body["quantity"]+1):
                cur.execute('''INSERT INTO SoftwareObjects (classId, inClassId) VALUES (?, ?)''', (classId, i))
                cur.execute('''INSERT INTO AvailableObjects (sO) VALUES (?)''', (cur.lastrowid, )) 
        return json.dumps({"saved":True})
        
    return json.dumps({"saved":False})

'''
{
  "name":"Sala de Conferencias 04",
  "location":"Hub de Ciberseguridad, piso 3.",
  "label":"SC04",
  "description":"Sala de conferencias, apta para presentaciones ejecutivas a un público grande.",
  "capacity":35,
  "maxDays":"12"
}
'''
@app.route("/api/newRoom", methods=["POST"])
def newRoom():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()

        cur.execute('''INSERT INTO "main"."Rooms" ("label", "name", "location", "description", "capacity", "maxDays")
                       VALUES (?, ?, ?, ?, ?, ?);''',
                            (body["label"], body["name"], body["location"], body["description"], body["capacity"], 
                             body["maxDays"]))
        
        cur.execute('''INSERT INTO AvailableObjects (rO) VALUES (?)''', (cur.lastrowid, ))
        return json.dumps({"saved":True})
        
    return json.dumps({"saved":False})

# Edit hardware
# Expecting request: 
'''
{
  "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiQTAxNjU5ODkxQHRlYy5teCIsImZpcnN0TmFtZSI6IlBlcG8iLCJsYXN0TmFtZSI6IkxvcGV6IiwiYWRtaW4iOjAsImJsb2NrZWQiOjAsImV4cCI6MTY2NDgzMzc3N30.nCyDkEwjnaqLmFXbt61lsuOKjhlNd0cBBrkyahc1Ldg",
  "classId":1,
  "quantity":7,
  "name":"Mac Book Air",
  "operativeSystem":"macOS 12",
  "description":"CPU = M1\nRAM = 8GB\nSSD = 256GB",
  "prefix":"MACAMTR",
  "availability":true,
  "maxDays":"15"
}
'''
# Response: {"saved":bool}

@app.route("/api/editHardware", methods=["POST"])
def editHardware():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
        oldHardware = cur.execute('''SELECT DT.*, COUNT(inClassId) as quantity FROM
                                     (SELECT * FROM HardwareClass WHERE classId = ? AND deleted = 0) DT
                                     LEFT JOIN HardwareObjects ON (DT.classId = HardwareObjects.classId)
                                     GROUP BY DT.classId''', (body["classId"],)).fetchone()
        oldQuantity = oldHardware["quantity"]
        newQuantity = body["quantity"]
        dObjects = newQuantity - oldQuantity
        if dObjects > 0:
            for i in range(oldQuantity+1, newQuantity+1):
                cur.execute('''INSERT INTO HardwareObjects (classId, inClassId) VALUES (?, ?)''', (body["classId"], i))
                cur.execute('''INSERT INTO AvailableObjects (hO) VALUES (?)''', (cur.lastrowid, ))
        elif dObjects < 0:
            cur.execute("PRAGMA foreign_keys = ON")
            for i in range(oldQuantity, newQuantity, -1):
                inTypeId = cur.execute('''SELECT HardwareObjects.inTypeId FROM HardwareObjects WHERE classId = ? AND inClassId = ?''',
                                       (body["classId"], i)).fetchone()["inTypeId"]
                print(inTypeId)
                cur.execute('''DELETE FROM HardwareObjects WHERE inTypeId = ?''', (inTypeId, ))
        cur.execute("PRAGMA foreign_keys = OFF")
        cur.execute('''
                    UPDATE HardwareClass SET name = ?, operativeSystem = ?, description = ?, prefix = ?, 
                    availability = ?, maxDays = ? WHERE classId = ?''',
                    (body["name"], body["operativeSystem"], body["description"], body["prefix"], 
                     int(body["availability"]), body["maxDays"], body["classId"]))

        return json.dumps({"saved":True})
    return json.dumps({"saved":False})

# Edit software
# Expecting request: 
'''
{
  "classId":1,
  "quantity":12,
  "name":"Adobe XD",
  "brand":"Adobe",
  "operativeSystem":"Windows 10+",
  "description":"Adobe XD apoya al diseño vectorial y a los sitios web wireframe, creando prototipos simples e interactivos con un solo clic.",
  "prefix":"ADBXDW10",
  "availability":true,
  "maxDays":"12"
}
'''
@app.route("/api/editSoftware", methods=["POST"])
def editSoftware():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
        oldSoftware = cur.execute('''SELECT DT.*, COUNT(inClassId) as quantity FROM
                                     (SELECT * FROM SoftwareClass WHERE classId = ? AND deleted = 0) DT
                                     LEFT JOIN SoftwareObjects ON (DT.classId = SoftwareObjects.classId)
                                     GROUP BY DT.classId''', (body["classId"],)).fetchone()
        oldQuantity = oldSoftware["quantity"]
        newQuantity = body["quantity"]
        dObjects = newQuantity - oldQuantity
        if dObjects > 0:
            for i in range(oldQuantity+1, newQuantity+1):
                cur.execute('''INSERT INTO SoftwareObjects (classId, inClassId) VALUES (?, ?)''', (body["classId"], i))
                cur.execute('''INSERT INTO AvailableObjects (sO) VALUES (?)''', (cur.lastrowid, ))
        elif dObjects < 0:
            cur.execute("PRAGMA foreign_keys = ON")
            for i in range(oldQuantity, newQuantity, -1):    
                inTypeId = cur.execute('''SELECT SoftwareObjects.inTypeId FROM SoftwareObjects WHERE classId = ? AND inClassId = ?''',
                                       (body["classId"], i)).fetchone()["inTypeId"]
                print(inTypeId)
                cur.execute('''DELETE FROM SoftwareObjects WHERE inTypeId = ?''', (inTypeId, ))
                
        cur.execute("PRAGMA foreign_keys = OFF")
        cur.execute('''
                    UPDATE SoftwareClass SET name = ?, operativeSystem = ?, description = ?, prefix = ?, 
                    brand = ?, availability = ?, maxDays = ? WHERE classId = ?''',
                    (body["name"], body["operativeSystem"], body["description"], body["prefix"],
                     body["brand"], int(body["availability"]), body["maxDays"], body["classId"]))

        return json.dumps({"saved":True})
    return json.dumps({"saved":False})

# Edit rooms
# Expecting request: 
'''
{
  "roomId":1,
  "name":"Sala de Conferencias 01",
  "location":"Hub de Ciberseguridad, piso 3.",
  "label":"SC01",
  "description":"Sala de conferencias, apta para presentaciones ejecutivas a un público grande.",
  "capacity":40,
  "availability":true,
  "maxDays":"12"
}
'''
@app.route("/api/editRooms", methods=["POST"])
def editRooms():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
        cur.execute('''
                    UPDATE Rooms SET name = ?, label = ?, description = ?, location = ?, 
                    availability = ?, maxDays = ? WHERE roomId = ?''',
                    (body["name"], body["label"], body["description"], body["location"],
                     int(body["availability"]), body["maxDays"], body["roomId"]))

        return json.dumps({"saved":True})
    return json.dumps({"saved":False})

@app.route("/api/editUser", methods=["POST"])
def editUser():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
        emailSearch = cur.execute("SELECT Users.userId FROM Users WHERE email = ?", (body["email"],)).fetchone()
        usernameSearch = cur.execute("SELECT Users.userId FROM Users WHERE username = ?", (body["username"],)).fetchone()
        if emailSearch is not None:
            print(emailSearch)
            respBody = json.dumps({"saved":False, "errorId":110})#, "desc":"Email is already registered"
        elif usernameSearch is not None:
            respBody = json.dumps({"saved":False, "errorId":111})#, "desc":"Username is already registered"
        else:
            cur.execute('''
                        UPDATE Users SET firstName = ?, lastName = ?, username = ?, birthDate = ?, organization = ?, email = ?, ocupation = ?,
                        countryId = ?, hashPassword = ?, admin = ?, blocked = ?
                        WHERE userId = ?''',
                        (body["firstName"], body["lastName"], body["username"], body["birthDate"], body["organization"], body["email"],
                        body["ocupation"], body["countryId"], body["hashPassword"], body["admin"], body["blocked"], body["userId"]))
            respBody = json.dumps({"saved":True})
        return respBody
    return json.dumps({"saved":False})


# Expecting request: {"classId":classId}
@app.route("/api/deleteHardwareClass", methods=["POST"])
def deleteHardware():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
        cur.execute('''UPDATE HardwareClass SET deleted = 1 WHERE classId = ?''', (body["classId"],))
        cur.execute('''UPDATE ReservationTicket SET weight = 0 WHERE ReservationTicket.objectId IN 
                (SELECT AvailableObjects.generalObjectID FROM 
                (SELECT HardwareObjects.inTypeId FROM HardwareObjects WHERE classId = ?) DT
                LEFT JOIN AvailableObjects ON (DT.inTypeId = AvailableObjects.hO))''', (body["classId"],))
        return json.dumps({"saved":True})
    return json.dumps({"saved":False})

# Expecting request: {"classId":classId}
@app.route("/api/deleteSoftwareClass", methods=["POST"])
def deleteSoftware():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
        cur.execute('''UPDATE SoftwareClass SET deleted = 1 WHERE classId = ?''', (body["classId"],))
        cur.execute('''UPDATE ReservationTicket SET weight = 0 WHERE ReservationTicket.objectId IN 
                       (SELECT AvailableObjects.generalObjectID FROM 
                       (SELECT SoftwareObjects.inTypeId FROM SoftwareObjects WHERE classId = ?) DT
                       LEFT JOIN AvailableObjects ON (DT.inTypeId = AvailableObjects.sO))''', (body["classId"],))
        return json.dumps({"saved":True})
    return json.dumps({"saved":False})

# Expecting request: {"roomId":roomId}
@app.route("/api/deleteRooms", methods=["POST"])
def deleteRooms():
    if jwtValidated(request.cookies.get('jwt')):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
        cur.execute('''UPDATE Rooms SET deleted = 1 WHERE roomId = ?''',(body["roomId"]))
        cur.execute('''UPDATE ReservationTicket SET weight = 0 WHERE ReservationTicket.objectId IN 
                       (SELECT AvailableObjects.generalObjectID FROM Rooms
                       LEFT JOIN AvailableObjects ON (Rooms.roomId = AvailableObjects.rO))''', (body["roomId"],))
        return json.dumps({"saved":True})
    return json.dumps({"saved":False})

@app.route("/api/deleteUser", methods=["POST"])
def deleteUser():
    if jwtValidated(request.cookies.get("jwt")):
        userData = jwt.decode(request.cookies.get('jwt'), jwtKey, algorithms="HS256")
        if userData["admin"] == 0:
            return "Only admins"
        body = request.get_json()
        cur = get_db().cursor()
        cur.execute('''UPDATE delete = 1, username = 'DELETED', email = 'DELETED' WHERE userId = ?''', (body["userId"],))
        return json.dumps({"saved":True})
    return json.dumps({"saved":False})

@app.route("/api/deleteTicket", methods=["POST"])
def deleteTicket():
    if jwtValidated(request.cookies.get("jwt")):
        userData = jwt.decode(request.cookies.get("jwt"), jwtKey, algorithms="HS256")

        body = request.get_json()
        cur = get_db().cursor()
        cur.execute('''
        DELETE FROM ReservationTicket WHERE ticketId = ?;
        ''',
        (body["ticketId"], userData["userId"]))
        respBody = {"ticketDeleted":True}
        return json.dumps(respBody)
    else:
        respBody = {"ticketDeleted":False, "errorId": 100}
        return json.dumps(respBody)

@app.route("/api/getHardwareClasses", methods=["POST"])
def getHardwareClasses():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        hardware = cur.execute('''
        SELECT DT.*, COUNT(inClassId) as quantity FROM
        (SELECT * FROM HardwareClass WHERE deleted = 0) DT
        LEFT JOIN HardwareObjects ON (DT.classId = HardwareObjects.classId)
        GROUP BY DT.classId
        ''').fetchall()
        return json.dumps(hardware)

@app.route("/api/getSoftwareClasses", methods=["POST"])
def getSoftwareClasses():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        software = cur.execute('''
        SELECT DT.*, COUNT(inClassId) as quantity FROM
        (SELECT * FROM SoftwareClass WHERE deleted = 0) DT
        LEFT JOIN SoftwareObjects ON (DT.classId = SoftwareObjects.classId)
        GROUP BY DT.classId
        ''').fetchall()
        return json.dumps(software)

@app.route("/api/getRooms", methods=["POST"])
def getRooms():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        rooms = cur.execute('''
        SELECT * FROM Rooms WHERE deleted = 0
        ''').fetchall()
        return json.dumps(rooms)

'''------------------'''
'''------APP API-----'''
'''------------------'''

'''---USER MANAGEMENT---'''

# --- auth errors ---
# 101 invalid email
# 102 blocked
# 103 wrong pwd

# Authenticate a user
# Expecting request: {("username":newUsername || "email":newEmail), "hashPassword":hashPassword}
# Response: {"available":bool}
# Optional response: {"errorId":errorId}
@app.route("/app/api/login", methods=['POST'])
def loginApp(name=None):
    body = request.get_json()
    cur = get_db().cursor()
    resp = make_response()
    if "email" in body:
        user = cur.execute('''SELECT Users.userId, 
                                     Users.email,
                                     Users.username,
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
                                     Users.username,
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
    elif user["hashPassword"] == body["password"]:
        user.pop("hashPassword")
        user["exp"] = datetime.now(timezone.utc) + timedelta(days=7)
        respBody = json.dumps({"authorized":True, "jwt":jwt.encode(user, jwtKey, algorithm="HS256")})
    else:
        respBody = json.dumps({"authorized":False, "errorId":103}) #, "desc":"Wrong pwd"

    resp.set_data(respBody)

    return resp

# --- register errors ---
# 110 email already registered
# 111 email already registered

# Register a new user
# Expecting request: {("username":newUsername || "email":newEmail), "hashPassword":hashPassword}
# Response: {"readyToVerify":bool}
# Optional response: {"errorId":errorId}
@app.route("/app/api/register", methods=["POST"])
def registerApp():
    body = request.get_json()
    cur = get_db().cursor()
    emailSearch = cur.execute("SELECT Users.userId FROM Users WHERE email = ?", (body["email"],)).fetchone()
    if emailSearch is not None:
        respBody = json.dumps({"readyToVerify":False, "errorId":110})#, "desc":"Email is already registered"
    usernameSearch = cur.execute("SELECT Users.userId FROM Users WHERE username = ?", (body["username"],)).fetchone()
    if usernameSearch is not None:
        respBody = json.dumps({"readyToVerify":False, "errorId":111})#, "desc":"Username is already registered"
    else:
        dateRegistered = (datetime.now(timezone.utc) - timedelta(hours=5)).strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        key = body["username"] + body["email"] + dateRegistered
        hashKey = sha256(key.encode('utf-8')).hexdigest()[:20]
        msg = Message("Verify your new BooKMe account!",
                       sender="bookmebot@gmail.com",
                       recipients=[body["email"]])
        msg.body = render_template()
        mail.send(msg)
        cur.execute('''
                    INSERT INTO "main"."toVerify" ("firstName", "lastName", "username", "birthDate",
                    "organization", "email", "ocupation", "countryId", "hashPassword", "hashKey") 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);''',
                    (dateRegistered, body["firstName"], body["lastName"], body["username"], body["birthDate"], 
                    body["organization"], body["email"], body["ocupation"], body["countryId"], body["hashPassword"], hashKey))
        respBody = json.dumps({"readyToVerify":True})
    return respBody

# Check if new user data is valid.
# Expecting request: {"jwt":jwt, "username":newUsername (or the same username as before), 
# "email":newEmail (or the same username as before)}
# Response: {"available":bool, "errorIds":int[] (empty if available is True)}
@app.route("/app/api/verifyNewUserData", methods=["POST"])
def verifyNewUserData():
    body = request.get_json()
    userData = jwt.decode(body["jwt"], jwtKey, algorithms="HS256")
    cur = get_db().cursor()
    respBody = {"available":True, "errorIds":[]}
    emailSearch = cur.execute("SELECT Users.userId FROM Users WHERE email = ? AND userId != ?", (body["email"], userData["userId"])).fetchone()
    if emailSearch is not None:
        respBody["available"] = False
        respBody["errorIds"].append(110) #, "desc":"Email is already registered"
    usernameSearch = cur.execute("SELECT Users.userId FROM Users WHERE username = ? AND userId != ?", (body["username"], userData["userId"])).fetchone()
    if usernameSearch is not None:
        respBody["available"] = False
        respBody["errorIds"].append(111) #, "desc":"Username is already registered"
    
    return json.dumps(respBody)

# Change user data if old password is correct.
# Expecting request: {"jwt":jwt, "oldHashPassword":hashPassword ,"firstName":newName, "lastName":newSurname, "username":newUsername, "birthDate":newBirth, 
# "organization":newOrganization, "email":newEmail, "hashPassword":newHashPassword}
# Response: {"saved":bool}

@app.route("/app/api/changeUserData", methods=["POST"])
def changeUserData():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        userData = jwt.decode(body["jwt"], jwtKey, algorithms="HS256")
        cur = get_db().cursor()
        
        passwordCheck = cur.execute("SELECT Users.hashPassword FROM Users WHERE userId = ?", (userData["userId"], )).fetchone()
        if not compare_digest(passwordCheck["hashPassword"], body["oldHashPassword"]):
            respBody = {"saved":False, "errorId":103}
            return json.dumps(respBody)
        
        if body["hashPassword"] != "":
            query = '''UPDATE Users 
                   SET firstName = ?, lastName = ?, username = ?, birthDate = ?, organization = ?, email = ?, hashPassword = ?
                   WHERE userId = ?'''
            toInsert = (body["firstName"], body["lastName"], body["username"], body["birthDate"], body["organization"], body["email"],
                        body["hashPassword"], userData["userId"])
        else:
            query = '''UPDATE Users 
                   SET firstName = ?, lastName = ?, username = ?, birthDate = ?, organization = ?, email = ?
                   WHERE userId = ?'''
            toInsert = (body["firstName"], body["lastName"], body["username"], body["birthDate"], body["organization"], body["email"],
                        userData["userId"])

        cur.execute(query, toInsert)

        respBody = {"saved":True}
        return json.dumps(respBody)

'''---RESERVATION MANAGEMENT---'''
# Get available objects
# route "/app/api/get<ObjectType>"
# Expecting request: {"jwt":jwt}

@app.route("/app/api/getHardware", methods=["POST"])
def getHardware():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        hardware = cur.execute('''
        SELECT generalObjectID, identifier, description, operativeSystem, name, maxDays, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT DT.*, AvailableObjects.generalObjectID, AvailableObjects.hO FROM 
        (SELECT (HardwareClass.prefix || "-" || HardwareObjects.inClassId) as identifier, inTypeId, HardwareClass.*
        FROM HardwareObjects LEFT JOIN HardwareClass ON (HardwareClass.classId = HardwareObjects.classId) WHERE deleted = 0) DT
        INNER JOIN AvailableObjects 
        ON (DT.inTypeId = AvailableObjects.hO)) DT2
        LEFT JOIN 
        (SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE (ReservationTicket.startDate 
        BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+7 days", "-0.001 seconds")) AND weight > 0) ResTicket
        ON (ResTicket.objectID = DT2.generalObjectID) WHERE availability = 1 
        GROUP BY DT2.generalObjectID
        ''').fetchall()
        return json.dumps(hardware)

@app.route("/app/api/getSoftware", methods=["POST"])
def getSoftware():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        software = cur.execute('''
        SELECT generalObjectID, identifier, name, brand, description, operativeSystem, maxDays, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT DT.*, AvailableObjects.generalObjectID, AvailableObjects.sO FROM 
        (SELECT (SoftwareClass.prefix || "-" || SoftwareObjects.inClassId) as identifier, inTypeId, SoftwareClass.*
        FROM SoftwareObjects LEFT JOIN SoftwareClass ON (SoftwareClass.classId = SoftwareObjects.classId) WHERE deleted = 0) DT
        INNER JOIN AvailableObjects 
        ON (DT.inTypeId = AvailableObjects.sO)) DT2
        LEFT JOIN 
        (SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE (ReservationTicket.startDate 
        BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+7 days", "-0.001 seconds")) AND weight > 0) ResTicket
        ON (ResTicket.objectID = DT2.generalObjectID) WHERE availability = 1
        GROUP BY DT2.generalObjectID
        ''').fetchall()
        return json.dumps(software)

@app.route("/app/api/getRooms", methods=["POST"])
def getRoomsApp():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        respBody = cur.execute('''
        SELECT generalObjectID, name, description, location, capacity, maxDays, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT Rooms.*, AvailableObjects.generalObjectID, AvailableObjects.rO FROM 
        Rooms INNER JOIN AvailableObjects 
        ON (Rooms.roomId = AvailableObjects.rO) WHERE deleted = 0) DT2
        LEFT JOIN 
        (SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE (ReservationTicket.startDate 
        BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+7 days", "-0.001 seconds")) AND weight > 0) ResTicket
        ON (ResTicket.objectID = DT2.generalObjectID) WHERE availability = 1
        GROUP BY DT2.generalObjectID
        ''').fetchall()
        return json.dumps(respBody)

# Expecting request:
'''
{
	"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZW1haWwiOiJBMDE2NTk4OTFAdGVjLm14IiwiZmlyc3ROYW1lIjoiUGVwbyIsImxhc3ROYW1lIjoiUm9kcmlndWV6IiwiYWRtaW4iOjAsImJsb2NrZWQiOjB9.KR8WPw1h18kOciOxs--VCRbvEohrcmO7asNkBX61N4o",
    "date":"2022-09-30",
    "objectId":"26"
}
'''
@app.route("/app/api/getTimeRanges", methods=["POST"])
def getTimeRanges():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        respBody = cur.execute('''
        SELECT startDate, endDate, strftime('%Y-%m-%d', startDate) as startDay, strftime('%H:%M:%S', startDate) as startTime,
        strftime('%Y-%m-%d', endDate) as endDay, strftime('%H:%M:%S', endDate) as endTime
        FROM ReservationTicket WHERE (startDay = date(?) OR endDay = date(?)) AND ReservationTicket.objectId = ? AND weight > 0
        ''', (body["date"], body["date"], body["objectId"])).fetchall()
        return json.dumps(respBody)

@app.route("/app/api/getTimeRangesForDays", methods=["POST"])
def getTimeRangesForDays():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        respBody = cur.execute('''
        SELECT startDate, endDate, strftime('%Y-%m-%d', startDate) as startDay, strftime('%H:%M:%S', startDate) as startTime,
        strftime('%Y-%m-%d', endDate) as endDay, strftime('%H:%M:%S', endDate) as endTime
        FROM ReservationTicket WHERE ((startDay BETWEEN date(?) AND date(?))
		OR (endDay BETWEEN date(?) AND date(?))) AND ReservationTicket.objectId = ? AND weight > 0
        ''', (body["startDate"], body["endDate"], body["startDate"], body["endDate"], body["objectId"])).fetchall()
        return json.dumps(respBody)

# Get user's tickets by userId
# Expecting request: {"jwt":jwt}
# Optional request: {"ignoreTicket":ticketId}

@app.route("/app/api/getTickets", methods=["POST"])
def getTickets():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        userData = jwt.decode(body["jwt"], jwtKey, algorithms="HS256")
        if "ignoreTicket" in body:
            ignoreTicket = body["ignoreTicket"]
        else:
            ignoreTicket = "-1"

        cur = get_db().cursor()
        tickets = cur.execute('''SELECT ticketId, objectType, objectName, startDate, endDate FROM ReservationTicket 
                                 WHERE ReservationTicket.userId = ?
                                 AND ReservationTicket.endDate > datetime('now', '-5 hours') 
                                 AND ticketId != ?
                                 ORDER BY startDate''', 
        (userData["userId"], ignoreTicket)).fetchall()
        return tickets

# Get user's ticket by ticketId
# Expecting request: {"jwt":jwt,     "ticketId":ticketId, "objectType":objectType}
# Ej.                {"jwt":"asdfg", "ticketId":2,        "objectType":"HRDWR"}

@app.route("/app/api/getTicket", methods=["POST"])
def getTicket():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        
        if body["objectType"] == "HRDWR":
            query = '''SELECT DT3.ticketId, DT3.userId, DT3.dateRegistered, DT3.startDate, DT3.endDate, DT3.objectId, DT3.objectType, 
                                DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, DT3.weight, HardwareClass.name, 
                                HardwareClass.operativeSystem, HardwareClass.description as objectDescription FROM
                                (SELECT DT2.*, HardwareObjects.classId FROM 
                                (SELECT DT.*, AvailableObjects.hO FROM 
                                (SELECT * FROM ReservationTicket WHERE ticketId = ?) DT
                                INNER JOIN AvailableObjects ON (DT.objectId = AvailableObjects.generalObjectID)) DT2
                                INNER JOIN HardwareObjects ON (DT2.hO = HardwareObjects.inTypeId)) DT3
                                INNER JOIN HardwareClass ON (DT3.classId = HardwareClass.classId)'''
        elif body["objectType"] == "SFTWR":
            query = '''SELECT DT3.ticketId, DT3.userId, DT3.dateRegistered, DT3.startDate, DT3.endDate, DT3.objectId, DT3.objectType,
                       DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, DT3.weight, SoftwareClass.name, 
                       SoftwareClass.brand, SoftwareClass.operativeSystem, SoftwareClass.description as objectDescription FROM
                       (SELECT DT2.*, SoftwareObjects.classId FROM 
                       (SELECT DT.*, AvailableObjects.sO FROM 
                       (SELECT * FROM ReservationTicket WHERE ticketId = ?) DT
                       INNER JOIN AvailableObjects ON (DT.objectId = AvailableObjects.generalObjectID)) DT2
                       INNER JOIN SoftwareObjects ON (DT2.sO = SoftwareObjects.inTypeId)) DT3
                       INNER JOIN SoftwareClass ON (DT3.classId = SoftwareClass.classId)
                       '''
        elif body["objectType"] == "ROOM":
            query = '''SELECT DT2.ticketId, DT2.userId, DT2.dateRegistered, DT2.startDate, DT2.endDate, DT2.objectId, DT2.objectType,
                       DT2.objectName, DT2.description as ticketDescription, DT2.qrCode, DT2.weight, Rooms.name, 
                       Rooms.label, Rooms.location, Rooms.description as objectDescription FROM
                       (SELECT DT.*, AvailableObjects.rO FROM 
                       (SELECT * FROM ReservationTicket WHERE ticketId = ?) DT
                       INNER JOIN AvailableObjects ON (DT.objectId = AvailableObjects.generalObjectID)) DT2
                       INNER JOIN Rooms ON (DT2.rO = Rooms.roomId)
                       '''
        ticket = cur.execute(query, (body["ticketId"], )).fetchone()
        qrPath = "static/resources/qrCodes/" + ticket["qrCode"] + ".png"
        with open(qrPath, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        ticket["qrCode64"] = encoded_string.decode('utf-8')
        return ticket



@app.route("/api/updateQrCodes", methods=["GET"])
def updateQrCodes():
    if jwtValidated(request.cookies.get('jwt')):
        cur = get_db().cursor()
        tickets = cur.execute('''SELECT ticketId, userId, objectId, dateRegistered FROM ReservationTicket''').fetchall()
        print(tickets)
        for ticket in tickets:
            qr = str(ticket["ticketId"]) + str(ticket["userId"]) + str(ticket["objectId"]) + ticket["dateRegistered"]
            qr = qr.encode('utf-8')
            qr = sha1(qr).hexdigest()[:10]
            cur.execute('''UPDATE ReservationTicket SET qrCode = ? WHERE ticketId = ?''',
                        (qr, ticket["ticketId"]))
            genQr(qr)
        return "FIN"
        

# Create new ticket for user
# Expecting request: {"jwt":jwt, "objectId":objectId, "objectType":objectType, "objectName":objectName, "startDate":startDate,
# "endDate":endDate, "description":ticketDescription}
# Ej.:
'''
{
  "jwt":,
  "objectId":4,
  "objectType":"HRDWR", 
  "objectName":"DELL PC", 
  "startDate":"2022-10-2 12:00:00.000",
  "endDate":"2022-10-2 22:00:00.000",
  "description":"Reserva Dell"
}
'''

@app.route("/app/api/newTicket", methods=["POST"])
def newTicket():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        userData = jwt.decode(body["jwt"], jwtKey, algorithms="HS256")
        dateRegistered = (datetime.now(timezone.utc) - timedelta(hours=5)).strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        startDate = datetime.strptime(body["startDate"], "%Y-%m-%d %H:%M:%S.%f")
        endDate = datetime.strptime(body["endDate"], "%Y-%m-%d %H:%M:%S.%f")
        weight = (endDate - startDate).seconds / 3600
        startDate = startDate.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        endDate = endDate.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        cur = get_db().cursor()
        cur.execute('''
        INSERT INTO "main"."ReservationTicket" 
        ("dateRegistered", "objectId", "objectType", "objectName", "startDate", "endDate", "userId", "description", "weight") VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (dateRegistered, body["objectId"], body["objectType"], body["objectName"], startDate, endDate, userData["userId"], body["description"], weight))
        # ticketId + userId + objectId + dateRegistered
        qr = str(cur.lastrowid) + str(userData["userId"]) + str(body["objectId"]) + dateRegistered
        qr = qr.encode('utf-8')
        qr = sha1(qr).hexdigest()[:10]
        cur.execute('''UPDATE ReservationTicket SET qrCode = ? WHERE ticketId = ?''',
                       (qr, cur.lastrowid))
        genQr(qr)
        respBody = {"ticketSaved":True}
        return json.dumps(respBody)

# Deleting ticket from user
# Expecting request: {"jwt":jwt, "ticketId":ticketId}
# Ej.:
'''
{
  "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  eyJ1c2VySWQiOiIxIiwiZW1haWwiOiJBMDE2NTk4OTFAdGVjLm14IiwiZmlyc3ROYW1lIjoiUGVwbyIsImxhc3ROYW1lIjoiUm9kcmlndWV6IiwiYWRtaW4iOjAsImJsb2NrZWQiOjB9.
  KR8WPw1h18kOciOxs--VCRbvEohrcmO7asNkBX61N4o",
  "ticketId":2
}
'''
@app.route("/app/api/deleteTicket", methods=["POST"])
def deleteTicketApp():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        userData = jwt.decode(body["jwt"], jwtKey, algorithms="HS256")
        cur = get_db().cursor()
        cur.execute('''
        DELETE FROM ReservationTicket WHERE ticketId = ? AND userId = ?;
        ''',
        (body["ticketId"], userData["userId"]))
        respBody = {"ticketDeleted":True}
        return json.dumps(respBody)
    else:
        respBody = {"ticketDeleted":False, "errorId": 100}
        return json.dumps(respBody)


'''--- OTHER ---'''

# Expecting request: {"jwt":jwt}
# Response:
'''
{
    "totalReservations": 10,
    "totalHoursReserved": 82,
    "daysSinceRegister": 5,
    "favObjectType": "HRDWR",
    "favObjectTypeReservations": 4
}
'''
@app.route("/app/api/stats", methods=["POST"])
def statsApp():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        userData = jwt.decode(body["jwt"], jwtKey, algorithms="HS256")
        cur = get_db().cursor()
        respBody = {}
        respBody["totalReservations"] = cur.execute('''SELECT count(ticketId) as totalReservations FROM ReservationTicket 
                                                       WHERE userId = ?;''', (userData["userId"],)).fetchone()["totalReservations"]
        respBody["totalHoursReserved"] = cur.execute('''SELECT sum(weight) as totalHours FROM ReservationTicket WHERE userId = ?;''', 
                                                        (userData["userId"],)).fetchone()["totalHours"]
        dateRegistered = cur.execute("SELECT dateRegistered FROM Users WHERE userId = ?;", (userData["userId"],)).fetchone()["dateRegistered"]
        print(dateRegistered)
        respBody["daysSinceRegister"] = (datetime.now(timezone(-timedelta(hours=5))).replace(tzinfo=None) - datetime.strptime(dateRegistered, "%Y-%m-%d %H:%M:%S.%f")).days
        print(respBody["daysSinceRegister"])
        favObjTypeQuery = cur.execute('''SELECT objectType, count(objectType) as ammount FROM ReservationTicket 
                                         WHERE userId = ? GROUP BY objectType ORDER BY ammount DESC LIMIT 1''',
                                         (userData["userId"],)).fetchone()
        respBody["favObjectType"] = favObjTypeQuery["objectType"]
        respBody["favObjectTypeReservations"] = favObjTypeQuery["ammount"]
        return json.dumps(respBody) 


@app.teardown_appcontext
def close_connection(exception):    
    db = getattr(g, '_database', None)
    if db is not None:
        db.commit()
        db.close()

