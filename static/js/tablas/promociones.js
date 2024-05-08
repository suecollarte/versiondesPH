$(document).ready(function(){

	var f100 = new LiveValidation('nombre');
	f100.add(Validate.Presence);
	var f101 = new LiveValidation('pclave');
	f101.add(Validate.Presence);

	$("#dcto_cantidad").blur(function(){
		$(this).val(number_format($(this).val(),0));
		});	

	$("#dcto_porcentaje").blur(function(){
		$(this).val(number_format($(this).val(),0));
		});	
	
//
// Dialogo para Modificar Registro.
//	
	$("#diagedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height:480,
		width: 500,
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
			$("#id").val('');
			$("#nombre").val('');
			$("#pclave").val('');
			$("#fdesde").val('');
			$("#fhasta").val('');
			$("#dcto_porcentaje").val('');
			$("#dcto_cantidad").val('');
			}
		});
		
	Crear_DataTable(); 

	});
//
// ********************************
//          Funciones
// ********************************
//
function PrepararRegistro(id){
	$('#id').val(allTrim($('#id'+id).html()));
	$('#nombre').val(allTrim($('#nom'+id).html()));
	$('#pclave').val(allTrim($('#pcl'+id).html()));
	$('#fdesde').val(allTrim($('#fin'+id).html()));
	$('#fhasta').val(allTrim($('#fte'+id).html()));
	$('#dcto_porcentaje').val(allTrim($('#dc1'+id).html()));
	$('#dcto_cantidad').val(allTrim($('#dc2'+id).html()));
	};

function CamposValidos(){
	var txtaux = allTrim($('#nombre').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Nombre de la Promoción",MSG_STOP);
		return false;
		}
	txtaux = allTrim($('#pclave').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Palabra Clave de la Promoción",MSG_STOP);
		return false;
		}
	var aux1 = allTrim($('#dcto_porcentaje').val());
	var aux2 = allTrim($('#dcto_cantidad').val());
	if ((aux1 == "") && (aux2 == "")) 	{
		mostrarMensaje("Debe indicar Porcentaje o Cantidad a descontar",MSG_STOP);
		return false;
		}
	else {
		if (aux1 == "")	{
			if (validaInputFloat("#dcto_cantidad","Cantidad a descontar")) 
				$("#dcto_cantidad").val(number_format($("#dcto_cantidad").val(),0));
			else
				return false;
			}
		else{
			if (validaInputFloat("#dcto_porcentaje","Porcentaje a descontar")) 
				$("#dcto_porcentaje").val(number_format($("#dcto_porcentaje").val(),0));
			else
				return false;
			}
		}
	return true;
	};
	
function EditarRegistro(id){

	CampoEnReadWrite("nombre");
	CampoEnReadWrite("pclave");
	PrepararRegistro(id);
	
	$("#diagedit").dialog({
		title: "Editar Promoción",
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

	CampoEnReadWrite("nombre");
	CampoEnReadWrite("pclave");
	$('#id').val('');

	$("#diagedit").dialog({
		title: "Agregar Promoción",
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
	
function BorrarRegistro(id){
	
	CampoEnReadOnly("nombre");
	CampoEnReadOnly("pclave");

	PrepararRegistro(id);

	$("#diagedit").dialog({
		title: "Eliminar Promoción",
		buttons: [
			{
				text: "Eliminar",
				click: function() {
					$( this ).dialog("close");
					confirmarMensaje("La Promoción será eliminada de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
	var nombre = allTrim($('#nombre').val());
    var fdesde = allTrim($('#fdesde').val());
    var fhasta = allTrim($('#fhasta').val());
    var pclave = allTrim($('#pclave').val());
    var dcto_porcentaje = allTrim($('#dcto_porcentaje').val());
    var dcto_cantidad = allTrim($('#dcto_cantidad').val());
	try {
		$.ajax({
			type: "POST",
			url: "/tablas/promociones/",
			data: {accion: accion, id: id, nombre: nombre, fdesde: fdesde, fhasta: fhasta, pclave: pclave, dcto_porcentaje: dcto_porcentaje, 
				   dcto_cantidad: dcto_cantidad, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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

function Crear_DataTable() {

	$('#tablaregs').DataTable({
        language: {url: '/static/jquery/datatables.es-CL.json'},
		pagingType: 'full_numbers',
		bJQueryUI: 'true',
		iDisplayLength: '25',
		order: [[1, 'asc']],
		columnDefs: [
			{ orderable: false, targets: [0,5,6,7] },
            { searchable: false, targets: [0,7] }
		  ]
		});
	$(".tip").tooltip();
	};
