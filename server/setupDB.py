import sqlite3
from os.path import exists

"""
CREATE TABLE contacts (
    contact_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                    phone TEXT NOT NULL UNIQUE
                    );
"""
def create_db():
    conn = sqlite3.connect('BookMeDB.db')
    conn.commit()
    conn.close()

def main():

    #no funciona?
    if exists("DB/BookMeDB.db") == False:
        print("databse already exists")
        return

    disableForeignKeys = """PRAGMA foreign_keys = off;"""

    userTable = """
                CREATE TABLE Users(
                    id              INTEGER PRIMARY KEY,
                    dateRegistered  TEXT    NOT NULL,
                    firstName       TEXT    NOT NULL,
                    lastName        TEXT    NOT NULL,
                    userName        TEXT    NOT NULL    UNIQUE,
                    birthDate       TEXT    NOT NULL,
                    organization    TEXT    NOT NULL,
                    mail            TEXT    NOT NULL    UNIQUE,
                    ocupation       TEXT    NOT NULL,
                    countryId       TEXT    NOT NULL,
                    cellPhone       TEXT    NOT NULL,
                    hashPassword    TEXT    NOT NULL,
                    admin           INTEGER NOT NULL,
                    blocked         INTEGER NOT NULL,
                    FOREIGN KEY(countryId) REFERENCES Countries(id)
                );
                """

    reservationTicketTable = """
                             CREATE TABLE ReservationTicket(
                                id              INTEGER PRIMARY KEY,
                                dateRegistered  TEXT    NOT NULL,
                                objectID        INTEGER NOT NULL,
                                objectType      TEXT    NOT NULL,
                                startDate       TEXT    NOT NULL,
                                endDate         TEXT    NOT NULL,
                                userID          INTEGER NOT NULL,
                                description     TEXT    NOT NULL,
                                FOREIGN KEY(objectID) REFERENCES AvailableObjects(id)
                             );
                             """

    countryTable = """
                   CREATE TABLE Countries(
                        id      INTEGER PRIMARY KEY,
                        name    TEXT    NOT NULL    UNIQUE
                   );
                   """

    registeredChangeTable = """
                       CREATE TABLE RegisteredChanges(
                            id      INTEGER PRIMARY KEY,
                            userId  INTEGER NOT NULL,
                            date    TEXT    NOT NULL,
                            type    TEXT    NOT NULL,
                            FOREIGN KEY(userId) REFERENCES Users(id)
                       );
                       """

    availableObjects = """
                       CREATE TABLE AvailableObjects(
                            id      INTEGER PRIMARY KEY,
                            hO      INTEGER,
                            sO      INTEGER,
                            rO      INTEGER,
                            FOREIGN KEY(hO) REFERENCES HardwareObjects(id) ON DELETE CASCADE,
                            FOREIGN KEY(sO) REFERENCES SoftwareObjects(id) ON DELETE CASCADE,
                            FOREIGN KEY(rO) REFERENCES Rooms(id)           ON DELETE CASCADE 
                       );
                       """

    hardwareObjectTable = """
                          CREATE TABLE HardwareObjects(
                            id        INTEGER PRIMARY KEY, 
                            object    INTEGER NOT NULL  UNIQUE,
                            FOREIGN KEY(object) REFERENCES HardwareClass(id)
                          ); 
                          """

    softwareObjectTable = """
                          CREATE TABLE SoftwareObjects(
                            id      INTEGER PRIMARY KEY,
                            object  INTEGER NOT NULL UNIQUE,
                            FOREIGN KEY(object) REFERENCES SoftwareClass(id)
                          ); 
                          """

    hardwareClassTable = """
                    CREATE TABLE HardwareClass(
                        id              INTEGER PRIMARY KEY,
                        hardwareType    TEXT NOT NULL,
                        operativeSystem TEXT NOT NULL,
                        description     TEXT NOT NULL
                    );
                    """


    softwareClassTable = """
                         CREATE TABLE SoftwareClass(
                            id              INTEGER PRIMARY KEY,
                            brand           TEXT NOT NULL,
                            name            TEXT NOT NULL,
                            description     TEXT NOT NULL
                         );
                         """

    roomTable = """
                CREATE TABLE Rooms(
                    id          INTEGER PRIMARY KEY,
                    location    TEXT    NOT NULL,
                    description TEXT    NOT NULL,
                    name        TEXT    NOT NULL,
                    capacity    INTEGER NOT NULL
                );
                """

    enableForeignKeys = """PRAGMA foreign_keys = on;"""





    dbName = "DB/BookMeDB.db"
    conn = sqlite3.connect(dbName)
    curr = conn.cursor()

    qries = [disableForeignKeys,    userTable,              reservationTicketTable,
            countryTable,           registeredChangeTable,  availableObjects,
            hardwareObjectTable,    softwareObjectTable,    hardwareClassTable,
            softwareClassTable,     roomTable,              enableForeignKeys]

    for i in qries:
        curr.execute(i)

    conn.close()

if __name__ == "__main__":
    print("Setting Up data base")
    main()
    print("Completed set up data base")
