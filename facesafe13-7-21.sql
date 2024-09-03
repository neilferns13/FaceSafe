CREATE DATABASE  IF NOT EXISTS `facesafe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `facesafe`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: facesafe
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `family`
--

DROP TABLE IF EXISTS `family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family` (
  `Fam_ID` int NOT NULL AUTO_INCREMENT,
  `Flat_no` int DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Age` smallint unsigned DEFAULT NULL,
  `Phone_no` bigint DEFAULT NULL,
  `Relation` varchar(45) DEFAULT NULL,
  `Photo_Ext` varchar(255) DEFAULT NULL,
  `imageUID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Fam_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family`
--

LOCK TABLES `family` WRITE;
/*!40000 ALTER TABLE `family` DISABLE KEYS */;
/*!40000 ALTER TABLE `family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `Log_ID` int NOT NULL AUTO_INCREMENT,
  `Flat_no` varchar(45) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Time` datetime DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Log_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,'1','Naresh','2021-12-31 14:32:32',NULL),(2,'54','Ayush','2021-01-21 10:52:55',NULL),(3,'54','Sameer','2021-01-22 23:12:22',NULL),(4,'54','Yasho','2021-01-22 23:12:22',NULL),(5,'54','Zakir','2021-01-22 23:12:22',NULL),(6,'1','Parul','2021-12-14 14:32:32',NULL),(7,'1','Anthony','2021-01-22 23:12:22',NULL),(8,'1','Jospeh','2021-01-22 23:42:33',NULL),(9,'54','Neil','2021-01-23 14:12:22',NULL),(10,'54','Zakir','2021-01-30 14:12:22',NULL);
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_permission`
--

DROP TABLE IF EXISTS `master_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_permission` (
  `Flat_no` int NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Phone_no` bigint DEFAULT NULL,
  `imageUID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Flat_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_permission`
--

LOCK TABLES `master_permission` WRITE;
/*!40000 ALTER TABLE `master_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resident`
--

DROP TABLE IF EXISTS `resident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resident` (
  `Email_ID` varchar(50) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Age` smallint unsigned DEFAULT NULL,
  `Phone_no` bigint DEFAULT NULL,
  `Flat_no` int NOT NULL,
  `imageUID` varchar(255) DEFAULT NULL,
  `Master_pass` varchar(20) NOT NULL,
  `Imageaddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Email_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resident`
--

LOCK TABLES `resident` WRITE;
/*!40000 ALTER TABLE `resident` DISABLE KEYS */;
INSERT INTO `resident` VALUES ('kanyal.lavi@gmail.com','Ayush Kanyal','Male',22,7020267377,54,'RAyush117211118','654321','\\images\\Residents\\RAyush117211118.PNG'),('test@google.com','Sam','Male',25,5247851369,1,NULL,'123456',NULL);
/*!40000 ALTER TABLE `resident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `StaffID` int NOT NULL AUTO_INCREMENT,
  `Flat_no` int NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Age` smallint unsigned DEFAULT NULL,
  `Phone_no` bigint DEFAULT NULL,
  `Profession` varchar(45) DEFAULT NULL,
  `Working_hours_from` time DEFAULT NULL,
  `Working_hours_to` time DEFAULT NULL,
  `Photo_staff` varchar(255) DEFAULT NULL,
  `imageUID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`StaffID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor`
--

DROP TABLE IF EXISTS `visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitor` (
  `VisitorID` int NOT NULL AUTO_INCREMENT,
  `Flat_no` int NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Phone_no` bigint DEFAULT NULL,
  `Purpose` varchar(255) DEFAULT NULL,
  `Time` timestamp NULL DEFAULT NULL,
  `Photo_Visitor` varchar(255) DEFAULT NULL,
  `imageUID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`VisitorID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor`
--

LOCK TABLES `visitor` WRITE;
/*!40000 ALTER TABLE `visitor` DISABLE KEYS */;
INSERT INTO `visitor` VALUES (1,1,'Rahul',5469873210,'Amazon Delivery','2021-03-03 04:45:21',NULL,NULL),(3,54,'Sham',9873216540,'Friend','2021-03-03 09:32:52',NULL,NULL),(4,54,'Ron',9878521470,'Swiggy Delivery','2021-03-04 05:15:10',NULL,NULL),(5,1,'Kamlesh',9876352410,'FoodPanda','2021-03-04 05:20:10',NULL,NULL),(6,54,'Zakir',9632565470,'Friend','2021-03-06 05:15:10',NULL,NULL);
/*!40000 ALTER TABLE `visitor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 12:15:55
