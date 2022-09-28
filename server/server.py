import email
from flask import Flask, request, g, make_response
from flask import render_template
from hashlib import sha256
from hmac import compare_digest
import json
import jwt
import sqlite3

print("Server started")

app = Flask(__name__)

DATABASE = 'DB\BookMeDB.db'
jwtKey = 'BookMeIsCool'
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
    user = cur.execute('''SELECT Users.id, 
                                 Users.email,
                                 Users.firstName,
                                 Users.hashPassword,
                                 Users.admin,
                                 Users.blocked
                                 FROM Users WHERE email = ?''', #es sensible que el usuario tenga acceso a su id?
                       (body['email'],)).fetchone()
    if user is None:
        respBody = json.dumps({"authorized":False, "errorId":101}) #, "desc":"Invalid email"
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
    emailSearch = cur.execute("SELECT Users.id FROM Users WHERE email = ?", (body["email"],))
    usernameSearch = cur.execute("SELECT Users.id FROM Users WHERE username = ?", (body["username"],))
    if emailSearch is not None:
        respBody = json.dumps({"registered":False, "errorId":110})#, "desc":"Email is already registered"
    elif usernameSearch is not None:
        respBody = json.dumps({"registered":False, "errorId":111})#, "desc":"Username is already registered"
    else:
        
        cur.execute('''INSERT INTO "main"."Users"
                       ("dateRegistered", "firstName", "lastName", "username", "birthDate", "organization", 
                       "email", "ocupation", "countryId", "hashPassword")
                       VALUES ('?', '?', '?', '?', '?', '?', '?', '?', ?, '?');''',
                       ("2022-09-28 15:00:00.000", body["firstName"], body["lastName"], body["username"], body["birthDate"],
                       body["organization"], body["email"], body["ocupation"], body["countryId"], body["hashPassword"]))
        respBody = json.dumps({"registered":True})
    

'''
CREATE TABLE "AvailableObjects" (
	"id"	INTEGER NOT NULL,
	"hO"	INTEGER,
	"sO"	INTEGER,
	"rO"	INTEGER,
	FOREIGN KEY("hO") REFERENCES "HardwareObjects"("objectId") ON DELETE CASCADE,
	FOREIGN KEY("sO") REFERENCES "SoftwareObjects"("objectId") ON DELETE CASCADE,
	FOREIGN KEY("rO") REFERENCES "Rooms"("id") ON DELETE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
)
'''
'''
SELECT generalObjectID, identifier, description, operativeSystem, hardwareType, SUM(ResTicket.weight) as totalWeight FROM
(SELECT DT.inTypeId, DT.identifier, DT.description, DT.operativeSystem, DT.hardwareType, AvailableObjects.generalObjectID, AvailableObjects.hO FROM 
(SELECT (HardwareClass.prefix || "-" || HardwareObjects.inTypeId) as identifier, inTypeId, HardwareClass.description, HardwareClass.operativeSystem, HardwareClass.hardwareType
FROM HardwareObjects LEFT JOIN HardwareClass ON (HardwareClass.classId = HardwareObjects.classId)) DT
INNER JOIN AvailableObjects 
ON (DT.inTypeId = AvailableObjects.hO)) DT2
LEFT JOIN 
(SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE  ReservationTicket.startDate 
BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+1 days", "-0.001 seconds")) ResTicket
ON (ResTicket.objectID = DT2.generalObjectID)
GROUP BY DT2.generalObjectID
'''

# api app

# --- auth errors ---
# 101 invalid email
# 102 blocked
# 103 wrong pwd

@app.route("/app/api/login", methods=['POST'])
def loginApp(name=None):
    body = request.get_json()
    cur = get_db().cursor()
    resp = make_response()
    user = cur.execute('''SELECT Users.id, 
                                 Users.email,
                                 Users.firstName,
                                 Users.hashPassword,
                                 Users.admin,
                                 Users.blocked
                                 FROM Users WHERE email = ?''', #es sensible que el usuario tenga acceso a su id?
                       (body['email'],)).fetchone()
    if user is None:
        respBody = json.dumps({"authorized":False, "errorId":101}) #, "desc":"Invalid email"
    elif user["blocked"]:
        respBody = json.dumps({"authorized":False, "errorId":102}) #, "desc":"User is blocked"
    elif user["hashPassword"] == body["password"]:
        respBody = {"authorized":True, "jwt":jwt.encode(user, jwtKey, algorithm="HS256")}
        #respBody = render_template('main.html', name=name)
        user.pop("hashPassword")
    else:
        respBody = json.dumps({"authorized":False, "errorId":103}) #, "desc":"Wrong pwd"

    resp.set_data(respBody)

    return resp

# --- register errors ---
# 110 email already registered
# 111 email already registered

@app.route("/app/api/register")
def registerApp():
    body = request.get_json()
    cur = get_db().cursor()
    emailSearch = cur.execute("SELECT Users.id FROM Users WHERE email = ?", (body["email"],))
    if emailSearch is not None:
        respBody = json.dumps({"registered":False, "errorId":110})#, "desc":"Email is already registered"
    usernameSearch = cur.execute("SELECT Users.id FROM Users WHERE username = ?", (body["username"],))
    if usernameSearch is not None:
        respBody = json.dumps({"registered":False, "errorId":111})#, "desc":"Username is already registered"

@app.route("/app/api/getHardware", methods=["POST"])
def getHardware():
    body = request.get_json()
    if True:#compare_digest(body["adminPwd"], hashedAdminPwd):
        cur = get_db().cursor()
        hardware = cur.execute('''
        SELECT generalObjectID, identifier, description, operativeSystem, hardwareType, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT DT.inTypeId, DT.identifier, DT.description, DT.operativeSystem, DT.hardwareType, AvailableObjects.generalObjectID, AvailableObjects.hO FROM 
        (SELECT (HardwareClass.prefix || "-" || HardwareObjects.inTypeId) as identifier, inTypeId, HardwareClass.description, HardwareClass.operativeSystem, HardwareClass.hardwareType
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
    if True:#compare_digest(body["adminPwd"], hashedAdminPwd):
        cur = get_db().cursor()
        hardware = cur.execute('''
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
        return json.dumps(hardware)

@app.route("/app/api/getRooms", methods=["POST"])
def getRooms():
    body = request.get_json()
    if True:#compare_digest(body["adminPwd"], hashedAdminPwd):
        cur = get_db().cursor()
        hardware = cur.execute('''
        SELECT generalObjectID, name, description, location, capacity, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT Rooms.roomId, Rooms.name, Rooms.description, Rooms.location, Rooms.capacity, AvailableObjects.generalObjectID, AvailableObjects.rO FROM 
        Rooms INNER JOIN AvailableObjects 
        ON (Rooms.roomId = AvailableObjects.rO)) DT2
        LEFT JOIN 
        (SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE  ReservationTicket.startDate 
        BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+8 days", "-0.001 seconds")) ResTicket
        ON (ResTicket.objectID = DT2.generalObjectID)
        GROUP BY DT2.generalObjectID
        ''').fetchall()
        return json.dumps(hardware)

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

