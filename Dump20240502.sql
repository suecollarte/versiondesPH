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
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add forma pago otros',7,'add_formapagootros'),(26,'Can change forma pago otros',7,'change_formapagootros'),(27,'Can delete forma pago otros',7,'delete_formapagootros'),(28,'Can view forma pago otros',7,'view_formapagootros'),(29,'Can add forma pago salud',8,'add_formapagosalud'),(30,'Can change forma pago salud',8,'change_formapagosalud'),(31,'Can delete forma pago salud',8,'delete_formapagosalud'),(32,'Can view forma pago salud',8,'view_formapagosalud'),(33,'Can add modalidad atencion',9,'add_modalidadatencion'),(34,'Can change modalidad atencion',9,'change_modalidadatencion'),(35,'Can delete modalidad atencion',9,'delete_modalidadatencion'),(36,'Can view modalidad atencion',9,'view_modalidadatencion'),(37,'Can add promociones',10,'add_promociones'),(38,'Can change promociones',10,'change_promociones'),(39,'Can delete promociones',10,'delete_promociones'),(40,'Can view promociones',10,'view_promociones'),(41,'Can add regiones',11,'add_regiones'),(42,'Can change regiones',11,'change_regiones'),(43,'Can delete regiones',11,'delete_regiones'),(44,'Can view regiones',11,'view_regiones'),(45,'Can add rubros',12,'add_rubros'),(46,'Can change rubros',12,'change_rubros'),(47,'Can delete rubros',12,'delete_rubros'),(48,'Can view rubros',12,'view_rubros'),(49,'Can add tipo prevision',13,'add_tipoprevision'),(50,'Can change tipo prevision',13,'change_tipoprevision'),(51,'Can delete tipo prevision',13,'delete_tipoprevision'),(52,'Can view tipo prevision',13,'view_tipoprevision'),(53,'Can add comunas',14,'add_comunas'),(54,'Can change comunas',14,'change_comunas'),(55,'Can delete comunas',14,'delete_comunas'),(56,'Can view comunas',14,'view_comunas'),(57,'Can add ciudades',15,'add_ciudades'),(58,'Can change ciudades',15,'change_ciudades'),(59,'Can delete ciudades',15,'delete_ciudades'),(60,'Can view ciudades',15,'view_ciudades'),(61,'Can add categorias',16,'add_categorias'),(62,'Can change categorias',16,'change_categorias'),(63,'Can delete categorias',16,'delete_categorias'),(64,'Can view categorias',16,'view_categorias'),(65,'Can add sub categorias',17,'add_subcategorias'),(66,'Can change sub categorias',17,'change_subcategorias'),(67,'Can delete sub categorias',17,'delete_subcategorias'),(68,'Can view sub categorias',17,'view_subcategorias'),(69,'Can add forma pago gral',7,'add_formapagogral'),(70,'Can change forma pago gral',7,'change_formapagogral'),(71,'Can delete forma pago gral',7,'delete_formapagogral'),(72,'Can view forma pago gral',7,'view_formapagogral'),(73,'Can add especialistas consultas',18,'add_especialistasconsultas'),(74,'Can change especialistas consultas',18,'change_especialistasconsultas'),(75,'Can delete especialistas consultas',18,'delete_especialistasconsultas'),(76,'Can view especialistas consultas',18,'view_especialistasconsultas'),(77,'Can add especialista agendas',19,'add_especialistaagendas'),(78,'Can change especialista agendas',19,'change_especialistaagendas'),(79,'Can delete especialista agendas',19,'delete_especialistaagendas'),(80,'Can view especialista agendas',19,'view_especialistaagendas'),(81,'Can add especialista fichas',20,'add_especialistafichas'),(82,'Can change especialista fichas',20,'change_especialistafichas'),(83,'Can delete especialista fichas',20,'delete_especialistafichas'),(84,'Can view especialista fichas',20,'view_especialistafichas'),(85,'Can add especialistas planes suscripcion',21,'add_especialistasplanessuscripcion'),(86,'Can change especialistas planes suscripcion',21,'change_especialistasplanessuscripcion'),(87,'Can delete especialistas planes suscripcion',21,'delete_especialistasplanessuscripcion'),(88,'Can view especialistas planes suscripcion',21,'view_especialistasplanessuscripcion'),(89,'Can add especialistas contratos',22,'add_especialistascontratos'),(90,'Can change especialistas contratos',22,'change_especialistascontratos'),(91,'Can delete especialistas contratos',22,'delete_especialistascontratos'),(92,'Can view especialistas contratos',22,'view_especialistascontratos'),(93,'Can add especialistas pagos',23,'add_especialistaspagos'),(94,'Can change especialistas pagos',23,'change_especialistaspagos'),(95,'Can delete especialistas pagos',23,'delete_especialistaspagos'),(96,'Can view especialistas pagos',23,'view_especialistaspagos'),(97,'Can add especialistas rubro salud pagos',24,'add_especialistasrubrosaludpagos'),(98,'Can change especialistas rubro salud pagos',24,'change_especialistasrubrosaludpagos'),(99,'Can delete especialistas rubro salud pagos',24,'delete_especialistasrubrosaludpagos'),(100,'Can view especialistas rubro salud pagos',24,'view_especialistasrubrosaludpagos'),(101,'Can add especialistas horas agendadas',25,'add_especialistashorasagendadas'),(102,'Can change especialistas horas agendadas',25,'change_especialistashorasagendadas'),(103,'Can delete especialistas horas agendadas',25,'delete_especialistashorasagendadas'),(104,'Can view especialistas horas agendadas',25,'view_especialistashorasagendadas'),(105,'Can add usuarios personas',26,'add_usuariospersonas'),(106,'Can change usuarios personas',26,'change_usuariospersonas'),(107,'Can delete usuarios personas',26,'delete_usuariospersonas'),(108,'Can view usuarios personas',26,'view_usuariospersonas'),(109,'Can add usuarios especialistas',27,'add_usuariosespecialistas'),(110,'Can change usuarios especialistas',27,'change_usuariosespecialistas'),(111,'Can delete usuarios especialistas',27,'delete_usuariosespecialistas'),(112,'Can view usuarios especialistas',27,'view_usuariosespecialistas'),(113,'Can add usuarios evaluacion',28,'add_usuariosevaluacion'),(114,'Can change usuarios evaluacion',28,'change_usuariosevaluacion'),(115,'Can delete usuarios evaluacion',28,'delete_usuariosevaluacion'),(116,'Can view usuarios evaluacion',28,'view_usuariosevaluacion');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(19,'especialistas','especialistaagendas'),(20,'especialistas','especialistafichas'),(18,'especialistas','especialistasconsultas'),(22,'especialistas','especialistascontratos'),(25,'especialistas','especialistashorasagendadas'),(23,'especialistas','especialistaspagos'),(21,'especialistas','especialistasplanessuscripcion'),(24,'especialistas','especialistasrubrosaludpagos'),(6,'sessions','session'),(16,'tablas','categorias'),(15,'tablas','ciudades'),(14,'tablas','comunas'),(7,'tablas','formapagogral'),(8,'tablas','formapagosalud'),(9,'tablas','modalidadatencion'),(10,'tablas','promociones'),(11,'tablas','regiones'),(12,'tablas','rubros'),(17,'tablas','subcategorias'),(13,'tablas','tipoprevision'),(27,'usuarios','usuariosespecialistas'),(28,'usuarios','usuariosevaluacion'),(26,'usuarios','usuariospersonas');
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-03-22 00:46:59.005253'),(2,'auth','0001_initial','2024-03-22 00:46:59.649960'),(3,'admin','0001_initial','2024-03-22 00:46:59.776923'),(4,'admin','0002_logentry_remove_auto_add','2024-03-22 00:46:59.784381'),(5,'admin','0003_logentry_add_action_flag_choices','2024-03-22 00:46:59.794908'),(6,'contenttypes','0002_remove_content_type_name','2024-03-22 00:46:59.911264'),(7,'auth','0002_alter_permission_name_max_length','2024-03-22 00:46:59.970044'),(8,'auth','0003_alter_user_email_max_length','2024-03-22 00:47:00.016736'),(9,'auth','0004_alter_user_username_opts','2024-03-22 00:47:00.037269'),(10,'auth','0005_alter_user_last_login_null','2024-03-22 00:47:00.098334'),(11,'auth','0006_require_contenttypes_0002','2024-03-22 00:47:00.101300'),(12,'auth','0007_alter_validators_add_error_messages','2024-03-22 00:47:00.110852'),(13,'auth','0008_alter_user_username_max_length','2024-03-22 00:47:00.151714'),(14,'auth','0009_alter_user_last_name_max_length','2024-03-22 00:47:00.190926'),(15,'auth','0010_alter_group_name_max_length','2024-03-22 00:47:00.231725'),(16,'auth','0011_update_proxy_permissions','2024-03-22 00:47:00.246407'),(17,'auth','0012_alter_user_first_name_max_length','2024-03-22 00:47:00.284535'),(18,'sessions','0001_initial','2024-03-22 00:47:00.353403'),(19,'tablas','0001_initial','2024-03-22 00:47:00.823939'),(20,'tablas','0002_rename_formapagootros_formapagogral','2024-03-27 20:21:59.300152'),(21,'usuarios','0001_initial','2024-03-28 00:28:38.557679'),(22,'especialistas','0001_initial','2024-03-28 00:28:39.065415'),(23,'especialistas','0002_initial','2024-03-28 00:28:43.102015'),(24,'tablas','0003_alter_rubros_areasalud','2024-04-02 16:32:48.182728'),(25,'especialistas','0003_alter_especialistaagendas_estado_and_more','2024-04-02 16:42:35.443694'),(26,'tablas','0004_alter_rubros_areasalud','2024-04-02 16:42:35.668514'),(27,'tablas','0005_alter_rubros_areasalud','2024-04-02 18:24:59.524702'),(28,'especialistas','0004_alter_especialistaagendas_estado_and_more','2024-04-02 18:30:53.904096'),(29,'tablas','0006_alter_categorias_options_alter_ciudades_options_and_more','2024-04-03 16:23:38.595967'),(30,'usuarios','0002_alter_usuariosespecialistas_estado_suscripcion_and_more','2024-04-04 21:43:43.684087'),(31,'usuarios','0003_usuariospersonas_perfil','2024-04-10 01:27:29.826447'),(32,'usuarios','0004_remove_usuariospersonas_dv','2024-04-12 01:02:50.152863'),(33,'usuarios','0005_alter_usuariosespecialistas_categoria_and_more','2024-04-22 23:41:08.774312'),(34,'usuarios','0006_alter_usuariosespecialistas_ctr_altadctos_and_more','2024-04-24 00:32:04.669623'),(35,'usuarios','0007_alter_usuariosespecialistas_options_and_more','2024-04-25 00:28:23.600003'),(36,'usuarios','0008_alter_usuariosespecialistas_promedio_evaluacion','2024-04-26 22:48:42.797922');
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

