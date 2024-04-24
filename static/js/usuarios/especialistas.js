$(document).ready(function(){

	var f104 = new LiveValidation('rut');
	f104.add(Validate.Presence);

	$('#rubro').change(function(){
		Cargar_Categorias();
		});	

	$('#categoria').change(function(){
		Cargar_SubCategorias();
		});	
//
// Dialogo para Modificar Registro.
//	
	$("#diagedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height: 650,
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
			$("#email").val('');
			}
	})

$('#rut').blur(function(){
	if (validarRUT()) {
		Cargar_Persona();
		}
	else {
		$('#username').val('');
		$('#username').focus();
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
	txtaux = allTrim($('#username').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar R.U.T. de Usuario válido",MSG_STOP);
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

	
function AgregarRegistro(){;

	ACCION = AGREGAR_REG;
	$("#mirubro").val('1');
	$("#micategoria").val('1');
	$('#misubcategoria').val('1');
	$("#rubro option:not([disabled])").first().attr('selected','selected');
	$("#categoria option:not([disabled])").first().attr('selected','selected');
	$("#subcategoria option:not([disabled])").first().attr('selected','selected');
	Cargar_Categorias();
//	Cargar_SubCategorias();
	CampoEnReadWrite("rut");
	CampoEnabled("rubro");
	CampoEnabled("categoria");
	CampoEnabled("subcategoria");

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

	$("#rubro").unbind("change");
	$.ajax({
		url: "/usuarios/especialistas_verregistro/",
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
				$("#mirubro").val(element.rubro);
				$("#micategoria").val(element.categoria);
				$("#misubcategoria").val(element.subcategoria);
				});
			$("#rubro").val($("#mirubro").val());
			Cargar_Categorias();	
			},
		error: function(jqXHR, textStatus, errorThrown) {
			reject(errorThrown);
			}
	});
	$('#rubro').change(function(){
		Cargar_Categorias();
		});
	}

function Cargar_Categorias() {
	var rubro, categoria;
	try {
		rubro = $('#rubro option:selected').val();
		categoria = $('#categoria option:selected').val();
//		rubro = $('#mirubro').val();
//		categoria = $('#micategoria').val();
		} 
	catch (e) {
		rubro = 1;
		categoria = 1;
		}
//	alert("En Cargar_Categorias rubro="+rubro+" categoria="+categoria)
	$.ajax({
		url: "/tablas/selectcategorias",
		data: {rubro: rubro, categoria: categoria},
		type: 'GET',
		dataType: 'html',
		success: function(response) {
			$("#categoria").unbind("change");
			$('#divcategorias').html(response);
			$('#categoria option:first').prop('selected', true);
			$("#categoria option").each(function(){
				if ($(this).val() === categoria) {
					$('#categoria option:first').prop('selected', false);
					$(this).attr("selected", "selected");
					}
				});
			if ((ACCION == ELIMINAR_REG) || (ACCION == VER_REG))
				CampoDisabled("categoria");
			else
				CampoEnabled("categoria");
			Cargar_SubCategorias();		
			$('#categoria').change(function(){
				Cargar_SubCategorias();
				});
			},
		error: function(jqXHR, textStatus, errorThrown) {
			MensajeErrorDesconocido('Hubo un problema (Categoria) con la solicitud:', textStatus, errorThrown);
			}
		}); 
	}
	
function Cargar_SubCategorias() {
	var categoria, subcategoria;

	try {
		categoria = $('#categoria option:selected').val();
		subcategoria = $('#subcategoria option:selected').val();
//		subcategoria = $('#misubcategoria').val();
		} 
	catch (e) {
		categoria = 1;
		subcategoria = 1;
		}
//	alert("En Cargar_SubCategorias categoria="+categoria+" subcategoria="+subcategoria)
	$.ajax({
		url: "/tablas/selectsubcategorias",
		data: {categoria: categoria, subcategoria: subcategoria},
		type: 'GET',
		dataType: 'html',
		success: function(response) {
			$('#divsubcategorias').html(response);
			$('#subcategoria option:first').prop('selected', true);
			$("#subcategoria option").each(function(){
				if ($(this).val()===subcategoria) {
					$('#subcategoria option:first').prop('selected', false);
					$(this).attr("selected", "selected");
					}
				});
			if ((ACCION == ELIMINAR_REG) || (ACCION == VER_REG))
				CampoDisabled("subcategoria");
			else
				CampoEnabled("subcategoria");
			},
		error: function(jqXHR, textStatus, errorThrown) {
			MensajeErrorDesconocido('Hubo un problema (SubCategoria) con la solicitud:', textStatus, errorThrown);
			}
		});
};
	

function Cargar_Persona() {

	$('#username').val(rut_a_username());

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
}


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
