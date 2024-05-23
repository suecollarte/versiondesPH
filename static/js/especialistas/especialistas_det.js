$(document).ready(function(){

	try{
		var f100 = new LiveValidation('rut');
		f100.add(Validate.Presence);
	} catch (e) {};
	try{
		var f101 = new LiveValidation('descripcion');
		f101.add(Validate.Presence);
	} catch (e) {};
	try{
		var f102 = new LiveValidation('tiempo_consulta');
		f102.add(Validate.Presence);
	} catch (e) {};
//
// Cambia Rubro Seleccionado
//
	$('#rubro').on("change", function(){
		Cargar_Especialidad();
	});	

//
// Validacion de RUT.
//	
	ACCION = VER_REG;

	$('#rut').blur(function(){
		if (validarRUT()) {
			$('#rut').val(allTrim($('#rut').val()));
			$('#username').val(rut_a_username($('#rut').val()));
			if (ACCION == AGREGAR_REG) {
				VerSiExisteRut();
				}
			}
		else {
			$('#rut').focus();
			$('#username').val('');
			}
		});


	$("#tabs").tabs();

});
//
// ********************************
//          Funciones
// ********************************
//
// Valida Campos
//	
function CamposValidos(){

	var txtaux = allTrim($('#rut').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar R.U.T. del Usuario",MSG_STOP);
		$('#username').val('');
		return false;
		}	
	txtaux = allTrim($('#username').val());
	if (txtaux == "") 	{
		mostrarMensaje("Verifique el R.U.T por favor",MSG_STOP);
		return false;
		}
	txtaux = allTrim($('#descripcion').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe ingresar una Descripción",MSG_STOP);
		return false;
		}	
	txtaux = allTrim($('#tiempo_consulta').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe ingresar Duración de la Consulta",MSG_STOP);
		return false;
		}	
	return true;
};
//
// Abre Modal para Agregar registro de Especialista
//		
function AgregarRegistro(){

	ACCION = AGREGAR_REG;
	idGlobal1 = 1;
    idGlobal2 = 0;
    idGlobal3 = 0;

	$("#rubro").prop("selectedIndex", 0);
	Cargar_Especialidad();
//	$("#rubro").first().attr('selected','selected');
	$("#ctr_altadctos").prop("selectedIndex", 0);
	$("#estado_suscripcion").prop("selectedIndex", 0);

	CampoEnReadWrite("rut");
	CampoEnReadWrite("descripcion");
	CampoEnReadWrite("reg_especialista"); 
	CampoEnReadWrite("tiempo_consulta");  
	CampoEnabled("rubro");
	CampoEnabled("categoria");
	CampoEnabled("subcategoria");
	CampoDisabled("ctr_altadctos");
	CampoDisabled("estado_suscripcion");

	$("#diagedit").dialog({
		title: "Agregar Especialista",
		buttons: [
			{
				text: "Grabar",
				click: function() {
					if (CamposValidos()) {
						EnviaPeticionAjax(AGREGAR_REG,0);
						$( this ).dialog("close");
						}
					},
				class:"ui-corner-all", style:"color:Green" 
			},
			{
				text: "Salir",
				click: function() {
					$( this ).dialog("close");
					},
				class:"ui-corner-all", style:"color:Black" 
			}
			]
		});

	$("#diagedit").dialog("open");
};
//
// Abre Modal para Editar registro de Especialista
//	
function EditarRegistro(id){

	ACCION = EDITAR_REG;
	VerUnEspecialista(id);
	CampoEnReadOnly("rut");
	CampoEnReadWrite("descripcion");
	CampoEnReadWrite("reg_especialista");
	CampoEnReadWrite("tiempo_consulta");  
	CampoEnabled("rubro");
	CampoEnabled("categoria");
	CampoEnabled("subcategoria");
	CampoDisabled("ctr_altadctos");
	CampoDisabled("estado_suscripcion");

	$("#diagedit").dialog({
		title: "Editar Especialista",
		buttons: [
			{
				text: "Grabar",
				click: function() {
					if (CamposValidos()) {
						EnviaPeticionAjax(EDITAR_REG,id);
						$( this ).dialog("close");	
						}
					},
				class:"ui-corner-all", style:"color:Green" 
			},
			{
				text: "Salir",
				click: function() {
					$( this ).dialog("close");
					},
				class:"ui-corner-all", style:"color:Black" 
			}
			]
	  });
	  $("#diagedit").dialog("open");
};
//
// Abre Modal para Ver detalle registro de Especialista
//		
function VerRegistro(id){

	ACCION = VER_REG;
	VerUnEspecialista(id);
	CampoEnReadOnly("rut");
	CampoEnReadOnly("descripcion");
	CampoEnReadOnly("reg_especialista");
	CampoEnReadOnly("tiempo_consulta");  
	CampoDisabled("rubro");
	CampoDisabled("categoria");
	CampoDisabled("subcategoria");
	CampoDisabled("ctr_altadctos");
	CampoDisabled("estado_suscripcion");

	$("#diagedit").dialog({
		title: "Ver Especialista",
		buttons: [
			{
				text: "Cerrar",
				click: function() {
					$( this ).dialog("close");
					},
				class:"ui-corner-all", style:"color:Green" 
			}
			]
		});	

		$("#diagedit").dialog("open");
	};
