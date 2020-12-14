CREATE DATABASE  IF NOT EXISTS `ticketbox1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ticketbox1`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: ticketbox1
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `description` text,
  `duration` int DEFAULT NULL,
  `genre` varchar(30) DEFAULT NULL,
  `director` varchar(45) DEFAULT NULL,
  `Cast` varchar(100) DEFAULT NULL,
  `releasedate` datetime DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `linkFilm` varchar(30) DEFAULT NULL,
  `video` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10008 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (10000,'DORAEMON  Nobita\'s New Dinosaur (2020)','Nobita hatches two new dinosaurs, named Kyu and Myu, via the Time Cloth. Nobita nurtures and takes care of these dinosaurs, to prove to his friends that he can find a real dinosaur. Once the dinosaurs are of age, Nobita shows them to Shizuka, Gian, and Suneo.',118,'Animation','Kazuaki Imai',NULL,'2020-11-25 00:00:00','Vienamese. English','/images/doraemon.jpg','<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/7ZbhWq2PybY\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),(10001,'SAI GON IN THE RAIN','Saigon In the Rain is a story about love & dreams of young people from all over the world who find each other in Saigon and then get lost in the middle of Saigon. And you? Can I meet my ‘youthfulness’ in the first rain of the season?',105,'Romance','Le Minh Hoang','Avin Lu, Ho Thu Anh','2020-11-20 00:00:00','Vietnamese','/images/saigonintherain.jpg','<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/3d91fe4A3pA\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),(10002,'THE WITCHES','Based on the book by Roald Dahl, The Witches is a story about a little boy and his kindly grandmother thwart the efforts of a coven of witches to rid Britain of children by turning them into mice.',94,'Adventure, Comedy, Family','Robert Zemeckis','Anne Hathaway, Octavia Spencer','2020-12-01 00:00:00','English, Vietnamese','/images/thewitches.gif','<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/9nlhmJF5FNI\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),(10003,'SOUL','A musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul learning about herself.',100,'Adventure, Animation','Pete Docter','Tina Fey, Jamie Foxx','2020-12-12 00:00:00','English, Vietnamese','/images/soul.jpg','<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xOsLIiBStEs\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),(10004,'WONDER WOMAN','Fast forward to the 1980s as Wonder Woman’s next big screen adventure finds her facing two all-new foes: Max Lord and The Cheetah, while reuniting with her past love Steve Trevor.',120,'Action, Fantasy','Patty Jenkins','Gal Gadot, Chris Pine','2020-12-20 00:00:00','English, Vietnamese','/images/wonderwoman.gif','<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/XW2E2Fnh52w\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),(10005,'PAWN','Du-seok (SUNG Dong Il) and Jong-bae (KIM Hiewon) are tough-rough private loan sharks who chase down a debtor to collect but end up taking Seung-yi (PARK Soi), a 9-year-old girl, as a pawn. “What does pawn mean?” Without even knowing what it means, Seung-yi becomes a pawn due to her mother’s misfortunes.',113,'Comedy, Drama','Kang Dae Kyu','Sung Dong Il, Ha Ji Won','2020-12-15 00:00:00','English','/images/pawn.jpg','<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/fZa5Cz4GJlY\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),(10006,'SKYLIN3S','SKYLIN3S - The American science fiction disaster trilogy, about the life on Earth after 15 years from the second movies. When a virus threatens to turn the now earth-dwelling friendly alien hybrids against humans, Captain Rose Corley must lead a team of elite mercenaries on a mission to the alien world in order to save whats left of humanity.',114,'Action, Drama','Liam O\'Donnell','Lindsey Morgan, Rhona Mitra, Alexander Siddig','2020-12-17 00:00:00','English','/images/SKYLIN3S.jpg','<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/zeQAQK3g0kw\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>'),(10007,'DEMON SLAYER – MUGEN TRAIN','Falling forever into an endless dream.. Tanjiro and the group have completed their rehabilitation training at the Butterfly Mansion, and they arrive to their next mission on the Mugen Train, where over 40 people have disappeared in a very short period of time. Tanjiro and Nezuko, along with Zenitsu and Inosuke, join one of the most powerful swordsmen within the Demon Slayer Corps, Flame Hashira Kyojuro Rengoku, to face the demon aboard the Mugen Train on track to despair.',117,'Animation','Haruo Sotozaki','Natsuki Hanae, Akari Kito, Hiro Shimono, Yoshitsugu Matsuoka, Satoshi Hino','2020-12-20 00:00:00','Japanese with English and Vietnamese subtitles','/images/demonslayer.jpg','<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/zP0t8FzrvK8\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>');
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seatsofshowtime`
--

DROP TABLE IF EXISTS `seatsofshowtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seatsofshowtime` (
  `idshowtime` int NOT NULL,
  `idrow` int NOT NULL,
  `idcolumn` int NOT NULL,
  `status` int DEFAULT NULL,
  `ticketprice` int DEFAULT '50000',
  PRIMARY KEY (`idshowtime`,`idrow`,`idcolumn`),
  KEY `status` (`status`),
  CONSTRAINT `seatsofshowtime_ibfk_1` FOREIGN KEY (`idshowtime`) REFERENCES `showtime` (`id`),
  CONSTRAINT `seatsofshowtime_ibfk_2` FOREIGN KEY (`status`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seatsofshowtime`
