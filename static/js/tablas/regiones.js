$(document).ready(function(){

	var f100 = new LiveValidation('numero');
	f100.add(Validate.Presence);
	var f102 = new LiveValidation('nombre');
	f102.add(Validate.Presence);

//
// Dialogo para Modificar Registro.
//	
	$("#diagedit").dialog({
		autoOpen: false,	 
		position: { my: "center", at: "center", of: window },
		height:380,
		width: 500,
		resizable: false,
		fluid: true, 
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
			fluidDialog();
			},
		close: function() {
			$("#id").val('');
			$("#numero").val('');
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
	$('#numero').val(allTrim($('#num'+id).html()));
	$('#nombre').val(allTrim($('#nom'+id).html()));
	};

function CamposValidos(){
	var numero = allTrim($('#numero').val());
	var nombre = allTrim($('#nombre').val());
	if (numero == "") 	{
		mostrarMensaje("Debe indicar Número de Región",MSG_STOP);
		return false;
		}
	if (nombre == "") 	{
		mostrarMensaje("Debe indicar Nombre de Región",MSG_STOP);
		return false;
		}
	return true;
	};
	
function EditarRegistro(id){

	CampoEnReadWrite("numero");
	CampoEnReadWrite("nombre");
	PrepararRegistro(id);
	
	$("#diagedit").dialog({
		title: "Editar Región",
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

	CampoEnReadWrite("numero");
	CampoEnReadWrite("nombre");
	$('#id').val('');

	$("#diagedit").dialog({
		title: "Agregar Región",
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
	
	CampoEnReadOnly("numero");
	CampoEnReadOnly("nombre");

	PrepararRegistro(id);

	$("#diagedit").dialog({
		title: "Eliminar Región",
		buttons: [
			{
				text: "Eliminar",
				click: function() {
					$( this ).dialog("close");
					confirmarMensaje("La Región será eliminada de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
			url: "/tablas/regiones/",
			data: {accion: accion, id: id, numero: allTrim($('#numero').val()), nombre: allTrim($('#nombre').val()), csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
        order: [[2, 'asc']],
        columnDefs: [
            { orderable: false, targets: [3] },
            { searchable: false, targets: [0,3] }
            ],
/*		layout: {
			topStart: {
				buttons: [
					'copy', 'excel', 'pdf'
					]
				}
			}
*/
        });
/*		
	$('#tablaregs').DataTable({
        language: {url: '/static/jquery/datatables.es-CL.json'},
		pagingType: 'simple_numbers',
		bJQueryUI: 'true',
		iDisplayLength: '25',
		order: [[2, 'asc']],
		columnDefs: [
			{ orderable: false, targets: [3] },
			{ searchable: false, targets: [3] }
		  ]
		});
*/
	$(".tip").tooltip();
	};
	