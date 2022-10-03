from flask import Flask, request, g, make_response
from flask import render_template
from hashlib import sha256, sha1
from hmac import compare_digest
import json
import jwt
import sqlite3
import base64
from datetime import datetime, timedelta, timezone
from qrcode import QRCode, constants

print("Server started")

app = Flask(__name__)

DATABASE = 'DB\BookMeDB.db'
jwtKey = 'BooKMeIsCool'
hashedAdminPwd = sha256(jwtKey.encode('utf-8'))
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

@app.route("/")
def hello_world(name=None):
    return render_template('main.html', name=name)

def createJWT(jsnDict):
    return jwt.encode(jsnDict, jwtKey, algorithm="HS256")
    
def jwtValidated(token):
    try:
        jwt.decode(token, jwtKey, algorithms="HS256")
    except jwt.InvalidSignatureError:
        print("There was an attempt to use an invalid JWT Signature")
        return False
    except:
        return False
    else:
        return True

def genQr(code):
    qr = QRCode(version=1,
                error_correction=constants.ERROR_CORRECT_L,
                box_size=8,
                border=1,
    )
    qr.add_data("http://localhost:5000/api/getTicket/" + code[:10]) #would idealy show ticket html
    qr.make(fit=True)
    img = qr.make_image(fill_color='black', black_color='white')
    print(type(img))
    img.save("static/resources/qrCodes/" + code + ".png")

#api

# --- auth errors ---
# 101 invalid email
# 102 blocked
# 103 wrong pwd

@app.route("/api/login", methods=['POST'])
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

    return resp

# --- register errors ---
# 110 email already registered
# 111 email already registered

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
        respBody = json.dumps({"registered":True})

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
    if "username" in body:
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
    elif user["hashPassword"] == body["password"]:
        user.pop("hashPassword")
        user["exp"] = datetime.now(timezone.utc)
        respBody = {"authorized":True, "jwt":jwt.encode(user, jwtKey, algorithm="HS256")}
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
@app.route("/app/api/register")
def registerApp():
    body = request.get_json()
    cur = get_db().cursor()
    emailSearch = cur.execute("SELECT Users.userId FROM Users WHERE email = ?", (body["email"],))
    if emailSearch is not None:
        respBody = json.dumps({"readyToVerify":False, "errorId":110})#, "desc":"Email is already registered"
    usernameSearch = cur.execute("SELECT Users.userId FROM Users WHERE username = ?", (body["username"],))
    if usernameSearch is not None:
        respBody = json.dumps({"readyToVerify":False, "errorId":111})#, "desc":"Username is already registered"
    else:
        dateRegistered = (datetime.now(timezone.utc) - timedelta(hours=5)).strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        cur.execute('''
                    INSERT INTO Users (dateRegistered, firstName, lastName, username, birthDate, 
                    organization, email, ocupation, countryId, hashPassword)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                    (dateRegistered, body["firstName"], body["lastName"], body["username"], body["birthDate"], 
                    body["organization"], body["email"], body["ocupation"], body["countryId"], body["hashPassword"]))
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
        SELECT generalObjectID, identifier, description, operativeSystem, name, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT DT.inTypeId, DT.identifier, DT.description, DT.operativeSystem, DT.name, AvailableObjects.generalObjectID, AvailableObjects.hO FROM 
        (SELECT (HardwareClass.prefix || "-" || HardwareObjects.inTypeId) as identifier, inTypeId, HardwareClass.description, HardwareClass.operativeSystem, HardwareClass.name
        FROM HardwareObjects LEFT JOIN HardwareClass ON (HardwareClass.classId = HardwareObjects.classId)) DT
        INNER JOIN AvailableObjects 
        ON (DT.inTypeId = AvailableObjects.hO)) DT2
        LEFT JOIN 
        (SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE  ReservationTicket.startDate 
        BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+8 days", "-0.001 seconds")) ResTicket
        ON (ResTicket.objectID = DT2.generalObjectID)
        GROUP BY DT2.generalObjectID
        ''').fetchall()
        return json.dumps(hardware)

@app.route("/app/api/getSoftware", methods=["POST"])
def getSoftware():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        software = cur.execute('''
        SELECT generalObjectID, identifier, name, brand, description, operativeSystem, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT DT.inTypeId, DT.identifier, DT.description, DT.operativeSystem, DT.name, DT.brand, AvailableObjects.generalObjectID, AvailableObjects.sO FROM 
        (SELECT (SoftwareClass.prefix || "-" || SoftwareObjects.inTypeId) as identifier, inTypeId, SoftwareClass.name, SoftwareClass.brand, SoftwareClass.description, SoftwareClass.operativeSystem
        FROM SoftwareObjects LEFT JOIN SoftwareClass ON (SoftwareClass.classId = SoftwareObjects.classId)) DT
        INNER JOIN AvailableObjects 
        ON (DT.inTypeId = AvailableObjects.sO)) DT2
        LEFT JOIN 
        (SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE  ReservationTicket.startDate 
        BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+8 days", "-0.001 seconds")) ResTicket
        ON (ResTicket.objectID = DT2.generalObjectID)
        GROUP BY DT2.generalObjectID
        ''').fetchall()
        return json.dumps(software)

@app.route("/app/api/getRooms", methods=["POST"])
def getRooms():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        respBody = cur.execute('''
        SELECT generalObjectID, name, description, location, capacity, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT Rooms.*, AvailableObjects.generalObjectID, AvailableObjects.rO FROM 
        Rooms INNER JOIN AvailableObjects 
        ON (Rooms.roomId = AvailableObjects.rO)) DT2
        LEFT JOIN 
        (SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE  ReservationTicket.startDate 
        BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+8 days", "-0.001 seconds")) ResTicket
        ON (ResTicket.objectID = DT2.generalObjectID)
        GROUP BY DT2.generalObjectID
        ''').fetchall()
        return json.dumps(respBody)

