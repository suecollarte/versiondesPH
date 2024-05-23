CREATE DATABASE  IF NOT EXISTS `proximahoraDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `proximahoraDB`;

--
-- Dumping data for table `tablas_regiones`
--

LOCK TABLES `tablas_regiones` WRITE;
/*!40000 ALTER TABLE `tablas_regiones` DISABLE KEYS */;
INSERT INTO `tablas_regiones` VALUES (1,'Tarapaca','I'),(2,'Antofagasta','II'),(3,'Atacama','III'),(4,'Coquimbo','IV'),(5,'Valparaíso','V'),(6,'OHiggins','VI'),(7,'Maule','VII'),(8,'Bio-Bio','VIII'),(9,'Araucania','IX'),(10,'Los Lagos','X'),(11,'Aysen','XI'),(12,'Magallanes','XII'),(13,'Metropolitana','XIII'),(14,'Los Rios','XIV'),(15,'Arica','XV'),(16,'Nuble','XVI');
/*!40000 ALTER TABLE `tablas_regiones` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `tablas_ciudades`
--

LOCK TABLES `tablas_ciudades` WRITE;
/*!40000 ALTER TABLE `tablas_ciudades` DISABLE KEYS */;
INSERT INTO `tablas_ciudades` VALUES (2,'Algarrobo',5),(4,'Ancud',10),(6,'Angol',9),(7,'Antofagasta',2),(8,'Arauco',9),(9,'Arica',15),(12,'Barquito',13),(15,'Buin',13),(16,'Bulnes',8),(19,'Cabrero',8),(22,'Calama',2),(23,'Calbuco',10),(24,'Caldera',3),(29,'Canete',8),(35,'Casablanca',5),(36,'Castro',10),(39,'Cauquenes',7),(41,'Chaiten',10),(46,'Chillan',8),(47,'Chimbarongo',6),(48,'Chonchi',10),(59,'Con Con',5),(60,'Concepcion',8),(62,'Copiapo',3),(63,'Coquimbo',4),(65,'Coronel',8),(66,'Corral',14),(68,'Coyhaique',11),(71,'Curanilahue',9),(73,'Curico',7),(75,'Dalcahue',10),(78,'Donihue',6),(84,'El Monte',13),(90,'Entre Lagos',10),(96,'Frutillar',10),(100,'Graneros',6),(106,'Hualqui',8),(111,'Iquique',1),(116,'La Ligua',5),(117,'La Serena',4),(119,'La Union',10),(121,'Lago Ranco',14),(128,'Las Cruces',5),(136,'Limache',5),(137,'Linares',7),(138,'Lirquen',8),(139,'Llanquihue',10),(140,'Llay Llay',5),(151,'Los Andes',5),(152,'Los Angeles',8),(157,'Los Vilos',5),(158,'Lota',8),(168,'Mejillones',2),(169,'Melipilla',13),(172,'Molina',7),(179,'Nancagua',6),(186,'Nuble',8),(189,'Olmue',5),(190,'Osorno',10),(191,'Ovalle',4),(193,'Paillaco',14),(196,'Panguipulli',14),(197,'Panquehue',5),(203,'Penco',8),(209,'Pichidegua',6),(219,'Porvenir',12),(224,'Puerto Aysen',11),(225,'Puerto Chacabuco',11),(226,'Puerto Cisnes',11),(228,'Puerto Montt',10),(229,'Puerto Natales',12),(230,'Puerto Octay',10),(231,'Puerto Varas',10),(234,'Punta Arenas',12),(236,'Purranque',10),(239,'Quellon',10),(241,'Quilicura',13),(242,'Quillon',8),(243,'Quillota',5),(244,'Quilpue',5),(245,'Quinta De Tilcoco',6),(246,'Quintero',5),(249,'Rancagua',6),(253,'Renaca',5),(255,'Rengo',6),(259,'Rinconada',5),(261,'Romeral',7),(266,'San Antonio',5),(267,'San Bernardo',13),(269,'San Clemente',7),(271,'San Felipe',5),(272,'San Fernando',6),(274,'San Francisco De Mostazal',6),(276,'San Javier',7),(285,'San Vicente',8),(286,'Santa Ana',13),(292,'Santa Maria',5),(293,'Temuco',9),(294,'Santo Domingo',5),(296,'Talagante',13),(297,'Talca',7),(298,'Talcahuano',8),(304,'Tocopilla',2),(309,'Valdivia',14),(311,'Vallenar',3),(312,'Valparaiso',5),(313,'Vichuquen',7),(314,'Victoria',9),(318,'Villa Alemana',5),(319,'Villarrica',9),(320,'Vina Del Mar',5),(325,'Santiago',13),(327,'Camarones',15),(330,'Camina',15),(331,'Chillan',16),(332,'San Carlos',16),(333,'Yungay',16),(334,'Quirihue',16),(335,'Coihueco',16),(336,'Bulnes',16),(337,'Cobquecura',16),(338,'Pemuco',16),(339,'Pinto',16),(340,'San Fabian',16),(341,'Niquen',16),(342,'San Gregorio',16),(343,'Buli',16),(344,'Chillan Viejo',16),(345,'Quillon',16),(346,'Portezuelo',16),(347,'El Quisco',5);
/*!40000 ALTER TABLE `tablas_ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tablas_comunas`
--

LOCK TABLES `tablas_comunas` WRITE;
/*!40000 ALTER TABLE `tablas_comunas` DISABLE KEYS */;
INSERT INTO `tablas_comunas` VALUES (1101,'Iquique',1),(1107,'Alto Hospicio',1),(1401,'Pozo Almonte',1),(1402,'Camina',1),(1403,'Colchane',1),(1404,'Huara',1),(1405,'Pica',1),(2101,'Antofagasta',2),(2102,'Mejillones',2),(2103,'Sierra Gorda',2),(2104,'Taltal',2),(2201,'Calama',2),(2202,'Ollague',2),(2203,'San Pedro De Atacama',2),(2301,'Tocopilla',2),(2302,'Maria Elena',2),(3101,'Copiapo',3),(3102,'Caldera',3),(3103,'Tierra Amarilla',3),(3201,'Chanaral',3),(3202,'Diego De Almagro',3),(3301,'Vallenar',3),(3302,'Alto Del Carmen',3),(3303,'Freirina',3),(3304,'Huasco',3),(4101,'La Serena',4),(4102,'Coquimbo',4),(4103,'Andacollo',4),(4104,'La Higuera',4),(4105,'Paihuano',4),(4106,'Vicuna',4),(4201,'Illapel',4),(4202,'Canela',4),(4203,'Los Vilos',4),(4204,'Salamanca',4),(4301,'Ovalle',4),(4302,'Combarbala',4),(4303,'Monte Patria',4),(4304,'Punitaqui',4),(4305,'Rio Hurtado',4),(5101,'Valparaiso',5),(5102,'Casablanca',5),(5103,'Con Con',5),(5104,'Juan Fernandez',5),(5105,'Puchuncavi',5),(5106,'Quilpue',5),(5107,'Quintero',5),(5108,'Villa Alemana',5),(5109,'Vina Del Mar',5),(5201,'Isla De Pascua',5),(5301,'Los Andes',5),(5302,'Calle Larga',5),(5303,'Rinconada',5),(5304,'San Esteban',5),(5401,'La Ligua',5),(5402,'Cabildo',5),(5403,'Papudo',5),(5404,'Petorca',5),(5405,'Zapallar',5),(5501,'Quillota',5),(5502,'Calera',5),(5503,'Hijuelas',5),(5504,'La Cruz',5),(5505,'Limache',5),(5506,'Nogales',5),(5507,'Olmue',5),(5601,'San Antonio',5),(5602,'Algarrobo',5),(5603,'Cartagena',5),(5604,'El Quisco',5),(5605,'El Tabo',5),(5606,'Santo Domingo',5),(5701,'San Felipe',5),(5702,'Catemu',5),(5703,'Llay Llay',5),(5704,'Panquehue',5),(5705,'Putaendo',5),(5706,'Santa Maria',5),(6101,'Rancagua',6),(6102,'Codegua',6),(6103,'Coinco',6),(6104,'Coltauco',6),(6105,'Donihue',6),(6106,'Graneros',6),(6107,'Las Cabras',6),(6108,'Machali',6),(6109,'Malloa',6),(6110,'Mostazal',6),(6111,'Olivar',6),(6112,'Peumo',6),(6113,'Pichidegua',6),(6114,'Quinta De Tilcoco',6),(6115,'Rengo',6),(6116,'Requinoa',6),(6117,'San Vicente',6),(6201,'Pichilemu',6),(6202,'La Estrella',6),(6203,'Litueche',6),(6204,'Marchigue',6),(6205,'Navidad',6),(6206,'Paredones',6),(6301,'San Fernando',6),(6302,'Chepica',6),(6303,'Chimbarongo',6),(6304,'Lolol',6),(6305,'Nancagua',6),(6306,'Palmilla',6),(6307,'Peralillo',6),(6308,'Placilla',6),(6309,'Pumanque',6),(6310,'Santa Cruz',6),(7101,'Talca',7),(7102,'Constitucion',7),(7103,'Curepto',7),(7104,'Empedrado',7),(7105,'Maule',7),(7106,'Pelarco',7),(7107,'Pencahue',7),(7108,'Rio Claro',7),(7109,'San Clemente',7),(7110,'San Rafael',7),(7201,'Cauquenes',7),(7202,'Chanco',7),(7203,'Pelluhue',7),(7301,'Curico',7),(7302,'Hualane',7),(7303,'Licanten',7),(7304,'Molina',7),(7305,'Rauco',7),(7306,'Romeral',7),(7307,'Sagrada Familia',7),(7308,'Teno',7),(7309,'Vichuquen',7),(7401,'Linares',7),(7402,'Colbun',7),(7403,'Longavi',7),(7404,'Parral',7),(7405,'Retiro',7),(7406,'San Javier',7),(7407,'Villa Alegre',7),(7408,'Yerbas Buenas',7),(8101,'Concepcion',8),(8102,'Coronel',8),(8103,'Chiguayante',8),(8104,'Florida',8),(8105,'Hualqui',8),(8106,'Lota',8),(8107,'Penco',8),(8108,'San Pedro De La Paz',8),(8109,'Santa Juana',8),(8110,'Talcahuano',8),(8111,'Tome',8),(8112,'Hualpen',8),(8201,'Lebu',8),(8202,'Arauco',8),(8203,'Canete',8),(8204,'Contulmo',8),(8205,'Curanilahue',8),(8206,'Los Alamos',8),(8207,'Tirua',8),(8301,'Los Angeles',8),(8302,'Antuco',8),(8303,'Cabrero',8),(8304,'Laja',8),(8305,'MulchÉn',8),(8306,'Nacimiento',8),(8307,'Negrete',8),(8308,'Quilaco',8),(8309,'Quilleco',8),(8310,'San Rosendo',8),(8311,'Santa Barbara',8),(8312,'Tucapel',8),(8313,'Yumbel',8),(8314,'Alto Bio Bio',8),(8401,'ChillÁn',8),(8402,'Bulnes',8),(8403,'Cobquecura',8),(8404,'Coelemu',8),(8405,'Coihueco',8),(8406,'Chillan Viejo',8),(8407,'El Carmen',8),(8408,'Ninhue',8),(8409,'IquÉn',8),(8410,'Pemuco',8),(8411,'Pinto',8),(8412,'Portezuelo',8),(8413,'Quillon',8),(8414,'Quirihue',8),(8415,'Ranquil',8),(8416,'San Carlos',8),(8417,'San Fabian',8),(8418,'San Ignacio',8),(8419,'San Nicolas',8),(8420,'Treguaco',8),(8421,'Yungay',8),(9101,'Temuco',9),(9102,'Carahue',9),(9103,'Cunco',9),(9104,'Curarrehue',9),(9105,'Freire',9),(9106,'Galvarino',9),(9107,'Gorbea',9),(9108,'Lautaro',9),(9109,'Loncoche',9),(9110,'Melipeuco',9),(9111,'Nueva Imperial',9),(9112,'Padre Las Casas',9),(9113,'Perquenco',9),(9114,'Pitrufquen',9),(9115,'Pucon',9),(9116,'Saavedra',9),(9117,'Teodoro Schmidt',9),(9118,'Tolten',9),(9119,'Vilcun',9),(9120,'Villarrica',9),(9121,'Cholchol',9),(9201,'Angol',9),(9202,'Collipulli',9),(9203,'Curacautin',9),(9204,'Ercilla',9),(9205,'Lonquimay',9),(9206,'Los Sauces',9),(9207,'Lumaco',9),(9208,'Puren',9),(9209,'Renaico',9),(9210,'Traiguen',9),(9211,'Victoria',9),(10101,'Puerto Montt',10),(10102,'Calbuco',10),(10103,'Cochamo',10),(10104,'Fresia',10),(10105,'Frutillar',10),(10106,'Los Muermos',10),(10107,'Llanquihue',10),(10108,'Maullin',10),(10109,'Puerto Varas',10),(10201,'Castro',10),(10202,'Ancud',10),(10203,'Chonchi',10),(10204,'Curaco De Velez',10),(10205,'Dalcahue',10),(10206,'Puqueldan',10),(10207,'Queilon',10),(10208,'Quellon',10),(10209,'Quemchi',10),(10210,'Quinchao',10),(10301,'Osorno',10),(10302,'Puerto Octay',10),(10303,'Purranque',10),(10304,'Puyehue',10),(10305,'Rio Negro',10),(10306,'San Juan De La Costa',10),(10307,'San Pablo',10),(10401,'Chaiten',10),(10402,'Futaleufu',10),(10403,'Hualaihue',10),(10404,'Palena',10),(11101,'Coihaique',11),(11102,'Lago Verde',11),(11201,'Aysen',11),(11202,'Cisnes',11),(11203,'Guaitecas',11),(11301,'Cochrane',11),(11302,'O Higgins',11),(11303,'Tortel',11),(11401,'Chile Chico',11),(11402,'Rio Ibanez',11),(12101,'Punta Arenas',12),(12102,'Laguna Blanca',12),(12103,'Rio Verde',12),(12104,'San Gregorio',12),(12201,'Cabo De Hornos',12),(12202,'Antartica',12),(12301,'Porvenir',12),(12302,'Primavera',12),(12303,'Timaukel',12),(12401,'Natales',12),(12402,'Torres Del Paine',12),(13101,'Santiago',13),(13102,'Cerrillos',13),(13103,'Cerro Navia',13),(13104,'Conchali',13),(13105,'El Bosque',13),(13106,'Estacion Central',13),(13107,'Huechuraba',13),(13108,'Independencia',13),(13109,'La Cisterna',13),(13110,'La Florida',13),(13111,'La Granja',13),(13112,'La Pintana',13),(13113,'La Reina',13),(13114,'Las Condes',13),(13115,'Lo Barnechea',13),(13116,'Lo Espejo',13),(13117,'Lo Prado',13),(13118,'Macul',13),(13119,'Maipu',13),(13120,'Nunoa',13),(13121,'Pedro Aguirre Cerda',13),(13122,'Penalolen',13),(13123,'Providencia',13),(13124,'Pudahuel',13),(13125,'Quilicura ',13),(13126,'Quinta Normal',13),(13127,'Recoleta',13),(13128,'Renca',13),(13129,'San Joaquin',13),(13130,'San Miguel',13),(13131,'San Ramon',13),(13132,'Vitacura',13),(13201,'Puente Alto',13),(13202,'Pirque',13),(13203,'San Jose De Maipo',13),(13301,'Colina',13),(13302,'Lampa',13),(13303,'Tiltil',13),(13401,'San Bernardo',13),(13402,'Buin',13),(13403,'Calera De Tango',13),(13404,'Paine',13),(13501,'Melipilla',13),(13502,'Alhue',13),(13503,'Curacavi',13),(13504,'Maria Pinto',13),(13505,'San Pedro',13),(13601,'Talagante',13),(13602,'El Monte',13),(13603,'Isla De Maipo',13),(13604,'Padre Hurtado',13),(13605,'Penaflor',13),(14101,'Valdivia',14),(14102,'Corral',14),(14103,'Lanco',14),(14104,'Los Lagos',14),(14105,'Mafil',14),(14106,'Mariquina',14),(14107,'Paillaco',14),(14108,'Panguipulli',14),(14201,'La Union',14),(14202,'Futrono',14),(14203,'Lago Ranco',14),(14204,'Rio Bueno',14),(15101,'Arica',15),(15102,'Camarones',15),(15201,'Putre',15),(15202,'General Lagos',15);
/*!40000 ALTER TABLE `tablas_comunas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tablas_formapagogral`
--

LOCK TABLES `tablas_formapagogral` WRITE;
/*!40000 ALTER TABLE `tablas_formapagogral` DISABLE KEYS */;
INSERT INTO `tablas_formapagogral` VALUES (1,'Transferencia Electrónica'),(2,'Transbank');
/*!40000 ALTER TABLE `tablas_formapagogral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tablas_formapagosalud`
--

LOCK TABLES `tablas_formapagosalud` WRITE;
/*!40000 ALTER TABLE `tablas_formapagosalud` DISABLE KEYS */;
INSERT INTO `tablas_formapagosalud` VALUES (1,'Transferencia Electrónica'),(2,'Isapre'),(3,'Transbank'),(4,'Fonasa');
/*!40000 ALTER TABLE `tablas_formapagosalud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tablas_modalidadatencion`
--

LOCK TABLES `tablas_modalidadatencion` WRITE;
/*!40000 ALTER TABLE `tablas_modalidadatencion` DISABLE KEYS */;
INSERT INTO `tablas_modalidadatencion` VALUES (1,'Presencial'),(2,'Virtual'),(3,'Domicilio');
/*!40000 ALTER TABLE `tablas_modalidadatencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tablas_planes`
--

LOCK TABLES `tablas_planes` WRITE;
/*!40000 ALTER TABLE `tablas_planes` DISABLE KEYS */;
INSERT INTO `tablas_planes` VALUES (1,'2024-01-01','2024-12-31','Plan Anual 2024','1','2',60000.00);
/*!40000 ALTER TABLE `tablas_planes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tablas_promociones`
--

LOCK TABLES `tablas_promociones` WRITE;
/*!40000 ALTER TABLE `tablas_promociones` DISABLE KEYS */;
INSERT INTO `tablas_promociones` VALUES (1,'Promocion Invierno','2024-04-03','2024-05-31','clave1',10.00,2000.00,'1'),(2,'Promo Mes Del Mar','2024-05-01','2024-05-31','21demayo',10.00,1000.00,'1');
/*!40000 ALTER TABLE `tablas_promociones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tablas_rubros`
--

LOCK TABLES `tablas_rubros` WRITE;
/*!40000 ALTER TABLE `tablas_rubros` DISABLE KEYS */;
INSERT INTO `tablas_rubros` VALUES (1,'Salud','1'),(2,'Derecho','0'),(3,'Contabilidad','0'),(4,'Asesoria','0'),(5,'Ingenieria En Sistemas / Ti','0'),(6,'Mercadotecnia','0'),(7,'Idiomas','0'),(8,'Diseño Grafico','0'),(9,'Arquitectura','0'),(10,'Comunicaciones','0'),(11,'Fotografia Y Video','0'),(12,'Refuerzo Academico','0'),(13,'Guia Turistico','0'),(14,'Entrenador Personal','0'),(15,'Asesor De Imagen','0'),(16,'Mantenimiento / Reparacion','0'),(17,'Mascotas','0'),(18,'Automovil','0');
/*!40000 ALTER TABLE `tablas_rubros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tablas_categorias`
--

LOCK TABLES `tablas_categorias` WRITE;
/*!40000 ALTER TABLE `tablas_categorias` DISABLE KEYS */;
INSERT INTO `tablas_categorias` VALUES (1,'Medicina',1),(2,'Odontologia',1),(3,'Enfermeria',1),(4,'Kinesiologia',1),(5,'Matrona',1),(6,'Nutricion',1),(7,'Fonoaudiologia',1),(8,'Podologia',1),(9,'Terapia Ocupacional',1),(10,'Psicologia',1),(11,'Tecnico En Enfermeria',1),(12,'Abogado Penalista',2),(13,'Abogado Civil',2),(14,'Abogado De Familia',2),(15,'Abogado Inmobiliario',2),(16,'Abogado Laboral',2),(17,'Abogado Administrativo',2),(18,'Abogado Mercantil',2),(19,'Abogado Tributario',2),(20,'Abogado Ambiental',2),(21,'Contabilidad Financiera',3),(22,'Contabilidad De Gestion',3),(23,'Contabilidad Administrativa',3),(24,'Contabilidad De Costos',3),(25,'Contabilidad Tributaria',3),(26,'Contabilidad Fiscal',3),(27,'Contabilidad Publica',3),(28,'Contabilidad De Servicios',3),(29,'Contabilidad Por Actividad',3),(30,'Finanzas',4),(31,'Administracion',4),(32,'Planificacion Estrategica',4),(33,'Paisajismo',4),(34,'Administracion De Redes Y Sistemas',5),(35,'Desarrollo Web Y De Aplicaciones Moviles',5),(36,'Ingenieria De Datos',5),(37,'Administracion De Base De Datos',5),(38,'Gestion De Redes Sociales',6),(39,'Optimizacion De Motores De Busqueda (seo)',6),(40,'Campañas De Anuncios',6),(41,'Gestion De Marca O De Marca Personal',6),(42,'Copywriting Y Redaccion De Contenidos',6),(43,'Traduccion',7),(44,'Doblaje',7),(45,'Ilustracion',8),(46,'Diseño De Empaque',8),(47,'Identidad Corporativa',8),(48,'Tipografia',8),(49,'Diseño Multimedia',8),(50,'Diseño Web',8),(51,'Diseño Editorial',8),(52,'Diseño Instruccional',8),(53,'Diseño Industrial',8),(54,'Diseño 3d Y Cad',9),(55,'Interiorismo',9),(56,'Remodelaciones',9),(57,'Diseño De Planos',9),(58,'Creador De Contenidos Audiovisuales',10),(59,'Edicion De Video',10),(60,'Redaccion De Contenidos',10),(61,'Locucion De Podcast',10),(62,'Consultor De Publicidad',10),(63,'Fotografia',11),(64,'Video',11),(65,'Eventos',11),(66,'Idiomas',12),(67,'Matematicas',12),(68,'Leguaje',12),(69,'Fisica',12),(70,'Historia',12),(71,'Quimica',12),(72,'Paes',12),(73,'Guia Turistico',13),(74,'Entrenador Personal',14),(75,'Asesor De Imagen',15),(76,'Bricolaje',16),(77,'Equipos / Computadoras',16),(78,'Linea Blanca',16),(79,'Calefaccion',16),(80,'Calefon',16),(81,'Carpinteria',16),(82,'Plomeria',16),(83,'Veterinario',17),(84,'Entrenador Canino',17),(85,'Entrenador De Mascotas',17),(86,'Cuidador De Mascotas',17),(87,'Revision Tecnica',18),(88,'Mantencion',18),(89,'Escaner',18),(90,'Grua',18),(91,'Desabollador Y Pintura',18);
/*!40000 ALTER TABLE `tablas_categorias` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `tablas_subcategorias`
--

LOCK TABLES `tablas_subcategorias` WRITE;
/*!40000 ALTER TABLE `tablas_subcategorias` DISABLE KEYS */;
INSERT INTO `tablas_subcategorias` VALUES (1,'Anestesiologia',1,1),(2,'Cardiologia',1,1),(3,'Cirugia Cardiovascular',1,1),(4,'Cirugia General',1,1),(5,'Cirugia De Cabeza Y Cuello Y Maxilofacial',1,1),(6,'Cirugia Plastica Y Reparadora',1,1),(7,'Cirugia De Torax',1,1),(8,'Cirugia Vascular Periferica',1,1),(9,'Coloproctologia',1,1),(10,'Dermatologia',1,1),(11,'Diabetologia',1,1),(12,'Endocrinologia',1,1),(13,'Enfermedades Respiratorias',1,1),(14,'Fisiatria',1,1),(15,'Gastroenterologia',1,1),(16,'Geriatria',1,1),(17,'Genetica Clinica',1,1),(18,'Ginecologia',1,1),(19,'Hematologia',1,1),(20,'Infectologia',1,1),(21,'Inmunologia Y Alergologia',1,1),(22,'Medicina Familiar',1,1),(23,'Medicina General',1,1),(24,'Medicina Interna',1,1),(25,'Medicina Materno Fetal',1,1),(26,'Medicina Paliativa',1,1),(27,'Nefrologia',1,1),(28,'Neonatologia',1,1),(29,'Neurocirugia',1,1),(30,'Neurologia',1,1),(31,'Nutriologia',1,1),(32,'Oncologia',1,1),(33,'Oftalmologia',1,1),(34,'Otorrinolaringologia',1,1),(35,'Reumatologia',1,1),(36,'Pediatria',1,1),(37,'Psiquiatria',1,1),(38,'Traumatologia',1,1),(39,'Urologia',1,1),(40,'Cirugia Bucal Y Maxilofacial',2,1),(41,'Implantologia',2,1),(42,'General',2,1),(43,'Ortodoncia',2,1),(44,'Endodoncia',2,1),(45,'Odontopediatria',2,1),(46,'Periodoncia',2,1),(47,'Rehabilitacion Oral',2,1),(48,'Trastornos Temporomandibulares',2,1),(49,'Radiologia',2,1),(50,'Restauradora Estetica',2,1),(51,'Inyeccion',3,1),(52,'Cuidado Adulto Mayor',3,1),(53,'Cuidado Paciente',3,1),(54,'Cuidado Recien Nacido',3,1),(55,'Curaciones',3,1),(56,'Administracion Medicamentos Endovenosos',3,1),(57,'Instalacion De Sondas',3,1),(58,'Manejo Y Cuidado Colostomia',3,1),(59,'Cuidado Salud Mental',3,1),(60,'Asesoria Lactancia',3,1),(61,'Asesoria Lactancia',5,1),(62,'Neuropsicologia',10,1),(63,'Clinica',10,1),(64,'Inyeccion',11,1),(65,'Cuidado Adulto Mayor',11,1),(66,'Cuidado Paciente',11,1),(67,'Curaciones',11,1),(68,'Accidentes De Transito',12,2),(69,'Delitos Y Faltas',12,2),(70,'Estafa',12,2),(71,'Hurto',12,2),(72,'Deudas',13,2),(73,'Deuda Tag',13,2),(74,'Herencia De Deudas',13,2),(75,'Tercerias',13,2),(76,'Divorcios Y Separaciones',14,2),(77,'Pension Alimenticia',14,2),(78,'Herencias',14,2),(79,'Cambio De Nombre',14,2),(80,'Embargos',15,2),(81,'Arriendos',15,2),(82,'Terrenos',15,2),(83,'Compraventa',15,2),(84,'Renuncia',16,2),(85,'Despido',16,2),(86,'Contratos',16,2),(87,'Fueros Maternales',16,2),(88,'Registro De Marca',17,2),(89,'Alzas',17,2),(90,'Alzas De Isapres',17,2),(91,'Abogado Sociedades',17,2),(92,'Impuestos',19,2),(93,'Medio Ambiente',20,2),(94,'Grandes Empresas',25,3),(95,'Pymes',25,3),(96,'Personas',25,3),(97,'Traduccion',43,7),(98,'Interprete',43,7),(99,'Traduccion Tecnica',43,7),(100,'Ingles',44,7),(101,'Frances',44,7),(102,'Otros Idiomas',44,7),(103,'Drones',64,11),(104,'Estandar',64,11);
/*!40000 ALTER TABLE `tablas_subcategorias` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `tablas_tipoprevision`
--

LOCK TABLES `tablas_tipoprevision` WRITE;
/*!40000 ALTER TABLE `tablas_tipoprevision` DISABLE KEYS */;
INSERT INTO `tablas_tipoprevision` VALUES (1,'Particular'),(2,'Isapre'),(3,'Fonasa'),(4,'Capredena');
/*!40000 ALTER TABLE `tablas_tipoprevision` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Dumping data for table `usuarios_personas`
--

LOCK TABLES `usuarios_personas` WRITE;
/*!40000 ALTER TABLE `usuarios_personas` DISABLE KEYS */;
INSERT INTO `usuarios_personas` VALUES (1,'8.300.166-6','2','3','1962-04-17','999999',320,5109,5,7),(2,'7.451.087-6','2','3','1958-01-15','56 9 9 8280299',320,5109,5,8);
/*!40000 ALTER TABLE `usuarios_personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios_especialistas`
--

LOCK TABLES `usuarios_especialistas` WRITE;
/*!40000 ALTER TABLE `usuarios_especialistas` DISABLE KEYS */;
INSERT INTO `usuarios_especialistas` VALUES (4,'','Mi descripcion','0',NULL,60,'','0',25,3,94,2);
/*!40000 ALTER TABLE `usuarios_especialistas` ENABLE KEYS */;
UNLOCK TABLES;

