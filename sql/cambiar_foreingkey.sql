SHOW CREATE TABLE usuarios_personas;

ALTER TABLE usuarios_personas DROP FOREIGN KEY `usuarios_personas_usuario_id_d98790c7_fk_auth_user_id`;
ALTER TABLE usuarios_personas ADD CONSTRAINT `usuarios_personas_usuario_id_d98790c7_fk_auth_user_id` 
FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE;

CREATE TABLE `usuarios_personas` (
   `id` bigint(20) NOT NULL AUTO_INCREMENT,
   `rut` varchar(20) NOT NULL,
   `estado` varchar(1) NOT NULL,
   `perfil` varchar(1) NOT NULL,
   `fnacimiento` date NOT NULL,
   `telefono` varchar(20) NOT NULL,
   `ciudad_id` bigint(20) DEFAULT NULL,
   `comuna_id` bigint(20) DEFAULT NULL,
   `region_id` bigint(20) DEFAULT NULL,
   `usuario_id` int(11) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `usuario_id` (`usuario_id`),
   KEY `usuarios_personas_ciudad_id_d20b4a77_fk_tablas_ciudades_id` (`ciudad_id`),
   KEY `usuarios_personas_comuna_id_f9742445_fk_tablas_comunas_id` (`comuna_id`),
   KEY `usuarios_personas_region_id_cf74c9e6_fk_tablas_regiones_id` (`region_id`),
   CONSTRAINT `usuarios_personas_ciudad_id_d20b4a77_fk_tablas_ciudades_id` FOREIGN KEY (`ciudad_id`) REFERENCES `tablas_ciudades` (`id`),
   CONSTRAINT `usuarios_personas_comuna_id_f9742445_fk_tablas_comunas_id` FOREIGN KEY (`comuna_id`) REFERENCES `tablas_comunas` (`id`),
   CONSTRAINT `usuarios_personas_region_id_cf74c9e6_fk_tablas_regiones_id` FOREIGN KEY (`region_id`) REFERENCES `tablas_regiones` (`id`),
   CONSTRAINT `usuarios_personas_usuario_id_d98790c7_fk_auth_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 
 
 
SHOW CREATE TABLE usuarios_especialistas 

ALTER TABLE usuarios_especialistas DROP FOREIGN KEY `usuarios_especialist_persona_id_3ae23979_fk_usuarios_`;
ALTER TABLE usuarios_especialistas ADD CONSTRAINT `usuarios_especialist_persona_id_3ae23979_fk_usuarios_` 
FOREIGN KEY (`persona_id`) REFERENCES `usuarios_personas` (`id`) ON DELETE CASCADE; 
 
 CREATE TABLE `usuarios_especialistas` (
   `id` bigint(20) NOT NULL AUTO_INCREMENT,
   `foto` varchar(100) DEFAULT NULL,
   `descripcion` varchar(250) DEFAULT NULL,
   `estado_suscripcion` varchar(1) NOT NULL,
   `promedio_evaluacion` decimal(6,2) NOT NULL,
   `tiempo_consulta` smallint(5) unsigned NOT NULL CHECK (`tiempo_consulta` >= 0),
   `reg_especialista` varchar(120) DEFAULT NULL,
   `ctr_altadctos` varchar(1) NOT NULL,
   `categoria_id` bigint(20) DEFAULT NULL,
   `plan_id` bigint(20) DEFAULT NULL,
   `rubro_id` bigint(20) DEFAULT NULL,
   `subcategoria_id` bigint(20) DEFAULT NULL,
   `persona_id` bigint(20) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `persona_id` (`persona_id`),
   KEY `usuarios_especialist_categoria_id_3a299847_fk_tablas_ca` (`categoria_id`),
   KEY `usuarios_especialistas_plan_id_7ef534b5_fk_tablas_planes_id` (`plan_id`),
   KEY `usuarios_especialistas_rubro_id_17f4a9d5_fk_tablas_rubros_id` (`rubro_id`),
   KEY `usuarios_especialist_subcategoria_id_dc2edc5b_fk_tablas_su` (`subcategoria_id`),
   CONSTRAINT `usuarios_especialist_categoria_id_3a299847_fk_tablas_ca` FOREIGN KEY (`categoria_id`) REFERENCES `tablas_categorias` (`id`),
   CONSTRAINT `usuarios_especialist_persona_id_3ae23979_fk_usuarios_` FOREIGN KEY (`persona_id`) REFERENCES `usuarios_personas` (`id`),
   CONSTRAINT `usuarios_especialist_subcategoria_id_dc2edc5b_fk_tablas_su` FOREIGN KEY (`subcategoria_id`) REFERENCES `tablas_subcategorias` (`id`),
   CONSTRAINT `usuarios_especialistas_plan_id_7ef534b5_fk_tablas_planes_id` FOREIGN KEY (`plan_id`) REFERENCES `tablas_planes` (`id`),
   CONSTRAINT `usuarios_especialistas_rubro_id_17f4a9d5_fk_tablas_rubros_id` FOREIGN KEY (`rubro_id`) REFERENCES `tablas_rubros` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 
 
 
 SHOW CREATE TABLE especialistas_pagos;
 
 CREATE TABLE `especialistas_pagos` (
   `id` bigint(20) NOT NULL AUTO_INCREMENT,
   `fdesde` date NOT NULL,
   `fhasta` date NOT NULL,
   `fpago` date NOT NULL,
   `estado` varchar(1) NOT NULL,
   `monto` decimal(10,2) DEFAULT NULL,
   `numero_dcto` varchar(45) DEFAULT NULL,
   `contrato_id` bigint(20) DEFAULT NULL,
   `especialista_id` bigint(20) NOT NULL,
   `formapago_id` bigint(20) DEFAULT NULL,
   `documento` varchar(100) DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `especialistas_pagos_contrato_id_912542b6_fk_especiali` (`contrato_id`),
   KEY `especialistas_pagos_especialista_id_52faf029_fk_usuarios_` (`especialista_id`),
   KEY `especialistas_pagos_formapago_id_4abe08fc_fk_tablas_fo` (`formapago_id`),
   CONSTRAINT `especialistas_pagos_contrato_id_912542b6_fk_especiali` FOREIGN KEY (`contrato_id`) REFERENCES `especialistas_contratos` (`id`),
   CONSTRAINT `especialistas_pagos_especialista_id_52faf029_fk_usuarios_` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`),
   CONSTRAINT `especialistas_pagos_formapago_id_4abe08fc_fk_tablas_fo` FOREIGN KEY (`formapago_id`) REFERENCES `tablas_formapagogral` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 
 
ALTER TABLE especialistas_pagos DROP FOREIGN KEY `especialistas_pagos_especialista_id_52faf029_fk_usuarios_`;
ALTER TABLE especialistas_pagos ADD CONSTRAINT `especialistas_pagos_especialista_id_52faf029_fk_usuarios_` 
FOREIGN KEY (`especialista_id`) REFERENCES `usuarios_especialistas` (`id`) ON DELETE CASCADE; 
