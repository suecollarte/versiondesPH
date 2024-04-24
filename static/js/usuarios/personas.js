$(document).ready(function(){

	var f100 = new LiveValidation('nombre');
	f100.add(Validate.Presence);
	var f101 = new LiveValidation('apellido');
	f101.add(Validate.Presence);
	var f102 = new LiveValidation('email');
	f102.add(Validate.Presence);
	var f103 = new LiveValidation('telefono');
	f103.add(Validate.Presence);
	var f104 = new LiveValidation('rut');
	f104.add(Validate.Presence);

	$('#rut').blur(function(){
		if (validarRUT())
			$('#username').val(rut_a_username())
		else {
			$('#username').val('');
			$('#username').focus();
			}
		});

	$('#region').change(function(){
		Cargar_Comunas();
		Cargar_Ciudades();
		});	
//
// Dialogo para Modificar Registro.
//	
	$("#diagedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height:500,
		width: 800,
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
			}
	})
//
// Dialogo para Modificar Password.
//	
	$("#passwdedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height: 320,
		width: 400,
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
			$("#txtPassword").val('');
			$("#txtConfirmPassword").val('');
			}
	});	

	Crear_DataTable(); 

});
//
// ********************************
//          Funciones
// ********************************
//
function CamposValidos(){

	var txtaux = allTrim($('#rut').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar R.U.T. del Usuario",MSG_STOP);
		$('#username').val('');
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
	
function EditarRegistro(id){

	ACCION = EDITAR_REG;
	VerUnRegistro(id);
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

	
function AgregarRegistro(){

	ACCION = AGREGAR_REG;
	$("#miregion").val(REGIONMETRO);
	$("#micomuna").val(COMUNASTGO);
	$('#miciudad').val(CIUDADSTGO);
	$("#region").val(REGIONMETRO);
	$("#comuna").val(COMUNASTGO);
	$('#ciudad').val(CIUDADSTGO);
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
	
function VerRegistro(id){

	ACCION = VER_REG;
	VerUnRegistro(id);
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


function BorrarRegistro(id){

	ACCION = ELIMINAR_REG;
	VerUnRegistro(id);
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
		title: "Bloquear Usuario",
		buttons: [
			{
				text: "Bloquear",
				click: function() {
					confirmarMensaje("El Usuario será Bloqueado y no podrá Ingresar.",EnviaPeticionAjax,ELIMINAR_REG,id);
					$( this ).dialog("close");
					},
				class:"ui-corner-all", style:"color:Red" 
			},
			{
				text: "Salir",
				click: function() {
					$( this ).dialog("close");
					},
				class:"ui-corner-all", style:"color:Green" 
			}
			]
		});	

		$("#diagedit").dialog("open");
	};
	
	
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
//	alert("En PeticionAjax Comuna="+comuna);
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


function VerUnRegistro(id) {

	$("#region").unbind("change");
	$.ajax({
		url: "/usuarios/personas_verregistro/",
		type: 'GET',
		dataType: 'json',
		data: {id: id},
		success: function( data ) {
			$.each(data, function(index, element) {
//				alert("En VerUnRegistro Region="+element.region+" Ciudad="+element.ciudad+" Comuna="+element.comuna)
				$("#id").val(id);
				$("#username").val(element.username);
				$("#rut").val(element.rut);
				$("#nombre").val(element.nombre);
				$("#apellido").val(element.apellido);
				$("#fnacimiento").val(element.fnacimiento);
				$("#email").val(element.email);
				$("#telefono").val(element.telefono);
				$("#miregion").val(element.region);
				$("#micomuna").val(element.comuna);
				$("#miciudad").val(element.ciudad);
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
	}


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
}

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

function BloquearRegistro(id){
	confirmarMensaje("El Usuario será Bloqueado y no podrá Ingresar al Sistema.",CambiarEstadoPersona,id,0);
	};


function DesBloquearRegistro(id){
	confirmarMensaje("El Usuario será DesBloqueado y podrá Ingresar al Sistema.",CambiarEstadoPersona,id,1);
	};
	
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

function CambiarClave(id){

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

function rut_a_username() {
	var tmpstr = "";
	var crut = allTrim($('#rut').val());

	for ( i=0; i <crut.length ; i++ )
		if (crut.charAt(i) != '.' && crut.charAt(i) != '-' ) 
			tmpstr = tmpstr + crut.charAt(i);
	return tmpstr;
	}


function Crear_DataTable() {

	$('#tablaregs').DataTable({
		language: {url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-CL.json'	},
		pagingType: 'full_numbers',
		bJQueryUI: 'true',
		iDisplayLength: '25',
		order: [[1, 'asc']],
		columnDefs: [
			{ orderable: false, targets: [0,6] },
			{ searchable: false, targets: [6] }
			]
		});
};
