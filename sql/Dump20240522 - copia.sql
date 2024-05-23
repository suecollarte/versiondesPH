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

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add forma pago otros',7,'add_formapagootros'),(26,'Can change forma pago otros',7,'change_formapagootros'),(27,'Can delete forma pago otros',7,'delete_formapagootros'),(28,'Can view forma pago otros',7,'view_formapagootros'),(29,'Can add forma pago salud',8,'add_formapagosalud'),(30,'Can change forma pago salud',8,'change_formapagosalud'),(31,'Can delete forma pago salud',8,'delete_formapagosalud'),(32,'Can view forma pago salud',8,'view_formapagosalud'),(33,'Can add modalidad atencion',9,'add_modalidadatencion'),(34,'Can change modalidad atencion',9,'change_modalidadatencion'),(35,'Can delete modalidad atencion',9,'delete_modalidadatencion'),(36,'Can view modalidad atencion',9,'view_modalidadatencion'),(37,'Can add promociones',10,'add_promociones'),(38,'Can change promociones',10,'change_promociones'),(39,'Can delete promociones',10,'delete_promociones'),(40,'Can view promociones',10,'view_promociones'),(41,'Can add regiones',11,'add_regiones'),(42,'Can change regiones',11,'change_regiones'),(43,'Can delete regiones',11,'delete_regiones'),(44,'Can view regiones',11,'view_regiones'),(45,'Can add rubros',12,'add_rubros'),(46,'Can change rubros',12,'change_rubros'),(47,'Can delete rubros',12,'delete_rubros'),(48,'Can view rubros',12,'view_rubros'),(49,'Can add tipo prevision',13,'add_tipoprevision'),(50,'Can change tipo prevision',13,'change_tipoprevision'),(51,'Can delete tipo prevision',13,'delete_tipoprevision'),(52,'Can view tipo prevision',13,'view_tipoprevision'),(53,'Can add comunas',14,'add_comunas'),(54,'Can change comunas',14,'change_comunas'),(55,'Can delete comunas',14,'delete_comunas'),(56,'Can view comunas',14,'view_comunas'),(57,'Can add ciudades',15,'add_ciudades'),(58,'Can change ciudades',15,'change_ciudades'),(59,'Can delete ciudades',15,'delete_ciudades'),(60,'Can view ciudades',15,'view_ciudades'),(61,'Can add categorias',16,'add_categorias'),(62,'Can change categorias',16,'change_categorias'),(63,'Can delete categorias',16,'delete_categorias'),(64,'Can view categorias',16,'view_categorias'),(65,'Can add sub categorias',17,'add_subcategorias'),(66,'Can change sub categorias',17,'change_subcategorias'),(67,'Can delete sub categorias',17,'delete_subcategorias'),(68,'Can view sub categorias',17,'view_subcategorias'),(69,'Can add forma pago gral',7,'add_formapagogral'),(70,'Can change forma pago gral',7,'change_formapagogral'),(71,'Can delete forma pago gral',7,'delete_formapagogral'),(72,'Can view forma pago gral',7,'view_formapagogral'),(73,'Can add especialistas consultas',18,'add_especialistasconsultas'),(74,'Can change especialistas consultas',18,'change_especialistasconsultas'),(75,'Can delete especialistas consultas',18,'delete_especialistasconsultas'),(76,'Can view especialistas consultas',18,'view_especialistasconsultas'),(77,'Can add especialista agendas',19,'add_especialistaagendas'),(78,'Can change especialista agendas',19,'change_especialistaagendas'),(79,'Can delete especialista agendas',19,'delete_especialistaagendas'),(80,'Can view especialista agendas',19,'view_especialistaagendas'),(81,'Can add especialista fichas',20,'add_especialistafichas'),(82,'Can change especialista fichas',20,'change_especialistafichas'),(83,'Can delete especialista fichas',20,'delete_especialistafichas'),(84,'Can view especialista fichas',20,'view_especialistafichas'),(85,'Can add especialistas planes suscripcion',21,'add_especialistasplanessuscripcion'),(86,'Can change especialistas planes suscripcion',21,'change_especialistasplanessuscripcion'),(87,'Can delete especialistas planes suscripcion',21,'delete_especialistasplanessuscripcion'),(88,'Can view especialistas planes suscripcion',21,'view_especialistasplanessuscripcion'),(89,'Can add especialistas contratos',22,'add_especialistascontratos'),(90,'Can change especialistas contratos',22,'change_especialistascontratos'),(91,'Can delete especialistas contratos',22,'delete_especialistascontratos'),(92,'Can view especialistas contratos',22,'view_especialistascontratos'),(93,'Can add especialistas pagos',23,'add_especialistaspagos'),(94,'Can change especialistas pagos',23,'change_especialistaspagos'),(95,'Can delete especialistas pagos',23,'delete_especialistaspagos'),(96,'Can view especialistas pagos',23,'view_especialistaspagos'),(97,'Can add especialistas rubro salud pagos',24,'add_especialistasrubrosaludpagos'),(98,'Can change especialistas rubro salud pagos',24,'change_especialistasrubrosaludpagos'),(99,'Can delete especialistas rubro salud pagos',24,'delete_especialistasrubrosaludpagos'),(100,'Can view especialistas rubro salud pagos',24,'view_especialistasrubrosaludpagos'),(101,'Can add especialistas horas agendadas',25,'add_especialistashorasagendadas'),(102,'Can change especialistas horas agendadas',25,'change_especialistashorasagendadas'),(103,'Can delete especialistas horas agendadas',25,'delete_especialistashorasagendadas'),(104,'Can view especialistas horas agendadas',25,'view_especialistashorasagendadas'),(105,'Can add usuarios personas',26,'add_usuariospersonas'),(106,'Can change usuarios personas',26,'change_usuariospersonas'),(107,'Can delete usuarios personas',26,'delete_usuariospersonas'),(108,'Can view usuarios personas',26,'view_usuariospersonas'),(109,'Can add usuarios especialistas',27,'add_usuariosespecialistas'),(110,'Can change usuarios especialistas',27,'change_usuariosespecialistas'),(111,'Can delete usuarios especialistas',27,'delete_usuariosespecialistas'),(112,'Can view usuarios especialistas',27,'view_usuariosespecialistas'),(113,'Can add usuarios evaluacion',28,'add_usuariosevaluacion'),(114,'Can change usuarios evaluacion',28,'change_usuariosevaluacion'),(115,'Can delete usuarios evaluacion',28,'delete_usuariosevaluacion'),(116,'Can view usuarios evaluacion',28,'view_usuariosevaluacion'),(117,'Can add planes',29,'add_planes'),(118,'Can change planes',29,'change_planes'),(119,'Can delete planes',29,'delete_planes'),(120,'Can view planes',29,'view_planes');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$720000$jgJiLmeAOek8rzZm7FgM4Y$tW8NppqwxqZEHaPf8TR+ml+5Ywy6w0WMO1zuLmsuD7c=',NULL,1,'administrador','','','admin@proximahora.cl',1,1,'2024-03-22 00:49:29.465005'),(7,'pbkdf2_sha256$720000$tgvz1Jd5i4T4m3sylFt4A1$kay2NyDK+MUHiawMn9iy6yTqeVkxlprF6TBjp66iV/I=',NULL,0,'83001666','Carmen Iris','Villalobos Tapia','carmenivillalobost@gmail.com',0,0,'2024-04-12 01:21:08.038027'),(8,'!DZEKQ1kTqqDebmF2rbbanujKkjg6LcdQcKB7s89F',NULL,0,'74510876','Armando Rodrigo','Conlledo Espinosa','armandoconlledo@gmail.com',0,0,'2024-04-15 22:17:25.040939');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(19,'especialistas','especialistaagendas'),(20,'especialistas','especialistafichas'),(18,'especialistas','especialistasconsultas'),(22,'especialistas','especialistascontratos'),(25,'especialistas','especialistashorasagendadas'),(23,'especialistas','especialistaspagos'),(21,'especialistas','especialistasplanessuscripcion'),(24,'especialistas','especialistasrubrosaludpagos'),(6,'sessions','session'),(16,'tablas','categorias'),(15,'tablas','ciudades'),(14,'tablas','comunas'),(7,'tablas','formapagogral'),(8,'tablas','formapagosalud'),(9,'tablas','modalidadatencion'),(29,'tablas','planes'),(10,'tablas','promociones'),(11,'tablas','regiones'),(12,'tablas','rubros'),(17,'tablas','subcategorias'),(13,'tablas','tipoprevision'),(27,'usuarios','usuariosespecialistas'),(28,'usuarios','usuariosevaluacion'),(26,'usuarios','usuariospersonas');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

