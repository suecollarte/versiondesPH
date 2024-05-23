CREATE DATABASE  IF NOT EXISTS `proximahoraDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `proximahoraDB`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 172.29.1.77    Database: proximahoraDB
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.16-MariaDB-0ubuntu0.22.04.1

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
-- Table structure for table `auth_group`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$720000$jgJiLmeAOek8rzZm7FgM4Y$tW8NppqwxqZEHaPf8TR+ml+5Ywy6w0WMO1zuLmsuD7c=',NULL,1,'administrador','','','admin@proximahora.cl',1,1,'2024-03-22 00:49:29.465005'),(7,'pbkdf2_sha256$720000$tgvz1Jd5i4T4m3sylFt4A1$kay2NyDK+MUHiawMn9iy6yTqeVkxlprF6TBjp66iV/I=',NULL,0,'83001666','Carmen Iris','Villalobos Tapia','carmenivillalobost@gmail.com',0,0,'2024-04-12 01:21:08.038027'),(8,'!DZEKQ1kTqqDebmF2rbbanujKkjg6LcdQcKB7s89F',NULL,0,'74510876','Armando Rodrigo','Conlledo Espinosa','armandoconlledo@gmail.com',0,0,'2024-04-15 22:17:25.040939');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