--
-- Table structure for table `especialistas_agendas`
--

DROP TABLE IF EXISTS `especialistas_agendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialistas_agendas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora_inicio` varchar(5) NOT NULL,
  `hora_termino` varchar(5) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `especialista_id` bigint(20) NOT NULL,
  `esp_consultas_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `especialistas_agenda_especialista_id_f36bc171_fk_usuarios_` (`especialista_id`),
  KEY `especialistas_agenda_esp_consultas_id_5bba4d90_fk_especiali` (`esp_consultas_id`),
  CONSTRAINT `especialistas_agenda_esp_consultas_id_5bba4d90_fk_especiali` FOREIGN KEY (`esp_consultas_id`) REFERENCES `especialistas_consultas` (`id`),
  CONSTRAINT `especialistas_agenda_especialista_id_f36bc171_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialistas_agendas`
--

LOCK TABLES `especialistas_agendas` WRITE;
/*!40000 ALTER TABLE `especialistas_agendas` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialistas_agendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialistas_consultas`
--

DROP TABLE IF EXISTS `especialistas_consultas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialistas_consultas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fdesde` date NOT NULL,
  `fhasta` date NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `ciudad_id` bigint(20) DEFAULT NULL,
  `especialista_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `especialistas_consultas_ciudad_id_dc9b94a7_fk_tablas_ciudades_id` (`ciudad_id`),
  KEY `especialistas_consul_especialista_id_467b7680_fk_usuarios_` (`especialista_id`),
  CONSTRAINT `especialistas_consul_especialista_id_467b7680_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`),
  CONSTRAINT `especialistas_consultas_ciudad_id_dc9b94a7_fk_tablas_ciudades_id` FOREIGN KEY (`ciudad_id`) REFERENCES `tablas_ciudades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialistas_consultas`
--

LOCK TABLES `especialistas_consultas` WRITE;
/*!40000 ALTER TABLE `especialistas_consultas` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialistas_consultas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialistas_contratos`
--