//
// Envia datos de Especialista via ajax para un update o create
//	
function EnviaPeticionAjax(accion,id){
	var id = allTrim($('#idespecialista').val());
	var idpersona = allTrim($('#idpersona').val());
	var descripcion = allTrim($('#descripcion').val());
	var reg_especialista = allTrim($('#reg_especialista').val());
    var tiempo_consulta = allTrim($('#tiempo_consulta').val());
	var estado_suscripcion = $('#estado_suscripcion option:selected').val();
	var rubro = $('#rubro option:selected').val();
	var categoria = $('#categoria option:selected').val();
	try {
		var subcategoria = $('#subcategoria option:selected').val();
	} catch (e) {
    	var subcategoria = "0";
		}
	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/especialistas_listar/",
			data: {accion: accion, id: id, idpersona: idpersona, descripcion: descripcion, reg_especialista: reg_especialista, 
					tiempo_consulta: tiempo_consulta, estado_suscripcion: estado_suscripcion, rubro: rubro, categoria: categoria, 
					subcategoria: subcategoria, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response != ""){
					$('#datatablediv').html('');
					$("#datatablediv").html(response);
					Crear_DataTable();
					mostrarMensaje("Cambio realizado con exito",MSG_SUCCESS);
					}
				else
					mostrarMensaje("ERROR DESCONOCIDO<br />Cambio NO realizado",MSG_WARNING);
				}
			});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}
	};
//
// Lee via ajax datos de la tabla personas (y usuario)
//
function Cargar_Persona() {

	$('#username').val(rut_a_username($('#rut').val()));

	$.ajax({
		async: false,
		type: 'GET',
		dataType: "json",
		data: {username: $('#username').val()},
		url: '/usuarios/especialistas_verpersona/',
		success: function( data ) {
			$.each(data, function(index, element) {
				if (element.idpersona == "") {
					$("#idpersona").val('');
					$("#idusuario").val('');
					$('#username').val('');
					$("#nombre").val('');
					$('#email').val('');
					$('#descripcion').val('');
					$('#reg_especialista').val('');
					$('#tiempo_consulta').val('');
					$('#estado_persona').val('');
					$('#promedio_evaluacion').val('');
					mostrarMensaje("Usuario indicado no existe",MSG_STOP);
					}
				else{
					$("#idpersona").val(element.idpersona);
					$("#idusuario").val(element.idusuario);
					$("#nombre").val(element.apellido+' , '+element.nombre);
					$("#email").val(element.email);
					$("#estado_persona").val(element.estado_persona);
					}
				});
			return true;
			},
		error: function(jqXHR, textStatus, errorThrown) {
			$('#username').val('');
			mostrarMensaje("Usuario indicado no existe",MSG_STOP);
			return false;
			}
		}); 
};
//
//  Verificar si RUT ya existe en Base de Datos
//	
function VerSiExisteRut(){
	var rut = $('#rut').val();

	try {
		$.ajax({
			type: "GET",
			url: "/usuarios/especialistas_verificarut/",
			data: {rut: rut, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( data ) {
				$.each(data, function(index, element) {
					if (element.res == "-1") {
						$('#username').val('');
						$("#idusuario").val('');
						$("#idpersona").val('');
						$("#idespecialista").val('');
						$("#nombre").val('');
						$("#email").val('');
						$("#estado_persona").val('');
						mostrarMensaje("R.U.T. No ha sido ingresado como Usuario",MSG_STOP);
						}
					else{
						$("#idusuario").val(element.idusuario);
						$("#idpersona").val(element.idpersona);
						$("#idespecialista").val(element.idespecialista);
						$("#nombre").val(element.nombre);
						$("#email").val(element.email);
						$("#estado_persona").val(element.estado);
						if (element.res == "1") {
							$('#username').val('');
							mostrarMensaje("R.U.T. Ya se encuentra Ingresado como Especialista",MSG_STOP);
							}
						}
					});
				}
			});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}
	};
//
// Envia mensaje para confirmar cambio de estado a Bloqueadp. Si el usuario confirma se ira a funcion CambiarEstadoPersona()
//	
function BloquearRegistro(id){
	confirmarMensaje("La Suscripción será Bloqueada y el Especialista NO podrá Ingresar al Sistema.",CambiarEstadoEspecialista,id,0);
	};
//
// Envia mensaje para confirmar cambio de estado a Desbloqueado. Si el usuario confirma se ira a funcion CambiarEstadoPersona()
//	
function DesBloquearRegistro(id){
	confirmarMensaje("La Suscripción será DesBloqueada y el Especialista podrá Ingresar al Sistema.",CambiarEstadoEspecialista,id,1);
	};
//
// Actualiza via ajax el estado de la persona (usuario)
//	
function CambiarEstadoEspecialista(id,estado){

	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/especialistas_cambiarestado/",
			data: {id: id, estado: estado, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response != ""){
					$('#datatablediv').html('');
					$("#datatablediv").html(response);
					Crear_DataTable();
					mostrarMensaje("Cambio realizado con éxito",MSG_SUCCESS);
					}
				else
					mostrarMensaje("ERROR DESCONOCIDO<br />Cambio NO realizado",MSG_WARNING);
				}
			});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}
	};	
