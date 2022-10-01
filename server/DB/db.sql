PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "RegisteredChanges" (
	"id"	INTEGER NOT NULL,
	"userId"	INTEGER NOT NULL,
	"date"	TEXT NOT NULL,
	"type"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("userId") REFERENCES "Users"("id")
);
CREATE TABLE IF NOT EXISTS "Countries" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO Countries VALUES(1,'Afghanistan');
INSERT INTO Countries VALUES(2,'Aland Islands');
INSERT INTO Countries VALUES(3,'Albania');
INSERT INTO Countries VALUES(4,'Algeria');
INSERT INTO Countries VALUES(5,'American Samoa');
INSERT INTO Countries VALUES(6,'Andorra');
INSERT INTO Countries VALUES(7,'Angola');
INSERT INTO Countries VALUES(8,'Anguilla');
INSERT INTO Countries VALUES(9,'Antarctica');
INSERT INTO Countries VALUES(10,'Antigua and Barbuda');
INSERT INTO Countries VALUES(11,'Argentina');
INSERT INTO Countries VALUES(12,'Armenia');
INSERT INTO Countries VALUES(13,'Aruba');
INSERT INTO Countries VALUES(14,'Australia');
INSERT INTO Countries VALUES(15,'Austria');
INSERT INTO Countries VALUES(16,'Azerbaijan');
INSERT INTO Countries VALUES(17,'Bahamas');
INSERT INTO Countries VALUES(18,'Bahrain');
INSERT INTO Countries VALUES(19,'Bangladesh');
INSERT INTO Countries VALUES(20,'Barbados');
INSERT INTO Countries VALUES(21,'Belarus');
INSERT INTO Countries VALUES(22,'Belgium');
INSERT INTO Countries VALUES(23,'Belize');
INSERT INTO Countries VALUES(24,'Benin');
INSERT INTO Countries VALUES(25,'Bermuda');
INSERT INTO Countries VALUES(26,'Bhutan');
INSERT INTO Countries VALUES(27,'Bolivia');
INSERT INTO Countries VALUES(28,'Bonaire, Sint Eustatius and Saba');
INSERT INTO Countries VALUES(29,'Bosnia and Herzegovina');
INSERT INTO Countries VALUES(30,'Botswana');
INSERT INTO Countries VALUES(31,'Bouvet Island');
INSERT INTO Countries VALUES(32,'Brazil');
INSERT INTO Countries VALUES(33,'British Indian Ocean Territory');
INSERT INTO Countries VALUES(34,'Brunei Darussalam');
INSERT INTO Countries VALUES(35,'Bulgaria');
INSERT INTO Countries VALUES(36,'Burkina Faso');
INSERT INTO Countries VALUES(37,'Burundi');
INSERT INTO Countries VALUES(38,'Cambodia');
INSERT INTO Countries VALUES(39,'Cameroon');
INSERT INTO Countries VALUES(40,'Canada');
INSERT INTO Countries VALUES(41,'Cape Verde');
INSERT INTO Countries VALUES(42,'Cayman Islands');
INSERT INTO Countries VALUES(43,'Central African Republic');
INSERT INTO Countries VALUES(44,'Chad');
INSERT INTO Countries VALUES(45,'Chile');
INSERT INTO Countries VALUES(46,'China');
INSERT INTO Countries VALUES(47,'Christmas Island');
INSERT INTO Countries VALUES(48,'Cocos (Keeling) Islands');
INSERT INTO Countries VALUES(49,'Colombia');
INSERT INTO Countries VALUES(50,'Comoros');
INSERT INTO Countries VALUES(51,'Congo');
INSERT INTO Countries VALUES(52,'Congo, Democratic Republic of the Congo');
INSERT INTO Countries VALUES(53,'Cook Islands');
INSERT INTO Countries VALUES(54,'Costa Rica');
INSERT INTO Countries VALUES(55,'Cote D''Ivoire');
INSERT INTO Countries VALUES(56,'Croatia');
INSERT INTO Countries VALUES(57,'Cuba');
INSERT INTO Countries VALUES(58,'Curacao');
INSERT INTO Countries VALUES(59,'Cyprus');
INSERT INTO Countries VALUES(60,'Czech Republic');
INSERT INTO Countries VALUES(61,'Denmark');
INSERT INTO Countries VALUES(62,'Djibouti');
INSERT INTO Countries VALUES(63,'Dominica');
INSERT INTO Countries VALUES(64,'Dominican Republic');
INSERT INTO Countries VALUES(65,'Ecuador');
INSERT INTO Countries VALUES(66,'Egypt');
INSERT INTO Countries VALUES(67,'El Salvador');
INSERT INTO Countries VALUES(68,'Equatorial Guinea');
INSERT INTO Countries VALUES(69,'Eritrea');
INSERT INTO Countries VALUES(70,'Estonia');
INSERT INTO Countries VALUES(71,'Ethiopia');
INSERT INTO Countries VALUES(72,'Falkland Islands (Malvinas)');
INSERT INTO Countries VALUES(73,'Faroe Islands');
INSERT INTO Countries VALUES(74,'Fiji');
INSERT INTO Countries VALUES(75,'Finland');
INSERT INTO Countries VALUES(76,'France');
INSERT INTO Countries VALUES(77,'French Guiana');
INSERT INTO Countries VALUES(78,'French Polynesia');
INSERT INTO Countries VALUES(79,'French Southern Territories');
INSERT INTO Countries VALUES(80,'Gabon');
INSERT INTO Countries VALUES(81,'Gambia');
INSERT INTO Countries VALUES(82,'Georgia');
INSERT INTO Countries VALUES(83,'Germany');
INSERT INTO Countries VALUES(84,'Ghana');
INSERT INTO Countries VALUES(85,'Gibraltar');
INSERT INTO Countries VALUES(86,'Greece');
INSERT INTO Countries VALUES(87,'Greenland');
INSERT INTO Countries VALUES(88,'Grenada');
INSERT INTO Countries VALUES(89,'Guadeloupe');
INSERT INTO Countries VALUES(90,'Guam');
INSERT INTO Countries VALUES(91,'Guatemala');
INSERT INTO Countries VALUES(92,'Guernsey');
INSERT INTO Countries VALUES(93,'Guinea');
INSERT INTO Countries VALUES(94,'Guinea-Bissau');
INSERT INTO Countries VALUES(95,'Guyana');
INSERT INTO Countries VALUES(96,'Haiti');
INSERT INTO Countries VALUES(97,'Heard Island and Mcdonald Islands');
INSERT INTO Countries VALUES(98,'Holy See (Vatican City State)');
INSERT INTO Countries VALUES(99,'Honduras');
INSERT INTO Countries VALUES(100,'Hong Kong');
INSERT INTO Countries VALUES(101,'Hungary');
INSERT INTO Countries VALUES(102,'Iceland');
INSERT INTO Countries VALUES(103,'India');
INSERT INTO Countries VALUES(104,'Indonesia');
INSERT INTO Countries VALUES(105,'Iran, Islamic Republic of');
INSERT INTO Countries VALUES(106,'Iraq');
INSERT INTO Countries VALUES(107,'Ireland');
INSERT INTO Countries VALUES(108,'Isle of Man');
INSERT INTO Countries VALUES(109,'Israel');
INSERT INTO Countries VALUES(110,'Italy');
INSERT INTO Countries VALUES(111,'Jamaica');
INSERT INTO Countries VALUES(112,'Japan');
INSERT INTO Countries VALUES(113,'Jersey');
INSERT INTO Countries VALUES(114,'Jordan');
INSERT INTO Countries VALUES(115,'Kazakhstan');
INSERT INTO Countries VALUES(116,'Kenya');
INSERT INTO Countries VALUES(117,'Kiribati');
INSERT INTO Countries VALUES(118,'Korea, Democratic People''s Republic of');
INSERT INTO Countries VALUES(119,'Korea, Republic of');
INSERT INTO Countries VALUES(120,'Kosovo');
INSERT INTO Countries VALUES(121,'Kuwait');
INSERT INTO Countries VALUES(122,'Kyrgyzstan');
INSERT INTO Countries VALUES(123,'Lao People''s Democratic Republic');
INSERT INTO Countries VALUES(124,'Latvia');
INSERT INTO Countries VALUES(125,'Lebanon');
INSERT INTO Countries VALUES(126,'Lesotho');
INSERT INTO Countries VALUES(127,'Liberia');
INSERT INTO Countries VALUES(128,'Libyan Arab Jamahiriya');
INSERT INTO Countries VALUES(129,'Liechtenstein');
INSERT INTO Countries VALUES(130,'Lithuania');
INSERT INTO Countries VALUES(131,'Luxembourg');
INSERT INTO Countries VALUES(132,'Macao');
INSERT INTO Countries VALUES(133,'Macedonia, the Former Yugoslav Republic of');
INSERT INTO Countries VALUES(134,'Madagascar');
INSERT INTO Countries VALUES(135,'Malawi');
INSERT INTO Countries VALUES(136,'Malaysia');
INSERT INTO Countries VALUES(137,'Maldives');
INSERT INTO Countries VALUES(138,'Mali');
INSERT INTO Countries VALUES(139,'Malta');
INSERT INTO Countries VALUES(140,'Marshall Islands');
INSERT INTO Countries VALUES(141,'Martinique');
INSERT INTO Countries VALUES(142,'Mauritania');
INSERT INTO Countries VALUES(143,'Mauritius');
INSERT INTO Countries VALUES(144,'Mayotte');
INSERT INTO Countries VALUES(145,'Mexico');
INSERT INTO Countries VALUES(146,'Micronesia, Federated States of');
INSERT INTO Countries VALUES(147,'Moldova, Republic of');
INSERT INTO Countries VALUES(148,'Monaco');
INSERT INTO Countries VALUES(149,'Mongolia');
INSERT INTO Countries VALUES(150,'Montenegro');
INSERT INTO Countries VALUES(151,'Montserrat');
INSERT INTO Countries VALUES(152,'Morocco');
INSERT INTO Countries VALUES(153,'Mozambique');
INSERT INTO Countries VALUES(154,'Myanmar');
INSERT INTO Countries VALUES(155,'Namibia');
INSERT INTO Countries VALUES(156,'Nauru');
INSERT INTO Countries VALUES(157,'Nepal');
INSERT INTO Countries VALUES(158,'Netherlands');
INSERT INTO Countries VALUES(159,'Netherlands Antilles');
INSERT INTO Countries VALUES(160,'New Caledonia');
INSERT INTO Countries VALUES(161,'New Zealand');
INSERT INTO Countries VALUES(162,'Nicaragua');
INSERT INTO Countries VALUES(163,'Niger');
INSERT INTO Countries VALUES(164,'Nigeria');
INSERT INTO Countries VALUES(165,'Niue');
INSERT INTO Countries VALUES(166,'Norfolk Island');
INSERT INTO Countries VALUES(167,'Northern Mariana Islands');
INSERT INTO Countries VALUES(168,'Norway');
INSERT INTO Countries VALUES(169,'Oman');
INSERT INTO Countries VALUES(170,'Pakistan');
INSERT INTO Countries VALUES(171,'Palau');
INSERT INTO Countries VALUES(172,'Palestinian Territory, Occupied');
INSERT INTO Countries VALUES(173,'Panama');
INSERT INTO Countries VALUES(174,'Papua New Guinea');
INSERT INTO Countries VALUES(175,'Paraguay');
INSERT INTO Countries VALUES(176,'Peru');
INSERT INTO Countries VALUES(177,'Philippines');
INSERT INTO Countries VALUES(178,'Pitcairn');
INSERT INTO Countries VALUES(179,'Poland');
INSERT INTO Countries VALUES(180,'Portugal');
INSERT INTO Countries VALUES(181,'Puerto Rico');
INSERT INTO Countries VALUES(182,'Qatar');
INSERT INTO Countries VALUES(183,'Reunion');
INSERT INTO Countries VALUES(184,'Romania');
INSERT INTO Countries VALUES(185,'Russian Federation');
INSERT INTO Countries VALUES(186,'Rwanda');
INSERT INTO Countries VALUES(187,'Saint Barthelemy');
INSERT INTO Countries VALUES(188,'Saint Helena');
INSERT INTO Countries VALUES(189,'Saint Kitts and Nevis');
INSERT INTO Countries VALUES(190,'Saint Lucia');
INSERT INTO Countries VALUES(191,'Saint Martin');
INSERT INTO Countries VALUES(192,'Saint Pierre and Miquelon');
INSERT INTO Countries VALUES(193,'Saint Vincent and the Grenadines');
INSERT INTO Countries VALUES(194,'Samoa');
INSERT INTO Countries VALUES(195,'San Marino');
INSERT INTO Countries VALUES(196,'Sao Tome and Principe');
INSERT INTO Countries VALUES(197,'Saudi Arabia');
INSERT INTO Countries VALUES(198,'Senegal');
INSERT INTO Countries VALUES(199,'Serbia');
INSERT INTO Countries VALUES(200,'Serbia and Montenegro');
INSERT INTO Countries VALUES(201,'Seychelles');
INSERT INTO Countries VALUES(202,'Sierra Leone');
INSERT INTO Countries VALUES(203,'Singapore');
INSERT INTO Countries VALUES(204,'Sint Maarten');
INSERT INTO Countries VALUES(205,'Slovakia');
INSERT INTO Countries VALUES(206,'Slovenia');
INSERT INTO Countries VALUES(207,'Solomon Islands');
INSERT INTO Countries VALUES(208,'Somalia');
INSERT INTO Countries VALUES(209,'South Africa');
INSERT INTO Countries VALUES(210,'South Georgia and the South Sandwich Islands');
INSERT INTO Countries VALUES(211,'South Sudan');
INSERT INTO Countries VALUES(212,'Spain');
INSERT INTO Countries VALUES(213,'Sri Lanka');
INSERT INTO Countries VALUES(214,'Sudan');
INSERT INTO Countries VALUES(215,'Suriname');
INSERT INTO Countries VALUES(216,'Svalbard and Jan Mayen');
INSERT INTO Countries VALUES(217,'Swaziland');
INSERT INTO Countries VALUES(218,'Sweden');
INSERT INTO Countries VALUES(219,'Switzerland');
INSERT INTO Countries VALUES(220,'Syrian Arab Republic');
INSERT INTO Countries VALUES(221,'Taiwan, Province of China');
INSERT INTO Countries VALUES(222,'Tajikistan');
INSERT INTO Countries VALUES(223,'Tanzania, United Republic of');
INSERT INTO Countries VALUES(224,'Thailand');
INSERT INTO Countries VALUES(225,'Timor-Leste');
INSERT INTO Countries VALUES(226,'Togo');
INSERT INTO Countries VALUES(227,'Tokelau');
INSERT INTO Countries VALUES(228,'Tonga');
INSERT INTO Countries VALUES(229,'Trinidad and Tobago');
INSERT INTO Countries VALUES(230,'Tunisia');
INSERT INTO Countries VALUES(231,'Turkey');
INSERT INTO Countries VALUES(232,'Turkmenistan');
INSERT INTO Countries VALUES(233,'Turks and Caicos Islands');
INSERT INTO Countries VALUES(234,'Tuvalu');
INSERT INTO Countries VALUES(235,'Uganda');
INSERT INTO Countries VALUES(236,'Ukraine');
INSERT INTO Countries VALUES(237,'United Arab Emirates');
INSERT INTO Countries VALUES(238,'United Kingdom');
INSERT INTO Countries VALUES(239,'United States');
INSERT INTO Countries VALUES(240,'United States Minor Outlying Islands');
INSERT INTO Countries VALUES(241,'Uruguay');
INSERT INTO Countries VALUES(242,'Uzbekistan');
INSERT INTO Countries VALUES(243,'Vanuatu');
INSERT INTO Countries VALUES(244,'Venezuela');
INSERT INTO Countries VALUES(245,'Viet Nam');
INSERT INTO Countries VALUES(246,'Virgin Islands, British');
INSERT INTO Countries VALUES(247,'Virgin Islands, U.s.');
INSERT INTO Countries VALUES(248,'Wallis and Futuna');
INSERT INTO Countries VALUES(249,'Western Sahara');
INSERT INTO Countries VALUES(250,'Yemen');
INSERT INTO Countries VALUES(251,'Zambia');
INSERT INTO Countries VALUES(252,'Zimbabwe');
CREATE TABLE IF NOT EXISTS "Users" (
	"id"	INTEGER NOT NULL,
	"dateRegistered"	TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"firstName"	TEXT NOT NULL,
	"lastName"	TEXT NOT NULL,
	"username"	TEXT NOT NULL UNIQUE,
	"birthDate"	TEXT NOT NULL,
	"organization"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"ocupation"	TEXT NOT NULL,
	"countryId"	INTEGER NOT NULL,
	"hashPassword"	TEXT NOT NULL,
	"admin"	INTEGER NOT NULL DEFAULT 0,
	"blocked"	INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("countryId") REFERENCES "Countries"("id")
);
INSERT INTO Users VALUES(1,'2022-09-28 17:57:41','Pepo','Rodriguez','pepo117','2002-11-11 11:11:11.111','Tec','A01659891@tec.mx','Estudiante',12,'d50d3319bccca99d3093b689745b168cc79ecfd0e18e3e80be6d8c6ad1061407',0,0);
CREATE TABLE IF NOT EXISTS "HardwareObjects" (
	"inTypeId"	INTEGER NOT NULL,
	"classId"	INTEGER NOT NULL,
	"inClassId"	INTEGER NOT NULL,
	FOREIGN KEY("classId") REFERENCES "HardwareClass"("classId"),
	PRIMARY KEY("inTypeId" AUTOINCREMENT)
);
INSERT INTO HardwareObjects VALUES(1,1,1);
INSERT INTO HardwareObjects VALUES(2,1,2);
INSERT INTO HardwareObjects VALUES(3,1,3);
INSERT INTO HardwareObjects VALUES(4,2,1);
INSERT INTO HardwareObjects VALUES(5,2,2);
INSERT INTO HardwareObjects VALUES(6,1,4);
CREATE TABLE IF NOT EXISTS "SoftwareClass" (
	"classId"	INTEGER NOT NULL,
	"brand"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"operativeSystem"	INTEGER NOT NULL,
	"prefix"	TEXT,
	PRIMARY KEY("classId" AUTOINCREMENT)
);
INSERT INTO SoftwareClass VALUES(1,'Adobe','Adobe XD','Adobe XD apoya al diseño vectorial y a los sitios web wireframe, creando prototipos simples e interactivos con un solo clic.​','Windows 10+','ADBXDW10');
INSERT INTO SoftwareClass VALUES(2,'Adobe','Adobe XD','Adobe XD apoya al diseño vectorial y a los sitios web wireframe, creando prototipos simples e interactivos con un solo clic.​','macOS 12 (Monterey)+','ADBXDMC12');
INSERT INTO SoftwareClass VALUES(3,'Autodesk','Autodesk Maya','Autodesk Maya es un programa informático dedicado al desarrollo de gráficos 3D por ordenador, efectos especiales, animación y de dibujo.','Windows 8+','ADMYW8');
INSERT INTO SoftwareClass VALUES(4,'Minitab Inc.','Minitab','Minitab es un programa de computadora diseñado para ejecutar funciones estadísticas básicas y avanzadas.','Windows 7+','MNTB');
CREATE TABLE IF NOT EXISTS "SoftwareObjects" (
	"inTypeId"	INTEGER NOT NULL,
	"classId"	INTEGER NOT NULL,
	"inClassId"	INTEGER NOT NULL,
	FOREIGN KEY("classId") REFERENCES "SoftwareClass"("classId") ON DELETE CASCADE,
	PRIMARY KEY("inTypeId" AUTOINCREMENT)
);
INSERT INTO SoftwareObjects VALUES(1,1,1);
INSERT INTO SoftwareObjects VALUES(2,1,2);
INSERT INTO SoftwareObjects VALUES(3,1,3);
INSERT INTO SoftwareObjects VALUES(4,1,4);
INSERT INTO SoftwareObjects VALUES(5,1,5);
INSERT INTO SoftwareObjects VALUES(6,2,1);
INSERT INTO SoftwareObjects VALUES(7,2,2);
INSERT INTO SoftwareObjects VALUES(8,2,3);
INSERT INTO SoftwareObjects VALUES(9,3,1);
INSERT INTO SoftwareObjects VALUES(10,3,2);
INSERT INTO SoftwareObjects VALUES(11,4,1);
INSERT INTO SoftwareObjects VALUES(12,4,2);
INSERT INTO SoftwareObjects VALUES(13,4,3);
INSERT INTO SoftwareObjects VALUES(14,4,4);
INSERT INTO SoftwareObjects VALUES(15,4,5);
INSERT INTO SoftwareObjects VALUES(16,4,6);
CREATE TABLE IF NOT EXISTS "AvailableObjects" (
	"generalObjectID"	INTEGER NOT NULL,
	"hO"	INTEGER,
	"sO"	INTEGER,
	"rO"	INTEGER,
	FOREIGN KEY("hO") REFERENCES "HardwareObjects"("inTypeId") ON DELETE CASCADE,
	FOREIGN KEY("sO") REFERENCES "SoftwareObjects"("inTypeId"),
	PRIMARY KEY("generalObjectID" AUTOINCREMENT)
);
INSERT INTO AvailableObjects VALUES(1,1,NULL,NULL);
INSERT INTO AvailableObjects VALUES(2,2,NULL,NULL);
INSERT INTO AvailableObjects VALUES(3,3,NULL,NULL);
INSERT INTO AvailableObjects VALUES(4,4,NULL,NULL);
INSERT INTO AvailableObjects VALUES(5,5,NULL,NULL);
INSERT INTO AvailableObjects VALUES(6,6,NULL,NULL);
INSERT INTO AvailableObjects VALUES(7,NULL,1,NULL);
INSERT INTO AvailableObjects VALUES(8,NULL,2,NULL);
INSERT INTO AvailableObjects VALUES(9,NULL,3,NULL);
INSERT INTO AvailableObjects VALUES(10,NULL,4,NULL);
INSERT INTO AvailableObjects VALUES(11,NULL,5,NULL);
INSERT INTO AvailableObjects VALUES(12,NULL,6,NULL);
INSERT INTO AvailableObjects VALUES(13,NULL,7,NULL);
INSERT INTO AvailableObjects VALUES(14,NULL,8,NULL);
INSERT INTO AvailableObjects VALUES(15,NULL,9,NULL);
INSERT INTO AvailableObjects VALUES(16,NULL,10,NULL);
INSERT INTO AvailableObjects VALUES(17,NULL,11,NULL);
INSERT INTO AvailableObjects VALUES(18,NULL,12,NULL);
INSERT INTO AvailableObjects VALUES(19,NULL,13,NULL);
INSERT INTO AvailableObjects VALUES(20,NULL,14,NULL);
INSERT INTO AvailableObjects VALUES(21,NULL,15,NULL);
INSERT INTO AvailableObjects VALUES(22,NULL,16,NULL);
INSERT INTO AvailableObjects VALUES(23,NULL,NULL,1);
INSERT INTO AvailableObjects VALUES(24,NULL,NULL,2);
INSERT INTO AvailableObjects VALUES(25,NULL,NULL,3);
INSERT INTO AvailableObjects VALUES(26,NULL,NULL,4);
INSERT INTO AvailableObjects VALUES(27,NULL,NULL,5);
CREATE TABLE IF NOT EXISTS "HardwareClass" (
	"classId"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"operativeSystem"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"prefix"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("classId" AUTOINCREMENT)
);
INSERT INTO HardwareClass VALUES(1,'Mac Book Air','macOS 12',replace(replace('{\r\n"cpu" : "M1",\r\n"ports" : {"usb4" : 2, "jack" : 1},\r\n"ram" : 8,\r\n"rom": {"ssd":256}\r\n}','\r',char(13)),'\n',char(10)),'MACAMTR');
INSERT INTO HardwareClass VALUES(2,'DELL PC','Windows 10',replace(replace('{\r\n"cpu" : "i5",\r\n"ports" : {"usb3" : 3, "hdmi" :1, "jack" : 1},\r\n"ram" : 8,\r\n"rom": {"ssd":128, "hdd":1024}\r\n}','\r',char(13)),'\n',char(10)),'DLPCW10');
CREATE TABLE IF NOT EXISTS "Rooms" (
	"roomId"	INTEGER NOT NULL,
	"label"	TEXT NOT NULL,
	"name"	TEXT,
	"location"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"capacity"	INTEGER NOT NULL,
	PRIMARY KEY("roomId" AUTOINCREMENT)
);
INSERT INTO Rooms VALUES(1,'SC01','Sala de Conferencias 01','Hub de Ciberseguridad, piso 3. ','Sala de conferencias, apta para presentaciones ejecutivas a un público grande.',50);
INSERT INTO Rooms VALUES(2,'SC02','Sala de Conferencias 02','Hub de Ciberseguridad, piso 2. ','Sala de conferencias, apta para presentaciones ejecutivas a un público grande.',40);
INSERT INTO Rooms VALUES(3,'LABFZ-01','Laboratorio de Finanzas 01','Hub de Ciberseguridad, piso 1. ','Laboratorio de finanzas. Cuenta con 20 equipos de Bloomberg especializados para tareas pesadas de finanzas.',21);
INSERT INTO Rooms VALUES(4,'LABFZ-02','Laboratorio de Finanzas 02','Hub de Ciberseguridad, piso 1. ','Laboratorio de finanzas. Cuenta con 20 equipos de Bloomberg especializados para tareas pesadas de finanzas.',21);
INSERT INTO Rooms VALUES(5,'LABFZ-03','Laboratorio de Finanzas 03','Hub de Ciberseguridad, piso 1. ','Laboratorio de finanzas. Cuenta con 20 equipos de Bloomberg especializados para tareas pesadas de finanzas.',21);
CREATE TABLE IF NOT EXISTS "ReservationTicket" (
	"ticketId"	INTEGER NOT NULL,
	"dateRegistered"	TEXT NOT NULL,
	"objectId"	INTEGER NOT NULL,
	"objectType"	TEXT NOT NULL,
	"objectName"	TEXT NOT NULL DEFAULT 'a',
	"startDate"	TEXT NOT NULL,
	"endDate"	TEXT NOT NULL,
	"userID"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	"weight"	REAL NOT NULL,
	"qrCode"	INTEGER,
	FOREIGN KEY("objectId") REFERENCES "AvailableObjects"("generalObjectID"),
	PRIMARY KEY("ticketId" AUTOINCREMENT)
);
INSERT INTO ReservationTicket VALUES(1,'2022-09-28 15:00:00.000',1,'HRDWR','Mac Book Air','2022-09-28 17:00:00.000','2022-09-28 19:00:00.000',1,'Reserva 1',2.0,NULL);
INSERT INTO ReservationTicket VALUES(2,'2022-09-28 15:00:00.000',1,'HRDWR','Mac Book Air','2022-09-29 07:00:00.000','2022-09-29 19:00:00.000',1,'Reserva 2',12.0,NULL);
INSERT INTO ReservationTicket VALUES(3,'2022-09-28 15:00:00.000',3,'HRDWR','Mac Book Air','2022-09-30 16:00:00.000','2022-09-30 16:30:00.000',1,'Reserva Dell ',2.0,NULL);
INSERT INTO ReservationTicket VALUES(4,'2022-09-28 15:00:00.000',16,'SFTWR','Autodesk Maya','2022-09-30 16:00:00.000','2022-09-30 18:30:00.000',1,'Reserva XD',2.5,NULL);
INSERT INTO ReservationTicket VALUES(5,'2022-09-28 17:00:00.000',16,'SFTWR','Autodesk Maya','2022-09-28 20:00:00.000','2022-09-28 24:30:00.000',1,'Descripción de reserva',4.0,NULL);
INSERT INTO ReservationTicket VALUES(6,'2022-09-28 17:00:00.000',13,'SFTWR','Adobe XD','2022-09-30 20:00:00.000','2022-10-01 20:00:00.000',1,'Descripción de reserva',24.0,NULL);
INSERT INTO ReservationTicket VALUES(7,'2022-09-29 9:00:00.000',27,'ROOM','Laboratorio de Finanzas 03','2022-09-30 12:00:00.000','2022-09-30 20:00:00.000',1,'Reservando sala de finanzas 3',8.0,NULL);
INSERT INTO ReservationTicket VALUES(8,'2022-09-29 9:00:00.000',26,'ROOM','Laboratorio de Finanzas 02','2022-09-30 08:00:00.000','2022-09-30 12:00:00.000',1,'Reservando sala de finanzas 2',4.0,NULL);
INSERT INTO ReservationTicket VALUES(9,'2022-09-29 9:00:00.000',26,'ROOM','Laboratorio de Finanzas 02','2022-09-30 12:30:00.000','2022-09-30 19:30:00.000',1,'Reservando sala de finanzas 2',7.5,NULL);
INSERT INTO ReservationTicket VALUES(10,'2022-10-01 17:43:14.669',4,'HRDWR','DELL PC','2022-10-02 12:00:00.000','2022-10-02 22:00:00.000',1,'Reserva Dell',10.0,'a1b2c34d5e6f7g8h');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('RegisteredChanges',0);
INSERT INTO sqlite_sequence VALUES('Countries',252);
INSERT INTO sqlite_sequence VALUES('Users',1);
INSERT INTO sqlite_sequence VALUES('HardwareObjects',6);
INSERT INTO sqlite_sequence VALUES('SoftwareClass',4);
INSERT INTO sqlite_sequence VALUES('SoftwareObjects',16);
INSERT INTO sqlite_sequence VALUES('AvailableObjects',27);
INSERT INTO sqlite_sequence VALUES('HardwareClass',2);
INSERT INTO sqlite_sequence VALUES('Rooms',5);
INSERT INTO sqlite_sequence VALUES('ReservationTicket',10);
COMMIT;
