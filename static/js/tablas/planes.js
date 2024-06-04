$(document).ready(function(){

	var f100 = new LiveValidation('nombre');
	f100.add(Validate.Presence);
	var f101 = new LiveValidation('valor');
	f101.add(Validate.Presence);

	$("#valor").blur(function(){
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
			$("#fdesde").val('');
			$("#fhasta").val('');
			$("#valor").val('');
			$("#estado").prop("selectedIndex", 1);
			$("#periodicidad").prop("selectedIndex", 2);
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
	$('#fdesde').val(allTrim($('#fin'+id).html()));
	$('#fhasta').val(allTrim($('#fte'+id).html()));
	$('#valor').val(allTrim($('#val'+id).html()));
	$("#periodicidad").prop("selectedIndex", $('#perid'+id).val());
	$("#estado").prop("selectedIndex", $('#estid'+id).val());
	};

function CamposValidos(){
	var txtaux = allTrim($('#nombre').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Nombre del Plan",MSG_STOP);
		return false;
		}
	txtaux = allTrim($('#fdesde').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Fecha de Inicio del Plan",MSG_STOP);
		return false;
		}
	txtaux = allTrim($('#fhasta').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Fecha de Término del Plan",MSG_STOP);
		return false;
		}
	if (!validarFechas(allTrim($('#fdesde').val()),allTrim($('#fhasta').val())))	{
		mostrarMensaje("Fecha de Término debe ser posterior a Fecha de Inicio",MSG_STOP);
		return false;
		}
	txtaux = allTrim($('#valor').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar Valor del Plan",MSG_STOP);
		return false;
		}
	else {
		if (validaInputFloat("#valor","Valor del Plan")) 
			$("#valor").val(number_format($("#valor").val(),0));
		else
			return false;
		}
	return true;
	};
	
function EditarRegistro(id){

	CampoEnReadWrite("nombre");
	CampoEnReadWrite("fdesde");
	CampoEnReadWrite("fhasta");
	CampoEnReadWrite("valor");
	CampoEnabled("periodicidad");
	CampoEnabled("estado");

	PrepararRegistro(id);
	
	$("#diagedit").dialog({
		title: "Editar Plan",
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
	CampoEnReadWrite("fdesde");
	CampoEnReadWrite("fhasta");
	CampoEnReadWrite("valor");
	CampoEnabled("periodicidad");
	CampoEnabled("estado");
	$("#estado").prop("selectedIndex", 1);
	$("#periodicidad").prop("selectedIndex", 2);
	$('#id').val('');

	$("#diagedit").dialog({
		title: "Agregar Plan",
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
	CampoEnReadOnly("nombre");
	CampoEnReadOnly("fdesde");
	CampoEnReadOnly("fhasta");
	CampoEnReadOnly("valor");
	CampoDisabled("periodicidad");
	CampoDisabled("estado");

	PrepararRegistro(id);

	$("#diagedit").dialog({
		title: "Eliminar Plan",
		buttons: [
			{
				text: "Eliminar",
				click: function() {
					$( this ).dialog("close");
					confirmarMensaje("El Plan será eliminado de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
    var valor = allTrim($('#valor').val());
	var periodicidad = $('#periodicidad option:selected').val();
	var estado = $('#estado option:selected').val();
	try {
		$.ajax({
			type: "POST",
			url: "/tablas/planes/",
			data: {accion: accion, id: id, nombre: nombre, fdesde: fdesde, fhasta: fhasta, valor: valor, periodicidad: periodicidad, 
					estado: estado, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
			{ orderable: false, targets: [0,5,6,7] },
            { searchable: false, targets: [0,7] }
            ]
        });
/*		
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
*/
	$(".tip").tooltip();

	};
