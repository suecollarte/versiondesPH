$(document).ready(function(){

	try{
		var f100 = new LiveValidation('nombre');
		f100.add(Validate.Presence);
		} catch (e) {};
	try{
		var f102 = new LiveValidation('email');
		f102.add(Validate.Presence);
		} catch (e) {};	
	try{
		var f103 = new LiveValidation('telefono');
		f103.add(Validate.Presence);
		} catch (e) {};
	try{
		var f104 = new LiveValidation('rut');
		f104.add(Validate.Presence);
		} catch (e) {};
//
// Dialogo para Modificar Registro.
//	
	$("#diagedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height:500,
		width: 1040,
		resizable: false,
		modal: true,  
		show: {
			effect: "blind",
			duration: 1000
			},
		hide: {
			effect: "explode",
			duration: 1000
			},
		open: function() {
			},
		close: function() {
			$("#username").val('');
			$("#rut").val('');
			$("#nombre").val('');
			$("#apellido").val('');
			$("#fnacimiento").val('');
			$("#email").val('');
			$("#telefono").val('');
			$('#msgverrut').html('');
			$('#msgverrut').removeClass();
			}
	});
//
// Dialogo para Modificar Password.
//	
	$("#passwdedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height: 350,
		width: 450,
		resizable: false,
		modal: true,  
		show: {
			effect: "blind",
			duration: 1000
		  	},
		hide: {
			effect: "explode",
			duration: 1000
		  	},
		open: function() {
			if(ACCION == AGREGAR_REG)
				VerificarRut();
			},
		close: function() {
			$("#txtPassword").val('');
			$("#txtConfirmPassword").val('');
			}
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
//
// Al cambiar Region adecuar Comunas y Ciudades de RUT.
//
	$('#region').change(function(){
		Cargar_Comunas();
		Cargar_Ciudades();
		});	

	Crear_DataTable(); 
	CampoEnReadOnly("activo");
	CampoDisabled("estado");	
	CampoDisabled("perfil");


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
	txtaux = allTrim($('#nombre').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Nombre(s) del Usuario",MSG_STOP);
		return false;
		}
	txtaux = allTrim($('#apellido').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Apellido(s) del Usuario",MSG_STOP);
		return false;
		}
	txtaux = allTrim($('#email').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Correo Electrónico del Usuario",MSG_STOP);
		return false;
		}
	if (!validarCorreo(txtaux)) {
		mostrarMensaje("Correo Electrónico ingresado es inválido",MSG_STOP);
		return false;
		}
	txtaux = allTrim($('#telefono').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Teléfono del Usuario",MSG_STOP);
		return false;
		}
	return true;
};
//
// Abre Modal para Agregar registro de Persona (y usuario)
//		
function AgregarRegistro(){

	ACCION = AGREGAR_REG;
	$("#miregion").val(REGIONMETRO);
	$("#micomuna").val(COMUNASTGO);
	$('#miciudad').val(CIUDADSTGO);
	$("#region").val(REGIONMETRO);
	$("#comuna").val(COMUNASTGO);
	$('#ciudad').val(CIUDADSTGO);
	$('#perfil').val(REGISTRADO);
	$('#activo').val('Bloqueado');
	Cargar_Comunas();
	Cargar_Ciudades();
	CampoEnReadWrite("rut");
	CampoEnReadWrite("nombre");
	CampoEnReadWrite("apellido");
	CampoEnReadWrite("fnacimiento");
	CampoEnReadWrite("email");
	CampoEnReadWrite("telefono");
	CampoEnabled("region");
	CampoEnabled("comuna");
	CampoEnabled("ciudad");

	$("#diagedit").dialog({
		title: "Agregar Usuario",
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
// Abre Modal para Editar registro de Persona
//		
function EditarRegistro(id){

	ACCION = EDITAR_REG;
	$('#username').val($('#user'+id).val());
	VerUnaPersona();
	CampoEnReadOnly("rut");
	CampoEnReadWrite("nombre");
	CampoEnReadWrite("apellido");
	CampoEnReadWrite("fnacimiento");
	CampoEnReadWrite("email");
	CampoEnReadWrite("telefono");
	CampoEnabled("region");
	CampoEnabled("comuna");  
	CampoEnabled("ciudad");

	$("#diagedit").dialog({
		title: "Editar Usuario",
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
// Abre Modal para Ver detalle registro de Persona (o usuario)
//		
function VerRegistro(id){

	ACCION = VER_REG;
	$('#username').val($('#user'+id).val());
	VerUnaPersona();
	CampoEnReadOnly("rut");
	CampoEnReadOnly("nombre");
	CampoEnReadOnly("apellido");
	CampoEnReadOnly("fnacimiento");
	CampoEnReadOnly("email");
	CampoEnReadOnly("telefono");
	CampoDisabled("region");
	CampoDisabled("comuna");
	CampoDisabled("ciudad");

	$("#diagedit").dialog({
		title: "Ver Usuario",
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
// Envia datos de Persona (o usuario) via ajax para un update o create
//		
function EnviaPeticionAjax(accion,id){
	var username = allTrim($('#username').val());
	var rut = allTrim($('#rut').val());
	var nombre = allTrim($('#nombre').val());
    var apellido = allTrim($('#apellido').val());
    var fnacimiento = allTrim($('#fnacimiento').val());
    var telefono = allTrim($('#telefono').val());
    var email = allTrim($('#email').val());
    var region = $('#region option:selected').val();
	var comuna = $('#comuna option:selected').val();
	var ciudad = $('#ciudad option:selected').val();

	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/personas_listar/",
			data: {accion: accion, id: id, username: username, rut: rut, nombre: nombre, apellido: apellido, fnacimiento: fnacimiento,telefono: telefono, email: email, 
				region: region, comuna: comuna, ciudad: ciudad, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
// Carga datos de un registro desde tabla de Personas
//	
function VerUnaPersona() {

	$("#region").unbind("change");

	$.ajax({
		url: "/usuarios/especialistas_verpersona/",
		type: 'GET',
		dataType: 'json',
		data: {username: $('#username').val()},
		success: function( data ) {
			$.each(data, function(index, element) {
//				alert("En VerUnaPersona Region="+element.region+" Ciudad="+element.ciudad+" Comuna="+element.comuna);
				$("#id").val(element.id);
				$("#username").val(element.username);
				$("#rut").val(element.rut);
				$("#nombre").val(element.nombre);
				$("#apellido").val(element.apellido);
				$("#email").val(element.email);
				$("#telefono").val(element.telefono);
				$("#fnacimiento").val(element.fnacimiento);
				$("#miregion").val(element.region);
				$("#micomuna").val(element.comuna);
				$("#miciudad").val(element.ciudad);
				$("#activo").val(element.activo);
				$("#estado").val(element.estado);
				$("#perfil").val(element.perfil);
				});
			$("#region").val($("#miregion").val());
			Cargar_Comunas();
			Cargar_Ciudades();		
			},
		error: function(jqXHR, textStatus, errorThrown) {
			reject(errorThrown);
			}
	});
	$('#region').change(function(){
		Cargar_Comunas();
		Cargar_Ciudades();
		});
	};
//
// Actualiza lista de Comunas, dependiendo de la region elegida
//
function Cargar_Comunas() {
	var region, comuna;
	try {
		region = $('#region option:selected').val();
		comuna = $('#micomuna').val();
		} 
	catch (e) {
		region = REGIONMETRO;
		comuna = COMUNASTGO;
		}
//	alert("En Cargar_Comunas Region="+region+" Comuna="+comuna)
	$.ajax({
		url: "/tablas/selectcomunas",
		data: {region: region, comuna: comuna},
		type: 'GET',
		dataType: 'html',
		success: function(response) {
			$('#divcomunas').html(response);
			$('#comuna option:first').prop('selected', true);
			$("#comuna option").each(function(){
				if ($(this).val() === comuna) {
					$('#comuna option:first').prop('selected', false);
					$(this).attr("selected", "selected");
					}
				});
			if ((ACCION == ELIMINAR_REG) || (ACCION == VER_REG))
				CampoDisabled("comuna");
			else
				CampoEnabled("comuna");
			},
		error: function(jqXHR, textStatus, errorThrown) {
			MensajeErrorDesconocido('Hubo un problema(1) con la solicitud:', textStatus, errorThrown);
			}
		}); 
	};
//
// Actualiza lista de Ciudades, dependiendo de la region elegida
//	
function Cargar_Ciudades() {
	var region, ciudad;
	try {
		region = $('#region option:selected').val();
		ciudad = $('#miciudad').val();
		} 
	catch (e) {
		region = REGIONMETRO;
		ciudad = CIUDADSTGO;
		}
//	alert("En Cargar_Ciudades Region="+region+" Ciudad="+ciudad)
	$.ajax({
		url: "/tablas/selectciudades",
		data: {region: region, ciudad: ciudad},
		type: 'GET',
		dataType: 'html',
		success: function(response) {
			$('#divciudades').html(response);
			$('#ciudad option:first').prop('selected', true);
			$("#ciudad option").each(function(){
				if ($(this).val()===ciudad) {
					$('#ciudad option:first').prop('selected', false);
					$(this).attr("selected", "selected");
					}
				});
			if ((ACCION == ELIMINAR_REG) || (ACCION == VER_REG))
				CampoDisabled("ciudad");
			else
				CampoEnabled("ciudad");
			},
		error: function(jqXHR, textStatus, errorThrown) {
			MensajeErrorDesconocido('Hubo un problema(2) con la solicitud:', textStatus, errorThrown);
			}
		});
	};
//
// Envia mensaje para confirmar cambio de estado a Bloqueadp. Si el usuario confirma se ira a funcion CambiarEstadoPersona()
//	
function BloquearRegistro(id){
	confirmarMensaje("El Usuario será Bloqueado y NO podrá Ingresar al Sistema.",CambiarEstadoPersona,id,0);
	};
//
// Envia mensaje para confirmar cambio de estado a Desbloqueado. Si el usuario confirma se ira a funcion CambiarEstadoPersona()
//	
function DesBloquearRegistro(id){
	confirmarMensaje("El Usuario será DesBloqueado y podrá Ingresar al Sistema.",CambiarEstadoPersona,id,1);
	};
//
// Actualiza via ajax el estado de la persona (usuario)
//	
function CambiarEstadoPersona(id,estado){

	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/personas_cambiarestado/",
			data: {id: id, estado: estado, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
// Abre modal para cambio de password
//	
function CambiarClave(id){

	$('#strengthMessage').html('');
	$('#strengthMessage').removeClass();

	$("#passwdedit").dialog({
		title: "Cambiar Password de Usuario",
		buttons: [
			{
				text: "Grabar",
				click: function() {
					if (PasswordValida()) {
						EnviarPassword(id);
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
	$("#passwdedit").dialog("open");
	};
//
// Envia via ajax nueva password del usuario
//
function EnviarPassword(id){

	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/personas_password/",
			data: {id: id, password: allTrim($('#txtPassword').val()), csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response == "OK")
					mostrarMensaje("Cambio realizado con exito",MSG_SUCCESS);
				else
					mostrarMensaje(response+"<br />Cambio NO realizado",MSG_WARNING);
				}
			});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}
	};
//
//  Verificar si RUT ya existe en Base de Datos
//	
function VerSiExisteRut(){
	var rut = $('#rut').val();

	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/personas_verificarut/",
			data: {rut: rut, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( id ) {
				if (id != "0") {
					$('#username').val('');
					mostrarMensaje("R.U.T. Ya se encuentra Ingresado como Usuario",MSG_STOP);
					}
				}
			});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}
	};
//
// Crea DataTable para una lista de registros a recibir via ajax
//
function Crear_DataTable() {

	$('#tablaregs').DataTable({
        language: {url: '/static/jquery/datatables.es-CL.json'},
		pagingType: 'full_numbers',
		bJQueryUI: 'true',
		iDisplayLength: '25',
		order: [[1, 'asc']],
		columnDefs: [
			{ orderable: false, targets: [0,6] },
			{ searchable: false, targets: [6] }
			]
		});
	$(".tip").tooltip();
	};