//
//
async function Cargar_Especialidad() {
//	alert("En Cargar_Especialidad");
    await EnviarAjaxEspecialidad()
        .then(function(data) {
            $("#divcategorias").html(''); 
            $("#divcategorias").append(data); 
            if ($('#categoria option[value="'+idGlobal1+'"]').length > 0)
                $("#categoria").val(idGlobal1);   
            else
                $("#categoria").prop("selectedIndex", 0);
			if ((ACCION == ELIMINAR_REG) || (ACCION == VER_REG)){
//				$('#categoria option[value="'+idGlobal1+'"]').prop('selected', true);
				CampoDisabled("categoria");
				}
			else {
//				$('#subcategoria option:first').prop('selected', true);
				CampoEnabled("categoria");
				}
			Cargar_SubEspecialidad();
            })
        .catch(function(error) {
            MensajeErrorDesconocido(error);
            });
    }; 

function EnviarAjaxEspecialidad() {
    return new Promise(function(resolve, reject) {
            var rubro;
            try {
                rubro = $('#rubro option:selected').val();
            } catch (e) {
                rubro = 0;
                }
            $.ajax({
                method: "POST",
                dataType:"html",
                url: "/tablas/selectcategorias",
                data: {rubro: rubro, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
                success: function(data) {
                    resolve(data);
                    },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    } 

async function Cargar_SubEspecialidad() {

    await EnviarAjaxSubEspecialidad()
        .then(function(data) {
            $("#divsubcategorias").html(''); 
            $("#divsubcategorias").append(data); 
			if ($('#subcategoria option[value="'+idGlobal2+'"]').length > 0)
                $("#subcategoria").val(idGlobal2);   
            else
                $("#subcategoria").prop("selectedIndex", 0);
			if ((ACCION == ELIMINAR_REG) || (ACCION == VER_REG)){
//				$('#subcategoria option[value="'+idGlobal2+'"]').prop('selected', true);
				CampoDisabled("subcategoria");
				}
			else {
//				$('#subcategoria option:first').prop('selected', true);
				CampoEnabled("subcategoria");
				}
			$('#categoria').on("change", function(){
				Cargar_SubEspecialidad();
				})
            })
        .catch(function(error) {
            MensajeErrorDesconocido(error);
            });
    }

function EnviarAjaxSubEspecialidad() {
    return new Promise(function(resolve, reject) {
            var categoria;
            try {
                categoria = $('#categoria option:selected').val();
            } catch (e) {
                categoria = 0;
                }
            $.ajax({
                method: "POST",
                dataType:"html",
                url: "/tablas/selectsubcategorias",
                data: {categoria: categoria, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
                success: function(data) {
                    resolve(data);
                    },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    }
//
// Carga datos de un registro desde tabla de Especialistas
//	
function VerUnEspecialista(id) {

//	$("#rubro").unbind("change");
//	$("#categoria").unbind("change");
	$('#rut').val($('#rut'+id).val());
	$('#username').val(rut_a_username($('#rut').val()));

	$.ajax({
		url: "/usuarios/especialistas_verespecialista/",
		type: 'GET',
		dataType: 'json',
		data: {id: id},
		success: function( data ) {
			$.each(data, function(index, element) {
				$("#idespecialista").val(element.id);
				$("#idpersona").val(element.idpersona);
				$("#idusuario").val(element.idusuario);
				$("#nombre").val(element.nombre);
				$("#email").val(element.email);
				$("#descripcion").val(element.descripcion);
				$("#reg_especialista").val(element.reg_especialista);
				$("#tiempo_consulta").val(element.tiempo_consulta);
				$("#ctr_altadctos").val(element.fnacimiento);
				$('#rubro').removeAttr('selected');
				$("#rubro option[value="+element.rubro+"]").attr("selected",true);
//				alert ("En VerUnEspecialista Rubro="+element.rubro+" Categoria="+element.categoria+" SubCategoria="+element.subcategoria);
				$("#categoria").val(element.categoria);
				idGlobal1 = element.categoria;
				$("#subcategoria").val(element.subcategoria);
				idGlobal2 = element.subcategoria;
				$("#ctr_altadctos").val(element.ctr_altadctos);
				$("#estado_suscripcion").val(element.estado_suscripcion);
				$("#estado_persona").val(element.estado_persona);
				$("#promedio_evaluacion").val(element.promedio_evaluacion);
				Cargar_Especialidad();
//				alert("Categoria="+element.categoria+" SubCategoria="+element.subcategoria);
				});
			},
		error: function(jqXHR, textStatus, errorThrown) {
			reject(errorThrown);
			}
		});

	}

