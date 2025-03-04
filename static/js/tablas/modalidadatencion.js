$(document).ready(function(){

	var f102 = new LiveValidation('nombre');
	f102.add(Validate.Presence);

//
// Dialogo para Modificar Registro.
//	
	$("#diagedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height:300,
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
			}
		});
        
	CampoEnReadOnly("id");    
 		
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
	};

function CamposValidos(){
	var nombre = allTrim($('#nombre').val());
	if (nombre == "") 	{
		mostrarMensaje("Debe indicar Modalidad de Atención",MSG_STOP);
		return false;
		}
	return true;
	};
	
function EditarRegistro(id){

	CampoEnReadWrite("nombre");
	PrepararRegistro(id);
	
	$("#diagedit").dialog({
		title: "Editar Modalidad de Atención",
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
	$('#id').val('');

	$("#diagedit").dialog({
		title: "Agregar Modalidad de Atención",
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
	PrepararRegistro(id);

	$("#diagedit").dialog({
		title: "Eliminar Modalidad de Atención",
		buttons: [
			{
				text: "Eliminar",
				click: function() {
					$( this ).dialog("close");
					confirmarMensaje("Modalidad de Atención será eliminada de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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

	try {
		$.ajax({
			type: "POST",
			url: "/tablas/modalidadatencion/",
			data: {accion: accion, id: id, nombre: allTrim($('#nombre').val()), csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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

	new DataTable ('#tablaregs',{
        language: {url: '/static/jquery/datatables.es-CL.json'},
        pagingType: 'full_numbers',
        bJQueryUI: 'true',
        iDisplayLength: '25',
        order: [[1, 'asc']],
        columnDefs: [
            { orderable: false, targets: [2] },
            { searchable: false, targets: [0,2] }
            ]
        });
/*
	$('#tablaregs').DataTable({
        language: {url: '/static/jquery/datatables.es-CL.json'},
		pagingType: 'simple_numbers',
		bJQueryUI: 'true',
		iDisplayLength: '25',
		order: [[1, 'asc']],
		columnDefs: [
			{ orderable: false, targets: [0,2] }
		  ]
		});
*/
	$(".tip").tooltip();
	
	};