DROP TABLE IF EXISTS `especialistas_contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialistas_contratos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rut_replegal` varchar(20) NOT NULL,
  `nombre_replegal` varchar(120) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `fono` varchar(20) NOT NULL,
  `ctr_pagos` varchar(1) NOT NULL,
  `finicio` date NOT NULL,
  `ftermino` date NOT NULL,
  `monto_contrato` decimal(10,2) NOT NULL,
  `ciudad_id` bigint(20) DEFAULT NULL,
  `comuna_id` bigint(20) DEFAULT NULL,
  `especialista_id` bigint(20) NOT NULL,
  `promocion_id` bigint(20) NOT NULL,
  `region_id` bigint(20) DEFAULT NULL,
  `plansuscripcion_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `especialistas_contratos_ciudad_id_fdb9f51c_fk_tablas_ciudades_id` (`ciudad_id`),
  KEY `especialistas_contratos_comuna_id_cedb1697_fk_tablas_comunas_id` (`comuna_id`),
  KEY `especialistas_contra_especialista_id_1ccd1cc8_fk_usuarios_` (`especialista_id`),
  KEY `especialistas_contra_promocion_id_67f37301_fk_tablas_pr` (`promocion_id`),
  KEY `especialistas_contratos_region_id_501a7ec5_fk_tablas_regiones_id` (`region_id`),
  KEY `especialistas_contra_plansuscripcion_id_4546ef6b_fk_especiali` (`plansuscripcion_id`),
  CONSTRAINT `especialistas_contra_especialista_id_1ccd1cc8_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`),
  CONSTRAINT `especialistas_contra_plansuscripcion_id_4546ef6b_fk_especiali` FOREIGN KEY (`plansuscripcion_id`) REFERENCES `especialistas_planessucripcion` (`id`),
  CONSTRAINT `especialistas_contra_promocion_id_67f37301_fk_tablas_pr` FOREIGN KEY (`promocion_id`) REFERENCES `tablas_promociones` (`id`),
  CONSTRAINT `especialistas_contratos_ciudad_id_fdb9f51c_fk_tablas_ciudades_id` FOREIGN KEY (`ciudad_id`) REFERENCES `tablas_ciudades` (`id`),
  CONSTRAINT `especialistas_contratos_comuna_id_cedb1697_fk_tablas_comunas_id` FOREIGN KEY (`comuna_id`) REFERENCES `tablas_comunas` (`id`),
  CONSTRAINT `especialistas_contratos_region_id_501a7ec5_fk_tablas_regiones_id` FOREIGN KEY (`region_id`) REFERENCES `tablas_regiones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialistas_contratos`
--

LOCK TABLES `especialistas_contratos` WRITE;
/*!40000 ALTER TABLE `especialistas_contratos` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialistas_contratos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialistas_fichas`
--

DROP TABLE IF EXISTS `especialistas_fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialistas_fichas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `archivo_dcto` varchar(45) NOT NULL,
  `observaciones` varchar(250) NOT NULL,
  `especialista_id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `especialistas_fichas_especialista_id_e2277d50_fk_usuarios_` (`especialista_id`),
  KEY `especialistas_fichas_usuario_id_65e5c177_fk_usuarios_personas_id` (`usuario_id`),
  CONSTRAINT `especialistas_fichas_especialista_id_e2277d50_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`),
  CONSTRAINT `especialistas_fichas_usuario_id_65e5c177_fk_usuarios_personas_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_personas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialistas_fichas`
--

