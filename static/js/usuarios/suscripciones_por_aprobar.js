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
			},
		close: function() {
			$("#rut").val('');
			$("#nombre").val('');
			$("#email").val('');
			$("#telefono").val('');
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
	}
//
//  Rechaza el pago de la suscripcion, El usuario debera comenzar de nuevo desde cero
//	
function RechazarSuscripcion(id){

	$("#divmotivo").show();

	$("#diagedit").dialog({
		title: "Rechazar Pago Suscripción",
		buttons: [
			{
				text: "Confirmar",
				click: function() {
					$( this ).dialog("close");	
					CambiarEstadoSuscripcion(id,0);
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
	$("#diagedit").dialog("open");
	
	};
//
// Se acepta el pago de la suscripcion, El usuario debera comenzar de nuevo desde cero
//	
function AprobarSuscripcion(id){

	$("#divmotivo").hide();

	$("#diagedit").dialog({
		title: "Aprobar Pago Suscripción",
		buttons: [
			{
				text: "Confirmar",
				click: function() {
					$( this ).dialog("close");	
					CambiarEstadoSuscripcion(id,1);
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
	$("#diagedit").dialog("open");
	

};
//
// Actualiza via ajax el estado de la persona (usuario)
//	
function CambiarEstadoSuscripcion(id,estado){

	var motivo = $("#motivo").val();
	try {
		$.ajax({
			async: false,
			type: 'POST',
			dataType: "html",
			url: "/usuarios/suscripciones_cambiar_estado/",
			data: {id: id, estado: estado, motivo: motivo, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
// Abre Modal para Reenviar Mail de registro
//		
function RenviarMail(id){

	$("#divmotivo").hide();

	$("#diagedit").dialog({
		title: "Enviar URL Pago",
		buttons: [
			{
				text: "Confirmar",
				click: function() {
					$( this ).dialog("close");	
					EnviarMail(id);
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
	$("#diagedit").dialog("open");
	
	};
//
// Reenvia mail con url de pago
//
function EnviarMail(id){

	try {
		$.ajax({
			type: "POST",
			dataType: 'json',			
			url: "/usuarios/reenvia_mail_url_pago/",
			data: {id: id, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
//				alert("status="+response['status']+" "+response['message']);
				if (response['status'] == 200){
					mostrarMensaje(response['message'],MSG_SUCCESS);
					}
				else
					mostrarMensaje(response['message'],MSG_ERROR);
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