@app.route("/app/api/getTimeRanges", methods=["POST"])
def getTimeRanges():
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        cur = get_db().cursor()
        respBody = cur.execute('''
        SELECT startDate, endDate, strftime('%Y-%m-%d', startDate) as startDay, strftime('%H:%M:%S', startDate) as startTime,
        strftime('%Y-%m-%d', endDate) as endDay, strftime('%H:%M:%S', endDate) as endTime
        FROM ReservationTicket WHERE startDay = date(?) AND ReservationTicket.objectId = ?
        ''', (body["date"], body["objectId"])).fetchall()
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
                                DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, HardwareClass.name, 
                                HardwareClass.operativeSystem, HardwareClass.description as objectDescription FROM
                                (SELECT DT2.*, HardwareObjects.classId FROM 
                                (SELECT DT.*, AvailableObjects.hO FROM 
                                (SELECT * FROM ReservationTicket WHERE ticketId = ?) DT
                                INNER JOIN AvailableObjects ON (DT.objectId = AvailableObjects.generalObjectID)) DT2
                                INNER JOIN HardwareObjects ON (DT2.hO = HardwareObjects.inTypeId)) DT3
                                INNER JOIN HardwareClass ON (DT3.classId = HardwareClass.classId)'''
        elif body["objectType"] == "SFTWR":
            query = '''SELECT DT3.ticketId, DT3.userId, DT3.dateRegistered, DT3.startDate, DT3.endDate, DT3.objectId, DT3.objectType,
                       DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, SoftwareClass.name, 
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
                       DT2.objectName, DT2.description as ticketDescription, DT2.qrCode, Rooms.name, 
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
        ticket["qrCode"] = encoded_string.decode('utf-8')
        return ticket

# Get user's ticket by qrcode
# This is expected to be a web path
# Expecting request: {"jwt":jwt}
# Ej.                {"jwt":"asdfg"}

@app.route("/api/getTicket/<qr>", methods=["POST"])
def getTicketWithQr(qr):
    body = request.get_json()
    if jwtValidated(body["jwt"]):
        userData = jwt.decode(body["jwt"], jwtKey, algorithms="HS256")
        '''
        if userData["admin"] == 0:
            return make_response("Only admins", 401)
        '''
        cur = get_db().cursor()
        
        if body["objectType"] == "HRDWR":
            query = '''SELECT DT3.ticketId, DT3.userId, DT3.dateRegistered, DT3.startDate, DT3.endDate, DT3.objectId, DT3.objectType, 
                                DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, HardwareClass.name, 
                                HardwareClass.operativeSystem, HardwareClass.description as objectDescription FROM
                                (SELECT DT2.*, HardwareObjects.classId FROM 
                                (SELECT DT.*, AvailableObjects.hO FROM 
                                (SELECT * FROM ReservationTicket WHERE qrCode = ?) DT
                                INNER JOIN AvailableObjects ON (DT.objectId = AvailableObjects.generalObjectID)) DT2
                                INNER JOIN HardwareObjects ON (DT2.hO = HardwareObjects.inTypeId)) DT3
                                INNER JOIN HardwareClass ON (DT3.classId = HardwareClass.classId)'''
        elif body["objectType"] == "SFTWR":
            query = '''SELECT DT3.ticketId, DT3.userId, DT3.dateRegistered, DT3.startDate, DT3.endDate, DT3.objectId, DT3.objectType,
                       DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, SoftwareClass.name, 
                       SoftwareClass.brand, SoftwareClass.operativeSystem, SoftwareClass.description as objectDescription FROM
                       (SELECT DT2.*, SoftwareObjects.classId FROM 
                       (SELECT DT.*, AvailableObjects.sO FROM 
                       (SELECT * FROM ReservationTicket WHERE qrCode = ?) DT
                       INNER JOIN AvailableObjects ON (DT.objectId = AvailableObjects.generalObjectID)) DT2
                       INNER JOIN SoftwareObjects ON (DT2.sO = SoftwareObjects.inTypeId)) DT3
                       INNER JOIN SoftwareClass ON (DT3.classId = SoftwareClass.classId)
                       '''
        elif body["objectType"] == "ROOM":
            query = '''SELECT DT2.ticketId, DT2.userId, DT2.dateRegistered, DT2.startDate, DT2.endDate, DT2.objectId, DT2.objectType,
                       DT2.objectName, DT2.description as ticketDescription, DT2.qrCode, Rooms.name, 
                       Rooms.label, Rooms.location, Rooms.description as objectDescription FROM
                       (SELECT DT.*, AvailableObjects.rO FROM 
                       (SELECT * FROM ReservationTicket WHERE qrCode = ?) DT
                       INNER JOIN AvailableObjects ON (DT.objectId = AvailableObjects.generalObjectID)) DT2
                       INNER JOIN Rooms ON (DT2.rO = Rooms.roomId)
                       '''
        ticket = cur.execute(query, (qr, )).fetchone()
        qrPath = "static/resources/qrCodes/" + ticket["qrCode"] + ".png"
        with open(qrPath, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        ticket["qrCode"] = encoded_string.decode('utf-8')
        return ticket

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
        ("dateRegistered", "objectId", "objectType", "objectName", "startDate", "endDate", "userID", "description", "weight") VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (dateRegistered, body["objectId"], body["objectType"], body["objectName"], startDate, endDate, userData["userId"], body["description"], weight))
        # ticketId + userId + objectId
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
def deleteTicket():
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

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.commit()
        db.close()

