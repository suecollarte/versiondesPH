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
            $("#region option:selected").prop("selected", false);
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
        mostrarMensaje("Debe indicar Nombre de Comuna",MSG_STOP);
        return false;
        }
    return true;
    };
    
function EditarRegistro(id){

	CampoEnReadWrite("nombre");
    CampoEnabled("region");
    PrepararRegistro(id);

    $("#diagedit").dialog({
        title: "Editar Comuna",
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
    CampoEnabled("region");
    $('#id').val('');

    $("#diagedit").dialog({
        title: "Agregar Comuna",
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
    CampoDisabled("region");
    PrepararRegistro(id);

    $("#diagedit").dialog({
        title: "Eliminar Comuna",
        buttons: [
            {
                text: "Eliminar",
                click: function() {
                    $( this ).dialog("close");
                    confirmarMensaje("La Comuna será eliminada de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
            url: "/tablas/comunas/",
            data: {accion: accion, id: id, nombre: allTrim($('#nombre').val()), region: allTrim($('#region').val()), csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
    };