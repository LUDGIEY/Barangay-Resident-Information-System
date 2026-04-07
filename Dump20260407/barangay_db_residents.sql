-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: barangay_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (1,1,'John','Doe','1990-05-15','Male','Single',1,0,'Software Developer'),(2,1,'Jane','Doe','1992-08-20','Female','Single',1,0,'Graphic Designer'),(3,2,'Bob','Smith','1985-12-10','Male','Married',1,1,'Farmer'),(16,1,'ludgiey','mozales','2026-03-12','Female','Single',1,1,'beauty'),(17,NULL,'Marian','Salumayag','2006-01-02','Female','Married',0,1,'wala kay disney princess man'),(18,2,'ludgiey','mozales','2026-04-06','Female','Single',1,0,''),(19,1,'elgen','espinoza','2018-01-10','Female','Married',1,0,'manager'),(20,4,'Jamaica','Fideles','2006-03-02','Female','Single',1,0,'CEO'),(21,6,'Joan','Daming','2005-07-22','Female','Married',0,1,'housewife'),(22,7,'Quenn','Manco','2003-07-18','Female','Separated',1,0,''),(23,5,'Regine','Velasco','2007-11-23','Female','Widowed',0,0,''),(24,9,'Angel','Penas','2026-04-05','Female','Widowed',0,1,''),(25,12,'jack','carsolim','2026-04-05','Male','Single',1,0,''),(26,14,'josephine','Isiang','2002-08-06','Female','Married',0,0,'house'),(27,14,'josephine','Isiang','2002-08-06','Male','Single',1,0,'housewife'),(28,13,'dona','pareja','2008-05-14','Female','Single',1,0,'student'),(29,10,'jovien','remando','2005-09-13','Male','Married',1,0,'pulis'),(30,18,'albert','flores','2006-10-20','Male','Single',1,0,''),(31,17,'prince','duavis','2003-01-05','Male','Widowed',0,1,''),(32,16,'antonio','selades','2008-08-25','Male','Widowed',0,1,'');
/*!40000 ALTER TABLE `residents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-07 11:32:35