--

LOCK TABLES `seatsofshowtime` WRITE;
/*!40000 ALTER TABLE `seatsofshowtime` DISABLE KEYS */;
INSERT INTO `seatsofshowtime` VALUES (30000,0,0,NULL,40000),(30000,0,1,NULL,40000),(30000,0,2,NULL,40000),(30000,0,3,NULL,40000),(30000,0,4,NULL,40000),(30000,0,5,NULL,40000),(30000,0,6,NULL,40000),(30000,0,7,NULL,40000),(30000,1,0,NULL,40000),(30000,1,1,NULL,40000),(30000,1,2,NULL,40000),(30000,1,3,NULL,40000),(30000,1,4,NULL,40000),(30000,1,5,NULL,40000),(30000,1,6,NULL,40000),(30000,1,7,NULL,40000),(30000,2,0,NULL,50000),(30000,2,1,NULL,50000),(30000,2,2,NULL,50000),(30000,2,3,NULL,50000),(30000,2,4,NULL,50000),(30000,2,5,NULL,50000),(30000,2,6,NULL,50000),(30000,2,7,NULL,50000),(30000,3,0,NULL,50000),(30000,3,1,NULL,50000),(30000,3,2,NULL,50000),(30000,3,3,NULL,50000),(30000,3,4,NULL,50000),(30000,3,5,NULL,50000),(30000,3,6,NULL,50000),(30000,3,7,NULL,50000),(30000,4,0,NULL,50000),(30000,4,1,NULL,50000),(30000,4,2,NULL,50000),(30000,4,3,NULL,50000),(30000,4,4,NULL,50000),(30000,4,5,NULL,50000),(30000,4,6,NULL,50000),(30000,4,7,NULL,50000),(30001,0,0,NULL,40000),(30001,0,1,NULL,40000),(30001,0,2,NULL,40000),(30001,0,3,NULL,40000),(30001,0,4,NULL,40000),(30001,0,5,NULL,40000),(30001,0,6,NULL,40000),(30001,0,7,NULL,40000),(30001,1,0,NULL,40000),(30001,1,1,NULL,40000),(30001,1,2,NULL,40000),(30001,1,3,NULL,40000),(30001,1,4,NULL,40000),(30001,1,5,NULL,40000),(30001,1,6,NULL,40000),(30001,1,7,NULL,40000),(30001,2,0,NULL,50000),(30001,2,1,NULL,50000),(30001,2,2,NULL,50000),(30001,2,3,NULL,50000),(30001,2,4,NULL,50000),(30001,2,5,NULL,50000),(30001,2,6,NULL,50000),(30001,2,7,NULL,50000),(30001,3,0,NULL,50000),(30001,3,1,NULL,50000),(30001,3,2,NULL,50000),(30001,3,3,NULL,50000),(30001,3,4,NULL,50000),(30001,3,5,NULL,50000),(30001,3,6,NULL,50000),(30001,3,7,NULL,50000),(30001,4,0,NULL,50000),(30001,4,1,NULL,50000),(30001,4,2,NULL,50000),(30001,4,3,NULL,50000),(30001,4,4,NULL,50000),(30001,4,5,NULL,50000),(30001,4,6,NULL,50000),(30001,4,7,NULL,50000),(30002,0,0,NULL,40000),(30002,0,1,NULL,40000),(30002,0,2,NULL,40000),(30002,0,3,NULL,40000),(30002,0,4,NULL,40000),(30002,0,5,NULL,40000),(30002,0,6,NULL,40000),(30002,0,7,NULL,40000),(30002,1,0,NULL,40000),(30002,1,1,NULL,40000),(30002,1,2,NULL,40000),(30002,1,3,NULL,40000),(30002,1,4,NULL,40000),(30002,1,5,NULL,40000),(30002,1,6,NULL,40000),(30002,1,7,NULL,40000),(30002,2,0,NULL,50000),(30002,2,1,NULL,50000),(30002,2,2,NULL,50000),(30002,2,3,NULL,50000),(30002,2,4,NULL,50000),(30002,2,5,NULL,50000),(30002,2,6,NULL,50000),(30002,2,7,NULL,50000),(30002,3,0,NULL,50000),(30002,3,1,NULL,50000),(30002,3,2,NULL,50000),(30002,3,3,NULL,50000),(30002,3,4,NULL,50000),(30002,3,5,NULL,50000),(30002,3,6,NULL,50000),(30002,3,7,NULL,50000),(30002,4,0,NULL,50000),(30002,4,1,NULL,50000),(30002,4,2,NULL,50000),(30002,4,3,NULL,50000),(30002,4,4,NULL,50000),(30002,4,5,NULL,50000),(30002,4,6,NULL,50000),(30002,4,7,NULL,50000),(30003,0,0,NULL,40000),(30003,0,1,NULL,40000),(30003,0,2,NULL,40000),(30003,0,3,NULL,40000),(30003,0,4,NULL,40000),(30003,0,5,NULL,40000),(30003,0,6,NULL,40000),(30003,0,7,NULL,40000),(30003,1,0,NULL,40000),(30003,1,1,NULL,40000),(30003,1,2,NULL,40000),(30003,1,3,NULL,40000),(30003,1,4,NULL,40000),(30003,1,5,NULL,40000),(30003,1,6,NULL,40000),(30003,1,7,NULL,40000),(30003,2,0,NULL,50000),(30003,2,1,NULL,50000),(30003,2,2,NULL,50000),(30003,2,3,NULL,50000),(30003,2,4,NULL,50000),(30003,2,5,NULL,50000),(30003,2,6,NULL,50000),(30003,2,7,NULL,50000),(30003,3,0,NULL,50000),(30003,3,1,NULL,50000),(30003,3,2,NULL,50000),(30003,3,3,NULL,50000),(30003,3,4,NULL,50000),(30003,3,5,NULL,50000),(30003,3,6,NULL,50000),(30003,3,7,NULL,50000),(30003,4,0,NULL,50000),(30003,4,1,NULL,50000),(30003,4,2,NULL,50000),(30003,4,3,NULL,50000),(30003,4,4,NULL,50000),(30003,4,5,NULL,50000),(30003,4,6,NULL,50000),(30003,4,7,NULL,50000),(30004,0,0,NULL,40000),(30004,0,1,NULL,40000),(30004,0,2,NULL,40000),(30004,0,3,NULL,40000),(30004,0,4,NULL,40000),(30004,0,5,NULL,40000),(30004,0,6,NULL,40000),(30004,0,7,NULL,40000),(30004,1,0,NULL,40000),(30004,1,1,NULL,40000),(30004,1,2,NULL,40000),(30004,1,3,NULL,40000),(30004,1,4,NULL,40000),(30004,1,5,NULL,40000),(30004,1,6,NULL,40000),(30004,1,7,NULL,40000),(30004,2,0,NULL,50000),(30004,2,1,NULL,50000),(30004,2,2,NULL,50000),(30004,2,3,NULL,50000),(30004,2,4,NULL,50000),(30004,2,5,NULL,50000),(30004,2,6,NULL,50000),(30004,2,7,NULL,50000),(30004,3,0,NULL,50000),(30004,3,1,NULL,50000),(30004,3,2,NULL,50000),(30004,3,3,NULL,50000),(30004,3,4,NULL,50000),(30004,3,5,NULL,50000),(30004,3,6,NULL,50000),(30004,3,7,NULL,50000),(30004,4,0,NULL,50000),(30004,4,1,NULL,50000),(30004,4,2,NULL,50000),(30004,4,3,NULL,50000),(30004,4,4,NULL,50000),(30004,4,5,NULL,50000),(30004,4,6,NULL,50000),(30004,4,7,NULL,50000),(30005,0,0,NULL,40000),(30005,0,1,NULL,40000),(30005,0,2,NULL,40000),(30005,0,3,NULL,40000),(30005,0,4,NULL,40000),(30005,0,5,NULL,40000),(30005,0,6,NULL,40000),(30005,0,7,NULL,40000),(30005,1,0,NULL,40000),(30005,1,1,NULL,40000),(30005,1,2,NULL,40000),(30005,1,3,NULL,40000),(30005,1,4,NULL,40000),(30005,1,5,NULL,40000),(30005,1,6,NULL,40000),(30005,1,7,NULL,40000),(30005,2,0,NULL,50000),(30005,2,1,NULL,50000),(30005,2,2,NULL,50000),(30005,2,3,NULL,50000),(30005,2,4,NULL,50000),(30005,2,5,NULL,50000),(30005,2,6,NULL,50000),(30005,2,7,NULL,50000),(30005,3,0,NULL,50000),(30005,3,1,NULL,50000),(30005,3,2,NULL,50000),(30005,3,3,NULL,50000),(30005,3,4,NULL,50000),(30005,3,5,NULL,50000),(30005,3,6,NULL,50000),(30005,3,7,NULL,50000),(30005,4,0,NULL,50000),(30005,4,1,NULL,50000),(30005,4,2,NULL,50000),(30005,4,3,NULL,50000),(30005,4,4,NULL,50000),(30005,4,5,NULL,50000),(30005,4,6,NULL,50000),(30005,4,7,NULL,50000),(30006,0,0,NULL,40000),(30006,0,1,NULL,40000),(30006,0,2,NULL,40000),(30006,0,3,NULL,40000),(30006,0,4,NULL,40000),(30006,0,5,NULL,40000),(30006,0,6,NULL,40000),(30006,0,7,NULL,40000),(30006,1,0,NULL,40000),(30006,1,1,NULL,40000),(30006,1,2,NULL,40000),(30006,1,3,NULL,40000),(30006,1,4,NULL,40000),(30006,1,5,NULL,40000),(30006,1,6,NULL,40000),(30006,1,7,NULL,40000),(30006,2,0,NULL,50000),(30006,2,1,NULL,50000),(30006,2,2,NULL,50000),(30006,2,3,NULL,50000),(30006,2,4,NULL,50000),(30006,2,5,NULL,50000),(30006,2,6,NULL,50000),(30006,2,7,NULL,50000),(30006,3,0,NULL,50000),(30006,3,1,NULL,50000),(30006,3,2,NULL,50000),(30006,3,3,NULL,50000),(30006,3,4,NULL,50000),(30006,3,5,NULL,50000),(30006,3,6,NULL,50000),(30006,3,7,NULL,50000),(30006,4,0,NULL,50000),(30006,4,1,NULL,50000),(30006,4,2,NULL,50000),(30006,4,3,NULL,50000),(30006,4,4,NULL,50000),(30006,4,5,NULL,50000),(30006,4,6,NULL,50000),(30006,4,7,NULL,50000),(30007,0,0,NULL,40000),(30007,0,1,NULL,40000),(30007,0,2,NULL,40000),(30007,0,3,NULL,40000),(30007,0,4,NULL,40000),(30007,0,5,NULL,40000),(30007,0,6,NULL,40000),(30007,0,7,NULL,40000),(30007,1,0,NULL,40000),(30007,1,1,NULL,40000),(30007,1,2,NULL,40000),(30007,1,3,NULL,40000),(30007,1,4,NULL,40000),(30007,1,5,NULL,40000),(30007,1,6,NULL,40000),(30007,1,7,NULL,40000),(30007,2,0,NULL,50000),(30007,2,1,NULL,50000),(30007,2,2,NULL,50000),(30007,2,3,NULL,50000),(30007,2,4,NULL,50000),(30007,2,5,NULL,50000),(30007,2,6,NULL,50000),(30007,2,7,NULL,50000),(30007,3,0,NULL,50000),(30007,3,1,NULL,50000),(30007,3,2,NULL,50000),(30007,3,3,NULL,50000),(30007,3,4,NULL,50000),(30007,3,5,NULL,50000),(30007,3,6,NULL,50000),(30007,3,7,NULL,50000),(30007,4,0,NULL,50000),(30007,4,1,NULL,50000),(30007,4,2,NULL,50000),(30007,4,3,NULL,50000),(30007,4,4,NULL,50000),(30007,4,5,NULL,50000),(30007,4,6,NULL,50000),(30007,4,7,NULL,50000),(30008,0,0,NULL,40000),(30008,0,1,NULL,40000),(30008,0,2,NULL,40000),(30008,0,3,NULL,40000),(30008,0,4,NULL,40000),(30008,0,5,NULL,40000),(30008,0,6,NULL,40000),(30008,0,7,NULL,40000),(30008,1,0,NULL,40000),(30008,1,1,NULL,40000),(30008,1,2,NULL,40000),(30008,1,3,NULL,40000),(30008,1,4,NULL,40000),(30008,1,5,NULL,40000),(30008,1,6,NULL,40000),(30008,1,7,NULL,40000),(30008,2,0,NULL,50000),(30008,2,1,NULL,50000),(30008,2,2,NULL,50000),(30008,2,3,NULL,50000),(30008,2,4,NULL,50000),(30008,2,5,NULL,50000),(30008,2,6,NULL,50000),(30008,2,7,NULL,50000),(30008,3,0,NULL,50000),(30008,3,1,NULL,50000),(30008,3,2,NULL,50000),(30008,3,3,NULL,50000),(30008,3,4,NULL,50000),(30008,3,5,NULL,50000),(30008,3,6,NULL,50000),(30008,3,7,NULL,50000),(30008,4,0,NULL,50000),(30008,4,1,NULL,50000),(30008,4,2,NULL,50000),(30008,4,3,NULL,50000),(30008,4,4,NULL,50000),(30008,4,5,NULL,50000),(30008,4,6,NULL,50000),(30008,4,7,NULL,50000),(30009,0,0,NULL,40000),(30009,0,1,NULL,40000),(30009,0,2,NULL,40000),(30009,0,3,NULL,40000),(30009,0,4,NULL,40000),(30009,0,5,NULL,40000),(30009,0,6,NULL,40000),(30009,0,7,NULL,40000),(30009,1,0,NULL,40000),(30009,1,1,NULL,40000),(30009,1,2,NULL,40000),(30009,1,3,NULL,40000),(30009,1,4,NULL,40000),(30009,1,5,NULL,40000),(30009,1,6,NULL,40000),(30009,1,7,NULL,40000),(30009,2,0,NULL,50000),(30009,2,1,NULL,50000),(30009,2,2,NULL,50000),(30009,2,3,NULL,50000),(30009,2,4,NULL,50000),(30009,2,5,NULL,50000),(30009,2,6,NULL,50000),(30009,2,7,NULL,50000),(30009,3,0,NULL,50000),(30009,3,1,NULL,50000),(30009,3,2,NULL,50000),(30009,3,3,NULL,50000),(30009,3,4,NULL,50000),(30009,3,5,NULL,50000),(30009,3,6,NULL,50000),(30009,3,7,NULL,50000),(30009,4,0,NULL,50000),(30009,4,1,NULL,50000),(30009,4,2,NULL,50000),(30009,4,3,NULL,50000),(30009,4,4,NULL,50000),(30009,4,5,NULL,50000),(30009,4,6,NULL,50000),(30009,4,7,NULL,50000);
/*!40000 ALTER TABLE `seatsofshowtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showtime`
--

DROP TABLE IF EXISTS `showtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idtheater` int DEFAULT NULL,
  `idfilm` int DEFAULT NULL,
  `starttime` varchar(10) DEFAULT NULL,
  `numberofrows` int DEFAULT '7',
  `numberofcolumns` int DEFAULT '10',
  PRIMARY KEY (`id`),
  KEY `idtheater` (`idtheater`),
  KEY `idfilm` (`idfilm`),
  CONSTRAINT `showtime_ibfk_1` FOREIGN KEY (`idtheater`) REFERENCES `theater` (`id`),
  CONSTRAINT `showtime_ibfk_2` FOREIGN KEY (`idfilm`) REFERENCES `film` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30010 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtime`
--

LOCK TABLES `showtime` WRITE;
/*!40000 ALTER TABLE `showtime` DISABLE KEYS */;
INSERT INTO `showtime` VALUES (30000,10001,10005,'8pm',5,8),(30001,10002,10005,'6pm',5,8),(30002,10001,10002,'8am',5,8),(30003,10003,10002,'10am',5,8),(30004,10004,10004,'7pm',5,8),(30005,10004,10003,'10:30pm',5,8),(30006,10005,10004,'2pm',5,8),(30007,10001,10004,'1:30pm',5,8),(30008,10004,10001,'3pm',5,8),(30009,10002,10005,'3pm',5,8);
/*!40000 ALTER TABLE `showtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theater`
--

DROP TABLE IF EXISTS `theater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theater` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES (10000,'CGV Su Van Hanh','123 Su Van Hanh Street, District 10, Ho Chi Minh City'),(10001,'Galaxy Cinema','1987 Ba Thang Hai, District Thu Duc, Ho Chi Minh City'),(10002,'Lotte Cinema','56 Nguyen Van Cu Street, District 5, Ho Chi Minh City'),(10003,'Meganet','875 Nguyen Tri Phuong Street, District 3, Ho Chi Minh City'),(10004,'CGV Hung Vuong','198 Hung Vuong Street, District 1, Ho Chi Minh City'),(10005,'Lotte Nowzone','1975 Dien Bien Phu Street, District 2, Ho Chi Minh City');
/*!40000 ALTER TABLE `theater` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(45) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(10) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `point` int DEFAULT '0',
  `favouriteGenre` varchar(30) DEFAULT NULL,
  `isadmin` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10000,'Nguyen Ngoc An','1999-12-22 00:00:00','nnan','22121995','0345889111',22,'Comedy, Action',_binary '\0'),(10001,'Nguyen Vu Lan Ngoc','2000-10-26 00:00:00','nvlngoc','12345','0987654789',111,'Fiction, Romantic',_binary '\0'),(10002,'Dang Quang Loc','2000-01-01 00:00:00','dqloc','12345','0916238789',111,'Drama',_binary '\0'),(10003,'Nguyen Van Anh','2001-02-02 00:00:00','nvanh','12345','0346789012',234,'Comedy, Drama',_binary '\0'),(10004,'Nguyen Thi Thuy Linh','1999-12-22 00:00:00','nttlinh','22121999','0345881011',0,NULL,_binary ''),(10005,'Nguyen Pham Thanh Vy','2000-10-26 00:00:00','nptvy','12345','0245678234',0,NULL,_binary ''),(10006,'Nguyen Thanh Dat','2000-01-01 00:00:00','ntdat','12345','0345234567',0,NULL,_binary '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-14 10:19:34
