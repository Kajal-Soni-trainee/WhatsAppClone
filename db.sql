-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: WhatsAppClone
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.20.04.3

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
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20240717081007-create-users.js'),('20240717081414-create-contact-list.js'),('20240717082125-create-messages.js'),('20240717100631-addChanges.js'),('20240717114111-create-sessions.js'),('20240717124757-create-chanels.js'),('20240718044235-create-messages.js'),('20240718064925-addCaptionColumn.js'),('20240718083400-addIsSeenColumn.js'),('20240718105050-create-status.js'),('20240718113448-create-views.js'),('20240722075358-create-deleted-msgs.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chanels`
--

DROP TABLE IF EXISTS `chanels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chanels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user1_id` int DEFAULT NULL,
  `user2_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user1_id` (`user1_id`),
  KEY `user2_id` (`user2_id`),
  CONSTRAINT `chanels_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chanels_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chanels`
--

LOCK TABLES `chanels` WRITE;
/*!40000 ALTER TABLE `chanels` DISABLE KEYS */;
INSERT INTO `chanels` VALUES (1,1,2,'2024-07-17 13:08:16','2024-07-17 13:08:16',NULL),(3,2,3,'2024-07-23 05:46:26','2024-07-23 05:46:26',NULL);
/*!40000 ALTER TABLE `chanels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactLists`
--

DROP TABLE IF EXISTS `contactLists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactLists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `personal_id` int DEFAULT NULL,
  `contact_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `personal_id` (`personal_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `contactLists_ibfk_1` FOREIGN KEY (`personal_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contactLists_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactLists`
--

LOCK TABLES `contactLists` WRITE;
/*!40000 ALTER TABLE `contactLists` DISABLE KEYS */;
INSERT INTO `contactLists` VALUES (3,1,2,'2024-07-17 13:08:16','2024-07-17 13:08:16',NULL,'Kajal Didi'),(5,2,1,'2024-07-17 13:15:20','2024-07-25 13:21:40','2024-07-25 13:29:38','Karishma'),(6,2,3,'2024-07-23 05:46:26','2024-07-25 13:31:35',NULL,'Abhay'),(7,3,2,'2024-07-23 09:59:56','2024-07-23 09:59:56',NULL,'Kajal ');
/*!40000 ALTER TABLE `contactLists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deletedMsgs`
--

DROP TABLE IF EXISTS `deletedMsgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deletedMsgs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_id` int DEFAULT NULL,
  `deletedBy` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `message_id` (`message_id`),
  KEY `deletedBy` (`deletedBy`),
  CONSTRAINT `deletedMsgs_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deletedMsgs_ibfk_2` FOREIGN KEY (`deletedBy`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deletedMsgs`
--

LOCK TABLES `deletedMsgs` WRITE;
/*!40000 ALTER TABLE `deletedMsgs` DISABLE KEYS */;
INSERT INTO `deletedMsgs` VALUES (3,8,2,'2024-07-22 09:06:28','2024-07-22 09:06:28',NULL),(4,9,1,'2024-07-22 09:19:01','2024-07-22 09:19:01',NULL),(5,11,2,'2024-07-22 09:52:32','2024-07-22 09:52:32',NULL),(6,7,2,'2024-07-22 10:10:08','2024-07-22 10:10:08',NULL),(7,12,2,'2024-07-22 10:10:22','2024-07-22 10:10:22',NULL),(8,19,2,'2024-07-22 10:20:29','2024-07-22 10:20:29',NULL),(9,18,2,'2024-07-22 10:20:31','2024-07-22 10:20:31',NULL),(10,19,1,'2024-07-22 10:20:53','2024-07-22 10:20:53',NULL),(11,18,1,'2024-07-22 10:21:00','2024-07-22 10:21:00',NULL),(12,20,3,'2024-07-25 09:21:26','2024-07-25 09:21:26',NULL),(13,2,1,'2024-07-25 12:00:02','2024-07-25 12:00:02',NULL),(14,3,1,'2024-07-25 12:00:04','2024-07-25 12:00:04',NULL),(15,4,1,'2024-07-25 12:00:12','2024-07-25 12:00:12',NULL),(16,5,1,'2024-07-25 12:00:14','2024-07-25 12:00:14',NULL),(17,7,1,'2024-07-25 12:00:17','2024-07-25 12:00:17',NULL),(18,6,1,'2024-07-25 12:00:19','2024-07-25 12:00:19',NULL),(19,8,1,'2024-07-25 12:00:21','2024-07-25 12:00:21',NULL),(20,10,1,'2024-07-25 12:00:25','2024-07-25 12:00:25',NULL),(21,11,1,'2024-07-25 12:00:29','2024-07-25 12:00:29',NULL),(22,12,1,'2024-07-25 12:00:34','2024-07-25 12:00:34',NULL),(23,13,1,'2024-07-25 12:00:37','2024-07-25 12:00:37',NULL),(24,14,1,'2024-07-25 12:00:41','2024-07-25 12:00:41',NULL),(25,15,1,'2024-07-25 12:00:45','2024-07-25 12:00:45',NULL),(26,4,2,'2024-07-25 12:01:56','2024-07-25 12:01:56',NULL),(27,5,2,'2024-07-25 12:01:58','2024-07-25 12:01:58',NULL),(28,2,2,'2024-07-25 12:02:02','2024-07-25 12:02:02',NULL),(29,3,2,'2024-07-25 12:02:04','2024-07-25 12:02:04',NULL),(30,6,2,'2024-07-25 12:02:06','2024-07-25 12:02:06',NULL);
/*!40000 ALTER TABLE `deletedMsgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `chanel_id` int DEFAULT NULL,
  `messages` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `isSeen` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `chanel_id` (`chanel_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`chanel_id`) REFERENCES `chanels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (2,2,1,1,'hii Karishma','2024-07-18 05:13:04','2024-07-25 12:23:22',NULL,1),(3,2,1,1,'how are you','2024-07-18 05:13:31','2024-07-25 12:23:22',NULL,1),(4,1,2,1,'I am fine what about you','2024-07-18 05:15:45','2024-07-25 11:57:55','2024-07-25 12:00:07',1),(5,1,2,1,'I received your message after so long','2024-07-18 05:16:20','2024-07-25 13:29:55',NULL,1),(6,2,1,1,'bbvvbbvcb','2024-07-19 09:54:50','2024-07-25 12:23:22',NULL,1),(7,1,2,1,'cvbbnvnbvbn','2024-07-19 09:56:47','2024-07-25 13:29:55',NULL,1),(8,1,2,1,'vbmnbvmnvb','2024-07-20 09:19:32','2024-07-25 13:29:55',NULL,1),(9,2,1,1,'hii Kajal','2024-07-22 07:50:35','2024-07-25 12:23:22',NULL,1),(10,2,1,1,'hii ','2024-07-22 09:44:34','2024-07-25 12:23:22',NULL,1),(11,1,2,1,'good evening','2024-07-22 09:46:58','2024-07-25 13:29:55',NULL,1),(12,2,1,1,'good evening to you too','2024-07-22 09:51:03','2024-07-25 12:23:22',NULL,1),(13,2,1,1,'message vbgbhfghgf','2024-07-22 09:57:35','2024-07-25 12:23:22',NULL,1),(14,2,1,1,'gnhfgjghjmhg','2024-07-22 10:07:46','2024-07-25 12:23:22',NULL,1),(15,2,1,1,'hfbhfghfghgfh','2024-07-22 10:12:21','2024-07-25 12:23:22',NULL,1),(16,2,1,1,'dfghfghfgjjggggggggggg','2024-07-22 10:15:59','2024-07-25 12:23:22',NULL,1),(17,2,1,1,'cvgnhgfhgfh','2024-07-22 10:17:26','2024-07-25 12:23:22',NULL,1),(18,1,2,1,'cvbcvbcvbb','2024-07-22 10:18:08','2024-07-25 13:29:55',NULL,1),(19,2,1,1,'cvnvbnvbmvbnmbnbnnnnnnnnnnnnnnnnnn','2024-07-22 10:19:23','2024-07-25 12:23:22',NULL,1),(20,2,3,3,'hiii abhay','2024-07-23 08:24:43','2024-07-25 09:21:57',NULL,1),(21,3,2,3,'hiiii','2024-07-23 08:27:43','2024-07-25 13:34:22',NULL,1),(22,3,2,3,'hello','2024-07-23 10:19:24','2024-07-25 13:34:22',NULL,1),(23,3,2,3,'vcbvcbvc','2024-07-23 10:20:11','2024-07-25 13:34:22',NULL,1),(24,3,2,3,'hii how are ','2024-07-25 09:21:19','2024-07-25 13:34:22',NULL,1),(25,2,1,1,'cvbcvb','2024-07-25 11:47:03','2024-07-25 12:23:22',NULL,1),(26,1,2,1,'fdgfghfghfghgh','2024-07-25 11:48:42','2024-07-25 13:29:55',NULL,1),(27,1,2,1,'cvbcbn','2024-07-25 11:48:48','2024-07-25 13:29:55',NULL,1),(28,1,2,1,'heelo','2024-07-25 11:49:08','2024-07-25 13:29:55',NULL,1),(29,1,2,1,'hejkjhkjhkjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh','2024-07-25 11:51:18','2024-07-25 13:29:55',NULL,1),(30,1,2,1,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii','2024-07-25 11:58:24','2024-07-25 13:29:55',NULL,1),(31,1,2,1,'hrtyhfghfghfghdfzghf','2024-07-25 11:59:42','2024-07-25 13:29:55',NULL,1),(32,1,2,1,'jjhcfukyfchgvfkufytf','2024-07-25 12:04:07','2024-07-25 13:29:55',NULL,1),(33,1,2,1,'hhhhodfgfg dfgdfgdfg','2024-07-25 12:20:53','2024-07-25 13:29:55',NULL,1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (9,1,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3MjEyODY2MjJ9.SckxYI1EC-4qYrW8BkzGQQzhM1zrDVZFEYYF97-1FoA','2024-07-18 07:10:22','2024-07-25 11:48:27',NULL),(10,2,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE3MjEyODcyNDR9.5fjyaCgShGSZN29lCsIOTiGyJUMvMzVoR3VwY30HxZo','2024-07-18 07:20:45','2024-07-25 13:29:30',NULL),(11,3,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE3MjEzMDczMzZ9.k0Lj7GhqI-H_qaUoK3h7PMZT-7LUApvflVkefUNFND0','2024-07-18 12:55:36','2024-07-25 09:20:58',NULL);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `statuses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (9,2,'/uploads/status-1721728535770-915506085-boy1.jpeg','2024-07-23 09:55:35','2024-07-23 09:55:35',NULL),(11,2,'/uploads/status-1721728586314-167486053-boy3.jpeg','2024-07-23 09:56:26','2024-07-23 09:56:26',NULL),(12,2,'/uploads/status-1721899558805-239396955-build1.jpeg','2024-07-25 09:25:58','2024-07-25 09:25:58',NULL);
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `u_name` varchar(255) DEFAULT NULL,
  `u_email` varchar(255) DEFAULT NULL,
  `contact` bigint DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `u_img` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_UNIQUE` (`contact`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Karishma Soni','karishma@gmail.com',123456789,'$2b$10$WgJTjJxMeN.e1zN/4C286udJexDRmodC4zLTDGZTVPGwznrjIeBK.','2024-07-17 09:35:27','2024-07-22 13:06:43',NULL,'/uploads/img-1721653603886-100825463-divya.jpeg','cbhcvgb fghgfh fghfgj '),(2,'Kajal Soni','kajal@gmail.com',123456788,'$2b$10$8PPBO6vyJIVs2K7kC8S0ZOME76.H9gyOrndRibX4K8SM1ZtT8IvvO','2024-07-17 10:19:55','2024-07-25 09:25:49',NULL,'/uploads/img-1721899549204-763564374-Avatar.png','vdfgdfjkjbgnfbjkbkjb vgblhvfhjlvh  ljv hk'),(3,'Abhay Soni','abhay@gmail.com',123456787,'$2b$10$FCOkFHvgfNqYDHFOlRzhE.61benOZtGySJo0dNuvF4kFx9nW3ce5a','2024-07-17 10:20:22','2024-07-25 09:27:08',NULL,'/uploads/img-1721899628547-834923288-boy3.jpeg',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `viewer_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `viewer_id` (`viewer_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `views_ibfk_1` FOREIGN KEY (`viewer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `views_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES (22,3,9,'2024-07-23 10:01:03','2024-07-23 10:01:03',NULL),(23,3,11,'2024-07-23 10:01:11','2024-07-23 10:01:11',NULL),(24,3,12,'2024-07-25 09:26:28','2024-07-25 09:26:28',NULL);
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-25 19:19:22
