$(document).ready(function(){

    var f100 = new LiveValidation('nombre');
    f100.add(Validate.Presence);    
    //
    // Dialogo para Modificar Registro.
    //	
    $("#diagedit").dialog({
        autoOpen: false,	 
        position: { my: "center", at: "center", of: window },
        height:380,
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
            $("#region option:selected").each(function(){
                $(this).removeAttr("selected");
                });
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
    var regciudad = allTrim($("#reg"+id).html());
    var reglista;
    $('#id').val(allTrim($('#id'+id).html()));
    $('#nombre').val(allTrim($('#nom'+id).html()));

    $("#region option").each(function(){
        $(this).prop("selected", false);
        reglista = allTrim($(this).text());
        if (regciudad === reglista) {
            $(this).attr("selected", "selected");
            }
        });
    };

function CamposValidos(){
    var nombre = allTrim($('#nombre').val());
    if (nombre == "") 	{
        mostrarMensaje("Debe indicar Nombre de Ciudad",MSG_STOP);
        return false;
        }
    return true;
    };
    
function EditarRegistro(id){

	CampoEnReadWrite("nombre");
    CampoEnabled("region");
    PrepararRegistro(id);

    $("#diagedit").dialog({
        title: "Editar Ciudad",
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
//	$("#diagedit").dialog( "option", "classes.ui-dialog", "highlight" );
    $("#diagedit").dialog("open");
    };

function AgregarRegistro(){

	CampoEnReadWrite("nombre");
    CampoEnabled("region");
    $('#id').val('');

    $("#diagedit").dialog({
        title: "Agregar Ciudad",
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
            },
        ]
        });

    $("#diagedit").dialog("open");
    };
    
function BorrarRegistro(id){
    
    CampoEnReadOnly("nombre");
    CampoDisabled("region");
    PrepararRegistro(id);

    $("#diagedit").dialog({
        title: "Eliminar Ciudad",
        buttons: [
            {
                text: "Eliminar",
                click: function() {
                    $( this ).dialog("close");
                    confirmarMensaje("La Ciudad será eliminada de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
    var region = $('#region option:selected').val();
    try {
        $.ajax({
            type: "POST",
            url: "/tablas/ciudades/",
            data: {accion: accion, id: id, nombre: nombre, region: region, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
        iDisplayLength: '50',
        order: [[1, 'asc']],
        columnDefs: [
            { orderable: false, targets: [3] },
            { searchable: false, targets: [3] }
            ]
        });
    $(".tip").tooltip();
    }