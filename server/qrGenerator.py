import qrcode
import hashlib
import jwt

class JWTgenerator:
    jwtToken    =   {}
    def __init__(self, jsonObject):
        self.jsonObject =   jsonObject
    def setJsonObject(self, jsonObject):
        self.jsonObject =   jsonObject
    def generateJWT(self):
        self.jwToken    =   jwt.encode(self.jsonObject, 'secret', algorithm='HS256')
    def getJsonObject(self):
        return self.jwToken

class QRgenerator:
    hash256     =   ""
    name        =   ""
    jwtObj      =   ""

    def __init__(self, jwtObj):
        self.jwtObj    =   jwtObj
    
    # Set input
    def setJWT(self, jwtObj):
        self.jwtObj =   jwtObj

    # Calculate has 256
    def genHash(self):
        self.hash256    =   hashlib.sha256(self.jwtObj.encode('utf-8')).hexdigest()

    # Generate qr
    def genQr(self):
        qr = qrcode.QRCode(version=1,
                           error_correction=qrcode.constants.ERROR_CORRECT_L,
                           box_size=8,
                           border=1,
        )
        qr.add_data(self.hash256[:int(len(self.hash256)/2)])
        qr.make(fit=True)
        self.img    =   qr.make_image(fill_color='black', black_color='white')

    # Save png img
    def saveQr(self, name):
        self.img.save(name)

def main():
    jsonObj =   {"sub"  :   "123434245243",
                 "name" :   "John Doe",
                 "iat"  :   1233352352
                }
    jwtGen  =   JWTgenerator(jsonObj)
    jwtGen.generateJWT()
    res     =   jwtGen.getJsonObject()
    print(f"hash256: {res}")

    qrg     =   QRgenerator(res)
    qrg.genHash()
    qrg.genQr()
    qrg.saveQr('myQr.png')

if __name__ == "__main__":
    main()