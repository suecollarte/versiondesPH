$(document).ready(function(){

    var f100 = new LiveValidation('nombre');
    f100.add(Validate.Presence);    
    //
    // Dialogo para Modificar Registro.
    //	
        $("#diagedit").dialog({
            autoOpen: false,	 
            position: { my: "center", at: "center", of: window },
            height:300,
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
                $("#id").val('');
                $("#nombre").val('');
                $("#rubro option:selected").each(function(){
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
    var aux1 = allTrim($("#rub"+id).html());
    var aux2;
    $('#id').val(allTrim($('#id'+id).html()));
    $('#nombre').val(allTrim($('#nom'+id).html()));

    $("#rubro option").each(function(){
        $(this).prop("selected", false);
        aux2 = allTrim($(this).text());
        if (aux1 === aux2) {
            $(this).attr("selected", "selected");
            }
        });
    };

function CamposValidos(){
    var nombre = allTrim($('#nombre').val());
    if (nombre == "") 	{
        mostrarMensaje("Debe indicar Nombre de la Categoría",MSG_STOP);
        return false;
        }
    return true;
    };
    
function EditarRegistro(id){

	CampoEnReadWrite("nombre");
    CampoEnabled("rubro");
    PrepararRegistro(id);

    $("#diagedit").dialog({
        title: "Editar Categoría",
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
    CampoEnabled("rubro");
    $('#id').val('');

    $("#diagedit").dialog({
        title: "Agregar Categoría",
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
    CampoDisabled("rubro");
    PrepararRegistro(id);

    $("#diagedit").dialog({
        title: "Eliminar Categoría",
        buttons: [
            {
                text: "Eliminar",
                click: function() {
                    confirmarMensaje("La Categoría será eliminada de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
//	$("#diagedit").dialog( "option", "classes.ui-dialog", "alert" );
    $("#diagedit").dialog("open");
    };

function EnviaPeticionAjax(accion,id){
    var nombre = allTrim($('#nombre').val());
    var rubro = $('#rubro option:selected').val();
    try {
        $.ajax({
            type: "POST",
            url: "/tablas/categorias/",
            data: {accion: accion, id: id, nombre: nombre, rubro: rubro, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
            success: function( response ) {
                if (response != ""){
					mostrarMensaje("Cambio realizado con exito",MSG_SUCCESS);
                    $('#datatablediv').html('');
                    $("#datatablediv").html(response);
                    Crear_DataTable();
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
        language: {url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-CL.json'	},
        pagingType: 'full_numbers',
        bJQueryUI: 'true',
        iDisplayLength: '25',
        order: [[1, 'asc']],
        columnDefs: [
            { orderable: false, targets: [0,3] },
            { searchable: false, targets: [0,3] }
            ]
        });
    }