LOCK TABLES `especialistas_fichas` WRITE;
/*!40000 ALTER TABLE `especialistas_fichas` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialistas_fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialistas_horasagendadas`
--

DROP TABLE IF EXISTS `especialistas_horasagendadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialistas_horasagendadas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` varchar(5) NOT NULL,
  `mensaje` varchar(120) NOT NULL,
  `relacionado` bigint(20) NOT NULL,
  `esp_agenda_id` bigint(20) NOT NULL,
  `especialista_id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `especialistas_horasa_esp_agenda_id_a685cebe_fk_especiali` (`esp_agenda_id`),
  KEY `especialistas_horasa_especialista_id_2c7cc795_fk_usuarios_` (`especialista_id`),
  KEY `especialistas_horasa_usuario_id_ce537da9_fk_usuarios_` (`usuario_id`),
  CONSTRAINT `especialistas_horasa_esp_agenda_id_a685cebe_fk_especiali` FOREIGN KEY (`esp_agenda_id`) REFERENCES `especialistas_agendas` (`id`),
  CONSTRAINT `especialistas_horasa_especialista_id_2c7cc795_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`),
  CONSTRAINT `especialistas_horasa_usuario_id_ce537da9_fk_usuarios_` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_personas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialistas_horasagendadas`
--

LOCK TABLES `especialistas_horasagendadas` WRITE;
/*!40000 ALTER TABLE `especialistas_horasagendadas` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialistas_horasagendadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialistas_pagos`
--

DROP TABLE IF EXISTS `especialistas_pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialistas_pagos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fdesde` date NOT NULL,
  `fhasta` date NOT NULL,
  `estado` varchar(1) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `numero_pago` varchar(120) NOT NULL,
  `fpago` date NOT NULL,
  `contrato_id` bigint(20) DEFAULT NULL,
  `especialista_id` bigint(20) NOT NULL,
  `formapago_id` bigint(20) DEFAULT NULL,
  `plansuscripcion_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `especialistas_pagos_contrato_id_912542b6_fk_especiali` (`contrato_id`),
  KEY `especialistas_pagos_especialista_id_52faf029_fk_usuarios_` (`especialista_id`),
  KEY `especialistas_pagos_formapago_id_4abe08fc_fk_tablas_fo` (`formapago_id`),
  KEY `especialistas_pagos_plansuscripcion_id_2cc4ec41_fk_especiali` (`plansuscripcion_id`),
  CONSTRAINT `especialistas_pagos_contrato_id_912542b6_fk_especiali` FOREIGN KEY (`contrato_id`) REFERENCES `especialistas_contratos` (`id`),
  CONSTRAINT `especialistas_pagos_especialista_id_52faf029_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`),
  CONSTRAINT `especialistas_pagos_formapago_id_4abe08fc_fk_tablas_fo` FOREIGN KEY (`formapago_id`) REFERENCES `tablas_formapagogral` (`id`),
  CONSTRAINT `especialistas_pagos_plansuscripcion_id_2cc4ec41_fk_especiali` FOREIGN KEY (`plansuscripcion_id`) REFERENCES `especialistas_planessucripcion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialistas_pagos`
--

LOCK TABLES `especialistas_pagos` WRITE;
/*!40000 ALTER TABLE `especialistas_pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialistas_pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialistas_planessucripcion`
--

DROP TABLE IF EXISTS `especialistas_planessucripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialistas_planessucripcion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fdesde` date NOT NULL,
  `fhasta` date NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `periodicidad` int(10) unsigned NOT NULL CHECK (`periodicidad` >= 0),
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialistas_planessucripcion`
--

LOCK TABLES `especialistas_planessucripcion` WRITE;
/*!40000 ALTER TABLE `especialistas_planessucripcion` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialistas_planessucripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialistas_rsaludpagos`
--

DROP TABLE IF EXISTS `especialistas_rsaludpagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialistas_rsaludpagos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `valor_atencion` decimal(10,2) NOT NULL,
  `descripcion` varchar(120) NOT NULL,
  `especialista_id` bigint(20) NOT NULL,
  `formapagosalud_id` bigint(20) DEFAULT NULL,
  `modatencion_id` bigint(20) DEFAULT NULL,
  `prevision_id` bigint(20) DEFAULT NULL,
  `rubro_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `especialistas_rsalud_especialista_id_af36a8ba_fk_usuarios_` (`especialista_id`),
  KEY `especialistas_rsalud_formapagosalud_id_a3cf50f6_fk_tablas_fo` (`formapagosalud_id`),
  KEY `especialistas_rsalud_modatencion_id_26fc5497_fk_tablas_mo` (`modatencion_id`),
  KEY `especialistas_rsalud_prevision_id_80df020c_fk_tablas_ti` (`prevision_id`),
  KEY `especialistas_rsaludpagos_rubro_id_5794f5a8_fk_tablas_rubros_id` (`rubro_id`),
  CONSTRAINT `especialistas_rsalud_especialista_id_af36a8ba_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`),
  CONSTRAINT `especialistas_rsalud_formapagosalud_id_a3cf50f6_fk_tablas_fo` FOREIGN KEY (`formapagosalud_id`) REFERENCES `tablas_formapagosalud` (`id`),
  CONSTRAINT `especialistas_rsalud_modatencion_id_26fc5497_fk_tablas_mo` FOREIGN KEY (`modatencion_id`) REFERENCES `tablas_modalidadatencion` (`id`),
  CONSTRAINT `especialistas_rsalud_prevision_id_80df020c_fk_tablas_ti` FOREIGN KEY (`prevision_id`) REFERENCES `tablas_tipoprevision` (`id`),
  CONSTRAINT `especialistas_rsaludpagos_rubro_id_5794f5a8_fk_tablas_rubros_id` FOREIGN KEY (`rubro_id`) REFERENCES `tablas_rubros` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialistas_rsaludpagos`
--

LOCK TABLES `especialistas_rsaludpagos` WRITE;
/*!40000 ALTER TABLE `especialistas_rsaludpagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialistas_rsaludpagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_categorias`
--

DROP TABLE IF EXISTS `tablas_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_categorias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `rubro_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tablas_categorias_rubro_id_4e0f0ccf_fk_tablas_rubros_id` (`rubro_id`),
  CONSTRAINT `tablas_categorias_rubro_id_4e0f0ccf_fk_tablas_rubros_id` FOREIGN KEY (`rubro_id`) REFERENCES `tablas_rubros` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_categorias`
--

LOCK TABLES `tablas_categorias` WRITE;
/*!40000 ALTER TABLE `tablas_categorias` DISABLE KEYS */;
INSERT INTO `tablas_categorias` VALUES (1,'Médico Cirujano',1),(2,'Enfermera',2),(3,'Arquitecto',3),(4,'Ingeniero Aeronautico',4),(5,'Ingeniero Hidraulico',4),(6,'Paisajista',3),(7,'Médico Internista',1),(8,'Ingeniero Informatico',4);
/*!40000 ALTER TABLE `tablas_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_ciudades`
--

DROP TABLE IF EXISTS `tablas_ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_ciudades` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `region_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tablas_ciudades_region_id_923e6284_fk_tablas_regiones_id` (`region_id`),
  CONSTRAINT `tablas_ciudades_region_id_923e6284_fk_tablas_regiones_id` FOREIGN KEY (`region_id`) REFERENCES `tablas_regiones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=348 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_ciudades`
--

LOCK TABLES `tablas_ciudades` WRITE;
/*!40000 ALTER TABLE `tablas_ciudades` DISABLE KEYS */;
INSERT INTO `tablas_ciudades` VALUES (2,'Algarrobo',5),(4,'Ancud',10),(6,'Angol',9),(7,'Antofagasta',2),(8,'Arauco',9),(9,'Arica',15),(12,'Barquito',13),(15,'Buin',13),(16,'Bulnes',8),(19,'Cabrero',8),(22,'Calama',2),(23,'Calbuco',10),(24,'Caldera',3),(29,'Canete',8),(35,'Casablanca',5),(36,'Castro',10),(39,'Cauquenes',7),(41,'Chaiten',10),(46,'Chillan',8),(47,'Chimbarongo',6),(48,'Chonchi',10),(59,'Con Con',5),(60,'Concepcion',8),(62,'Copiapo',3),(63,'Coquimbo',4),(65,'Coronel',8),(66,'Corral',14),(68,'Coyhaique',11),(71,'Curanilahue',9),(73,'Curico',7),(75,'Dalcahue',10),(78,'Donihue',6),(84,'El Monte',13),(90,'Entre Lagos',10),(96,'Frutillar',10),(100,'Graneros',6),(106,'Hualqui',8),(111,'Iquique',1),(116,'La Ligua',5),(117,'La Serena',4),(119,'La Union',10),(121,'Lago Ranco',14),(128,'Las Cruces',5),(136,'Limache',5),(137,'Linares',7),(138,'Lirquen',8),(139,'Llanquihue',10),(140,'Llay Llay',5),(151,'Los Andes',5),(152,'Los Angeles',8),(157,'Los Vilos',5),(158,'Lota',8),(168,'Mejillones',2),(169,'Melipilla',13),(172,'Molina',7),(179,'Nancagua',6),(186,'Nuble',8),(189,'Olmue',5),(190,'Osorno',10),(191,'Ovalle',4),(193,'Paillaco',14),(196,'Panguipulli',14),(197,'Panquehue',5),(203,'Penco',8),(209,'Pichidegua',6),(219,'Porvenir',12),(224,'Puerto Aysen',11),(225,'Puerto Chacabuco',11),(226,'Puerto Cisnes',11),(228,'Puerto Montt',10),(229,'Puerto Natales',12),(230,'Puerto Octay',10),(231,'Puerto Varas',10),(234,'Punta Arenas',12),(236,'Purranque',10),(239,'Quellon',10),(241,'Quilicura',13),(242,'Quillon',8),(243,'Quillota',5),(244,'Quilpue',5),(245,'Quinta De Tilcoco',6),(246,'Quintero',5),(249,'Rancagua',6),(253,'Renaca',5),(255,'Rengo',6),(259,'Rinconada',5),(261,'Romeral',7),(266,'San Antonio',5),(267,'San Bernardo',13),(269,'San Clemente',7),(271,'San Felipe',5),(272,'San Fernando',6),(274,'San Francisco De Mostazal',6),(276,'San Javier',7),(285,'San Vicente',8),(286,'Santa Ana',13),(292,'Santa Maria',5),(293,'Temuco',9),(294,'Santo Domingo',5),(296,'Talagante',13),(297,'Talca',7),(298,'Talcahuano',8),(304,'Tocopilla',2),(309,'Valdivia',14),(311,'Vallenar',3),(312,'Valparaiso',5),(313,'Vichuquen',7),(314,'Victoria',9),(318,'Villa Alemana',5),(319,'Villarrica',9),(320,'Vina Del Mar',5),(325,'Santiago',13),(327,'Camarones',15),(330,'Camina',15),(331,'Chillan',16),(332,'San Carlos',16),(333,'Yungay',16),(334,'Quirihue',16),(335,'Coihueco',16),(336,'Bulnes',16),(337,'Cobquecura',16),(338,'Pemuco',16),(339,'Pinto',16),(340,'San Fabian',16),(341,'Niquen',16),(342,'San Gregorio',16),(343,'Buli',16),(344,'Chillan Viejo',16),(345,'Quillon',16),(346,'Portezuelo',16),(347,'El Quisco',5);
/*!40000 ALTER TABLE `tablas_ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_comunas`
--

DROP TABLE IF EXISTS `tablas_comunas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_comunas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `region_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tablas_comunas_region_id_59ba8ad3_fk_tablas_regiones_id` (`region_id`),
  CONSTRAINT `tablas_comunas_region_id_59ba8ad3_fk_tablas_regiones_id` FOREIGN KEY (`region_id`) REFERENCES `tablas_regiones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_comunas`
--

LOCK TABLES `tablas_comunas` WRITE;
/*!40000 ALTER TABLE `tablas_comunas` DISABLE KEYS */;
INSERT INTO `tablas_comunas` VALUES (1101,'Iquique',1),(1107,'Alto Hospicio',1),(1401,'Pozo Almonte',1),(1402,'Camina',1),(1403,'Colchane',1),(1404,'Huara',1),(1405,'Pica',1),(2101,'Antofagasta',2),(2102,'Mejillones',2),(2103,'Sierra Gorda',2),(2104,'Taltal',2),(2201,'Calama',2),(2202,'Ollague',2),(2203,'San Pedro De Atacama',2),(2301,'Tocopilla',2),(2302,'Maria Elena',2),(3101,'Copiapo',3),(3102,'Caldera',3),(3103,'Tierra Amarilla',3),(3201,'Chanaral',3),(3202,'Diego De Almagro',3),(3301,'Vallenar',3),(3302,'Alto Del Carmen',3),(3303,'Freirina',3),(3304,'Huasco',3),(4101,'La Serena',4),(4102,'Coquimbo',4),(4103,'Andacollo',4),(4104,'La Higuera',4),(4105,'Paihuano',4),(4106,'Vicuna',4),(4201,'Illapel',4),(4202,'Canela',4),(4203,'Los Vilos',4),(4204,'Salamanca',4),(4301,'Ovalle',4),(4302,'Combarbala',4),(4303,'Monte Patria',4),(4304,'Punitaqui',4),(4305,'Rio Hurtado',4),(5101,'Valparaiso',5),(5102,'Casablanca',5),(5103,'Con Con',5),(5104,'Juan Fernandez',5),(5105,'Puchuncavi',5),(5106,'Quilpue',5),(5107,'Quintero',5),(5108,'Villa Alemana',5),(5109,'Vina Del Mar',5),(5201,'Isla De Pascua',5),(5301,'Los Andes',5),(5302,'Calle Larga',5),(5303,'Rinconada',5),(5304,'San Esteban',5),(5401,'La Ligua',5),(5402,'Cabildo',5),(5403,'Papudo',5),(5404,'Petorca',5),(5405,'Zapallar',5),(5501,'Quillota',5),(5502,'Calera',5),(5503,'Hijuelas',5),(5504,'La Cruz',5),(5505,'Limache',5),(5506,'Nogales',5),(5507,'Olmue',5),(5601,'San Antonio',5),(5602,'Algarrobo',5),(5603,'Cartagena',5),(5604,'El Quisco',5),(5605,'El Tabo',5),(5606,'Santo Domingo',5),(5701,'San Felipe',5),(5702,'Catemu',5),(5703,'Llay Llay',5),(5704,'Panquehue',5),(5705,'Putaendo',5),(5706,'Santa Maria',5),(6101,'Rancagua',6),(6102,'Codegua',6),(6103,'Coinco',6),(6104,'Coltauco',6),(6105,'Donihue',6),(6106,'Graneros',6),(6107,'Las Cabras',6),(6108,'Machali',6),(6109,'Malloa',6),(6110,'Mostazal',6),(6111,'Olivar',6),(6112,'Peumo',6),(6113,'Pichidegua',6),(6114,'Quinta De Tilcoco',6),(6115,'Rengo',6),(6116,'Requinoa',6),(6117,'San Vicente',6),(6201,'Pichilemu',6),(6202,'La Estrella',6),(6203,'Litueche',6),(6204,'Marchigue',6),(6205,'Navidad',6),(6206,'Paredones',6),(6301,'San Fernando',6),(6302,'Chepica',6),(6303,'Chimbarongo',6),(6304,'Lolol',6),(6305,'Nancagua',6),(6306,'Palmilla',6),(6307,'Peralillo',6),(6308,'Placilla',6),(6309,'Pumanque',6),(6310,'Santa Cruz',6),(7101,'Talca',7),(7102,'Constitucion',7),(7103,'Curepto',7),(7104,'Empedrado',7),(7105,'Maule',7),(7106,'Pelarco',7),(7107,'Pencahue',7),(7108,'Rio Claro',7),(7109,'San Clemente',7),(7110,'San Rafael',7),(7201,'Cauquenes',7),(7202,'Chanco',7),(7203,'Pelluhue',7),(7301,'Curico',7),(7302,'Hualane',7),(7303,'Licanten',7),(7304,'Molina',7),(7305,'Rauco',7),(7306,'Romeral',7),(7307,'Sagrada Familia',7),(7308,'Teno',7),(7309,'Vichuquen',7),(7401,'Linares',7),(7402,'Colbun',7),(7403,'Longavi',7),(7404,'Parral',7),(7405,'Retiro',7),(7406,'San Javier',7),(7407,'Villa Alegre',7),(7408,'Yerbas Buenas',7),(8101,'Concepcion',8),(8102,'Coronel',8),(8103,'Chiguayante',8),(8104,'Florida',8),(8105,'Hualqui',8),(8106,'Lota',8),(8107,'Penco',8),(8108,'San Pedro De La Paz',8),(8109,'Santa Juana',8),(8110,'Talcahuano',8),(8111,'Tome',8),(8112,'Hualpen',8),(8201,'Lebu',8),(8202,'Arauco',8),(8203,'Canete',8),(8204,'Contulmo',8),(8205,'Curanilahue',8),(8206,'Los Alamos',8),(8207,'Tirua',8),(8301,'Los Angeles',8),(8302,'Antuco',8),(8303,'Cabrero',8),(8304,'Laja',8),(8305,'MulchÉn',8),(8306,'Nacimiento',8),(8307,'Negrete',8),(8308,'Quilaco',8),(8309,'Quilleco',8),(8310,'San Rosendo',8),(8311,'Santa Barbara',8),(8312,'Tucapel',8),(8313,'Yumbel',8),(8314,'Alto Bio Bio',8),(8401,'ChillÁn',8),(8402,'Bulnes',8),(8403,'Cobquecura',8),(8404,'Coelemu',8),(8405,'Coihueco',8),(8406,'Chillan Viejo',8),(8407,'El Carmen',8),(8408,'Ninhue',8),(8409,'IquÉn',8),(8410,'Pemuco',8),(8411,'Pinto',8),(8412,'Portezuelo',8),(8413,'Quillon',8),(8414,'Quirihue',8),(8415,'Ranquil',8),(8416,'San Carlos',8),(8417,'San Fabian',8),(8418,'San Ignacio',8),(8419,'San Nicolas',8),(8420,'Treguaco',8),(8421,'Yungay',8),(9101,'Temuco',9),(9102,'Carahue',9),(9103,'Cunco',9),(9104,'Curarrehue',9),(9105,'Freire',9),(9106,'Galvarino',9),(9107,'Gorbea',9),(9108,'Lautaro',9),(9109,'Loncoche',9),(9110,'Melipeuco',9),(9111,'Nueva Imperial',9),(9112,'Padre Las Casas',9),(9113,'Perquenco',9),(9114,'Pitrufquen',9),(9115,'Pucon',9),(9116,'Saavedra',9),(9117,'Teodoro Schmidt',9),(9118,'Tolten',9),(9119,'Vilcun',9),(9120,'Villarrica',9),(9121,'Cholchol',9),(9201,'Angol',9),(9202,'Collipulli',9),(9203,'Curacautin',9),(9204,'Ercilla',9),(9205,'Lonquimay',9),(9206,'Los Sauces',9),(9207,'Lumaco',9),(9208,'Puren',9),(9209,'Renaico',9),(9210,'Traiguen',9),(9211,'Victoria',9),(10101,'Puerto Montt',10),(10102,'Calbuco',10),(10103,'Cochamo',10),(10104,'Fresia',10),(10105,'Frutillar',10),(10106,'Los Muermos',10),(10107,'Llanquihue',10),(10108,'Maullin',10),(10109,'Puerto Varas',10),(10201,'Castro',10),(10202,'Ancud',10),(10203,'Chonchi',10),(10204,'Curaco De Velez',10),(10205,'Dalcahue',10),(10206,'Puqueldan',10),(10207,'Queilon',10),(10208,'Quellon',10),(10209,'Quemchi',10),(10210,'Quinchao',10),(10301,'Osorno',10),(10302,'Puerto Octay',10),(10303,'Purranque',10),(10304,'Puyehue',10),(10305,'Rio Negro',10),(10306,'San Juan De La Costa',10),(10307,'San Pablo',10),(10401,'Chaiten',10),(10402,'Futaleufu',10),(10403,'Hualaihue',10),(10404,'Palena',10),(11101,'Coihaique',11),(11102,'Lago Verde',11),(11201,'Aysen',11),(11202,'Cisnes',11),(11203,'Guaitecas',11),(11301,'Cochrane',11),(11302,'O Higgins',11),(11303,'Tortel',11),(11401,'Chile Chico',11),(11402,'Rio Ibanez',11),(12101,'Punta Arenas',12),(12102,'Laguna Blanca',12),(12103,'Rio Verde',12),(12104,'San Gregorio',12),(12201,'Cabo De Hornos',12),(12202,'Antartica',12),(12301,'Porvenir',12),(12302,'Primavera',12),(12303,'Timaukel',12),(12401,'Natales',12),(12402,'Torres Del Paine',12),(13101,'Santiago',13),(13102,'Cerrillos',13),(13103,'Cerro Navia',13),(13104,'Conchali',13),(13105,'El Bosque',13),(13106,'Estacion Central',13),(13107,'Huechuraba',13),(13108,'Independencia',13),(13109,'La Cisterna',13),(13110,'La Florida',13),(13111,'La Granja',13),(13112,'La Pintana',13),(13113,'La Reina',13),(13114,'Las Condes',13),(13115,'Lo Barnechea',13),(13116,'Lo Espejo',13),(13117,'Lo Prado',13),(13118,'Macul',13),(13119,'Maipu',13),(13120,'Nunoa',13),(13121,'Pedro Aguirre Cerda',13),(13122,'Penalolen',13),(13123,'Providencia',13),(13124,'Pudahuel',13),(13125,'Quilicura ',13),(13126,'Quinta Normal',13),(13127,'Recoleta',13),(13128,'Renca',13),(13129,'San Joaquin',13),(13130,'San Miguel',13),(13131,'San Ramon',13),(13132,'Vitacura',13),(13201,'Puente Alto',13),(13202,'Pirque',13),(13203,'San Jose De Maipo',13),(13301,'Colina',13),(13302,'Lampa',13),(13303,'Tiltil',13),(13401,'San Bernardo',13),(13402,'Buin',13),(13403,'Calera De Tango',13),(13404,'Paine',13),(13501,'Melipilla',13),(13502,'Alhue',13),(13503,'Curacavi',13),(13504,'Maria Pinto',13),(13505,'San Pedro',13),(13601,'Talagante',13),(13602,'El Monte',13),(13603,'Isla De Maipo',13),(13604,'Padre Hurtado',13),(13605,'Penaflor',13),(14101,'Valdivia',14),(14102,'Corral',14),(14103,'Lanco',14),(14104,'Los Lagos',14),(14105,'Mafil',14),(14106,'Mariquina',14),(14107,'Paillaco',14),(14108,'Panguipulli',14),(14201,'La Union',14),(14202,'Futrono',14),(14203,'Lago Ranco',14),(14204,'Rio Bueno',14),(15101,'Arica',15),(15102,'Camarones',15),(15201,'Putre',15),(15202,'General Lagos',15);
/*!40000 ALTER TABLE `tablas_comunas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_formapagogral`
--

DROP TABLE IF EXISTS `tablas_formapagogral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_formapagogral` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_formapagogral`
--

LOCK TABLES `tablas_formapagogral` WRITE;
/*!40000 ALTER TABLE `tablas_formapagogral` DISABLE KEYS */;
INSERT INTO `tablas_formapagogral` VALUES (1,'Transferencia Electrónica'),(2,'Transbank');
/*!40000 ALTER TABLE `tablas_formapagogral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_formapagosalud`
--

DROP TABLE IF EXISTS `tablas_formapagosalud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_formapagosalud` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_formapagosalud`
--

LOCK TABLES `tablas_formapagosalud` WRITE;
/*!40000 ALTER TABLE `tablas_formapagosalud` DISABLE KEYS */;
INSERT INTO `tablas_formapagosalud` VALUES (1,'Transferencia Electrónica'),(2,'Isapre'),(3,'Transbank'),(4,'Fonasa');
/*!40000 ALTER TABLE `tablas_formapagosalud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_modalidadatencion`
--

DROP TABLE IF EXISTS `tablas_modalidadatencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_modalidadatencion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_modalidadatencion`
--

LOCK TABLES `tablas_modalidadatencion` WRITE;
/*!40000 ALTER TABLE `tablas_modalidadatencion` DISABLE KEYS */;
INSERT INTO `tablas_modalidadatencion` VALUES (1,'Presencial'),(2,'Virtual'),(3,'Domicilio');
/*!40000 ALTER TABLE `tablas_modalidadatencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_promociones`
--

DROP TABLE IF EXISTS `tablas_promociones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_promociones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fdesde` date NOT NULL,
  `fhasta` date NOT NULL,
  `pclave` varchar(45) NOT NULL,
  `dcto_porcentaje` decimal(10,2) NOT NULL,
  `dcto_cantidad` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_promociones`
--

LOCK TABLES `tablas_promociones` WRITE;
/*!40000 ALTER TABLE `tablas_promociones` DISABLE KEYS */;
INSERT INTO `tablas_promociones` VALUES (1,'Promocion Invierno','2024-04-03','2024-05-31','clave1',10.00,2000.00);
/*!40000 ALTER TABLE `tablas_promociones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_regiones`
--

DROP TABLE IF EXISTS `tablas_regiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_regiones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `numero` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_regiones`
--

LOCK TABLES `tablas_regiones` WRITE;
/*!40000 ALTER TABLE `tablas_regiones` DISABLE KEYS */;
INSERT INTO `tablas_regiones` VALUES (1,'Tarapaca','I'),(2,'Antofagasta','II'),(3,'Atacama','III'),(4,'Coquimbo','IV'),(5,'Valparaíso','V'),(6,'OHiggins','VI'),(7,'Maule','VII'),(8,'Bio-Bio','VIII'),(9,'Araucania','IX'),(10,'Los Lagos','X'),(11,'Aysen','XI'),(12,'Magallanes','XII'),(13,'Metropolitana','XIII'),(14,'Los Rios','XIV'),(15,'Arica','XV'),(16,'Nuble','XVI');
/*!40000 ALTER TABLE `tablas_regiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_rubros`
--

DROP TABLE IF EXISTS `tablas_rubros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_rubros` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `areasalud` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_rubros`
--

LOCK TABLES `tablas_rubros` WRITE;
/*!40000 ALTER TABLE `tablas_rubros` DISABLE KEYS */;
INSERT INTO `tablas_rubros` VALUES (1,'Medicina','1'),(2,'Enfermería','1'),(3,'Arquitectura','0'),(4,'Ingeniería','0');
/*!40000 ALTER TABLE `tablas_rubros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_subcategorias`
--

DROP TABLE IF EXISTS `tablas_subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_subcategorias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `categoria_id` bigint(20) NOT NULL,
  `rubro_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tablas_subcategorias_categoria_id_93bcc9bf_fk_tablas_ca` (`categoria_id`),
  KEY `tablas_subcategorias_rubro_id_a174d7a8_fk_tablas_rubros_id` (`rubro_id`),
  CONSTRAINT `tablas_subcategorias_categoria_id_93bcc9bf_fk_tablas_ca` FOREIGN KEY (`categoria_id`) REFERENCES `tablas_categorias` (`id`),
  CONSTRAINT `tablas_subcategorias_rubro_id_a174d7a8_fk_tablas_rubros_id` FOREIGN KEY (`rubro_id`) REFERENCES `tablas_rubros` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_subcategorias`
--

LOCK TABLES `tablas_subcategorias` WRITE;
/*!40000 ALTER TABLE `tablas_subcategorias` DISABLE KEYS */;
INSERT INTO `tablas_subcategorias` VALUES (1,'Cirujano General',1,1),(2,'Cirujano Infantil',1,1),(3,'Enfermera Uci',2,2),(4,'Enfermera Infantil',2,2),(5,'Enfermera Geriatrica',2,2),(6,'Medico Geriatra',1,1),(7,'Dibujante',6,3),(8,'Cardiólogo',7,1),(9,'Redes Y Comunicaciones',8,4);
/*!40000 ALTER TABLE `tablas_subcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas_tipoprevision`
--

DROP TABLE IF EXISTS `tablas_tipoprevision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablas_tipoprevision` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas_tipoprevision`
--

LOCK TABLES `tablas_tipoprevision` WRITE;
/*!40000 ALTER TABLE `tablas_tipoprevision` DISABLE KEYS */;
INSERT INTO `tablas_tipoprevision` VALUES (1,'Particular'),(2,'Isapre'),(3,'Fonasa'),(4,'Capredena');
/*!40000 ALTER TABLE `tablas_tipoprevision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_especialistas`
--

DROP TABLE IF EXISTS `usuarios_especialistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_especialistas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `foto` varchar(100) DEFAULT NULL,
  `descripcion` varchar(250) NOT NULL,
  `estado_suscripcion` varchar(1) NOT NULL,
  `promedio_evaluacion` decimal(4,2) DEFAULT NULL,
  `tiempo_consulta` smallint(5) unsigned NOT NULL CHECK (`tiempo_consulta` >= 0),
  `reg_especialista` varchar(120) NOT NULL,
  `ctr_altadctos` varchar(1) NOT NULL,
  `categoria_id` bigint(20) DEFAULT NULL,
  `rubro_id` bigint(20) DEFAULT NULL,
  `subcategoria_id` bigint(20) DEFAULT NULL,
  `persona_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`persona_id`),
  KEY `usuarios_especialist_categoria_id_3a299847_fk_tablas_ca` (`categoria_id`),
  KEY `usuarios_especialistas_rubro_id_17f4a9d5_fk_tablas_rubros_id` (`rubro_id`),
  KEY `usuarios_especialist_subcategoria_id_dc2edc5b_fk_tablas_su` (`subcategoria_id`),
  CONSTRAINT `usuarios_especialist_categoria_id_3a299847_fk_tablas_ca` FOREIGN KEY (`categoria_id`) REFERENCES `tablas_categorias` (`id`),
  CONSTRAINT `usuarios_especialist_persona_id_3ae23979_fk_usuarios_` FOREIGN KEY (`persona_id`) REFERENCES `usuarios_personas` (`id`),
  CONSTRAINT `usuarios_especialist_subcategoria_id_dc2edc5b_fk_tablas_su` FOREIGN KEY (`subcategoria_id`) REFERENCES `tablas_subcategorias` (`id`),
  CONSTRAINT `usuarios_especialistas_rubro_id_17f4a9d5_fk_tablas_rubros_id` FOREIGN KEY (`rubro_id`) REFERENCES `tablas_rubros` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_especialistas`
--

LOCK TABLES `usuarios_especialistas` WRITE;
/*!40000 ALTER TABLE `usuarios_especialistas` DISABLE KEYS */;
INSERT INTO `usuarios_especialistas` VALUES (3,'','Mi descripcion','1',1.00,24,'Mi registro especialista','0',8,4,9,2);
/*!40000 ALTER TABLE `usuarios_especialistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_evaluaciones`
--

DROP TABLE IF EXISTS `usuarios_evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_evaluaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `mensaje` varchar(120) NOT NULL,
  `evaluacion` smallint(5) unsigned NOT NULL CHECK (`evaluacion` >= 0),
  `especialista_id` bigint(20) DEFAULT NULL,
  `usuario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarios_evaluacione_especialista_id_97a23b5d_fk_usuarios_` (`especialista_id`),
  KEY `usuarios_evaluacione_usuario_id_74bce1c1_fk_usuarios_` (`usuario_id`),
  CONSTRAINT `usuarios_evaluacione_especialista_id_97a23b5d_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`),
  CONSTRAINT `usuarios_evaluacione_usuario_id_74bce1c1_fk_usuarios_` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_personas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_evaluaciones`
--

LOCK TABLES `usuarios_evaluaciones` WRITE;
/*!40000 ALTER TABLE `usuarios_evaluaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_evaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_personas`
--

DROP TABLE IF EXISTS `usuarios_personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_personas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rut` varchar(20) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `fnacimiento` date NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `ciudad_id` bigint(20) DEFAULT NULL,
  `comuna_id` bigint(20) DEFAULT NULL,
  `region_id` bigint(20) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `perfil` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  KEY `usuarios_personas_ciudad_id_d20b4a77_fk_tablas_ciudades_id` (`ciudad_id`),
  KEY `usuarios_personas_comuna_id_f9742445_fk_tablas_comunas_id` (`comuna_id`),
  KEY `usuarios_personas_region_id_cf74c9e6_fk_tablas_regiones_id` (`region_id`),
  CONSTRAINT `usuarios_personas_ciudad_id_d20b4a77_fk_tablas_ciudades_id` FOREIGN KEY (`ciudad_id`) REFERENCES `tablas_ciudades` (`id`),
  CONSTRAINT `usuarios_personas_comuna_id_f9742445_fk_tablas_comunas_id` FOREIGN KEY (`comuna_id`) REFERENCES `tablas_comunas` (`id`),
  CONSTRAINT `usuarios_personas_region_id_cf74c9e6_fk_tablas_regiones_id` FOREIGN KEY (`region_id`) REFERENCES `tablas_regiones` (`id`),
  CONSTRAINT `usuarios_personas_usuario_id_d98790c7_fk_auth_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_personas`
--

LOCK TABLES `usuarios_personas` WRITE;
/*!40000 ALTER TABLE `usuarios_personas` DISABLE KEYS */;
INSERT INTO `usuarios_personas` VALUES (1,'8.300.166-6','2','1962-04-17','999999',320,5109,5,7,'3'),(2,'7.451.087-6','2','1958-01-15','56 9 9 8280299',347,5604,5,8,'3');
/*!40000 ALTER TABLE `usuarios_personas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 13:29:25
