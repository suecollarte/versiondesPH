$(document).ready(function(){

	CampoEnReadOnly("rut");
	CampoEnReadOnly("nombre");
	CampoEnReadOnly("email");
	CampoEnReadOnly("telefono");

//
// Dialogo para Modificar Registro.
//	
	$("#diagedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height:400,
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
			$("#divmsg1").text("Atención:");  

			},
		close: function() {
			$("#rut").val('');
			$("#nombre").val('');
			$("#email").val('');
			$("#telefono").val('');
			$("#divmsg1").text('');  
			$("#divmsg2").text('');  			
			}
	});

	Crear_DataTable(); 
	    
});
//
// ********************************
//          Funciones
// ********************************

function CargarDatos(id){
	$("#rut").val($("#rut"+id).html());
	$("#nombre").val($("#nom"+id).html());	 
	$("#email").val($("#ema"+id).html());	 
	$("#telefono").val($("#fon"+id).html());	
	}
//
// Abre Modal para Reenviar Mail de registro
//		
function RenviarMail(id){

	$("#diagedit").dialog({
		title: "Reenviar Correo A",
		buttons: [
			{
				text: "Confirmar",
				click: function() {
					EnviarMail(id);
					$( this ).dialog("close");	
					},
				class:"ui-corner-all", style:"color:Green" 
			},
			{
				text: "Cancelar",
				click: function() {
					$( this ).dialog("close");
					},
				class:"ui-corner-all", style:"color:Black" 
			}
			]
	  });

	CargarDatos(id);
	$("#divmsg1").text("Atención:");  
	$("#divmsg2").text("Se reenviará mail al Usuario o Especialista para continuar con el proceso.");  
	$("#diagedit").dialog("open");
	
	};
//
// Reenvia primer mail al usuario o especialista
//	
function EnviarMail(id){

	$('#loader-msg-wait').show();

	try {
		$.ajax({
			type: "POST",
			dataType: 'json',			
			url: "/usuarios/reenvia_primermail/",
			data: {id: id, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
//				alert("status="+response['status']+" "+response['message']);
				if (response['status'] == 200){
					mostrarMensaje(response['message'],MSG_SUCCESS);
					}
				else
					mostrarMensaje(response['message'],MSG_ERROR);
				},
			error: function(jqXHR, textStatus, errorThrown) {
				MensajeErrorDesconocido(textStatus);
				},
			complete: function() {
				}
			});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}
	$('#loader-msg-wait').hide();
	};		
//
// Abre Modal para Eliminar registro de solicitud de suscripcion
//		
function CancelarRegistro(id){

	$("#diagedit").dialog({
		title: "Cancelar Registro",
		buttons: [
			{
				text: "Confirmar",
				click: function() {
					EliminarRegistro(id);
					$( this ).dialog("close");	
					},
				class:"ui-corner-all", style:"color:Green" 
			},
			{
				text: "Cancelar",
				click: function() {
					$( this ).dialog("close");
					},
				class:"ui-corner-all", style:"color:Black" 
			}
			]
	  });

	CargarDatos(id);
	$("#divmsg1").text("Atención:");  
	$("#divmsg2").text("El Registro será Eliminado y la persona deberá iniciar uno nuevo.");  
	$("#diagedit").dialog("open");
	};
//
// Elimina la solicitud de suscripcion del Especialista
//	
function EliminarRegistro(id){
	var solicita = 	$("#solicita").val();

	$('#loader-msg-wait').show();
	try {
		$.ajax({
			type: "POST",
			dataType: 'html',			
			url: "/usuarios/cancelaregistro_pendiente/",
			data: {id: id, solicita: solicita, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response != ""){
					$('#datatablediv').html('');
					$("#datatablediv").html(response);
					Crear_DataTable();
					mostrarMensaje("Cambio realizado con exito",MSG_SUCCESS);
					}
				else
					mostrarMensaje("ERROR DESCONOCIDO<br />Cambio NO realizado",MSG_WARNING);
				},
			error: function(jqXHR, textStatus, errorThrown) {
				MensajeErrorDesconocido(textStatus);
				},
			complete: function() {
				}
			});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}
	$('#loader-msg-wait').hide();
	};
//
// Crea DataTable para una lista de registros a recibir via ajax
//
function Crear_DataTable() {

	new DataTable ('#tablaregs',{
        language: {url: '/static/jquery/datatables.es-CL.json'},
        pagingType: 'full_numbers',
        bJQueryUI: 'true',
        iDisplayLength: '25',
        order: [[2, 'asc']],
        columnDefs: [
			{ orderable: false, targets: [0,4,5] },
			{ searchable: false, targets: [5] }
            ]
        });

	$(".tip").tooltip();

	};

