$(document).ready(function(){

    var f100 = new LiveValidation('nombre');
    f100.add(Validate.Presence);
    var f101 = new LiveValidation('fdesde');
    f101.add(Validate.Presence);
    var f102 = new LiveValidation('fhasta');
    f102.add(Validate.Presence);
    //
    // Dialogo para Modificar Registro.
    //	
    $("#diagedit").dialog({
        autoOpen: false,	 
        position: { my: "center", at: "center", of: window },
        height:300,
        width: 600,
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
            $("#categoria option:selected").prop("selected", false);
            }
        })

    if ($('#categoria').children().length === 0) 
        $("#btnadd").hide();
    else
        $("#btnadd").show();

    Crear_DataTable(); 

    });
//
// ********************************
//          Funciones
// ********************************
//
function PrepararRegistro(id){
    var aux1 = allTrim($("#cat"+id).html());
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
        mostrarMensaje("Debe indicar Nombre de la Subcategoría",MSG_STOP);
        return false;
        }
    return true;
    };
    
function EditarRegistro(id){

    PrepararRegistro(id);
    CampoEnReadWrite("nombre");   
    CampoEnabled("categoria");
    $("#diagedit").dialog({
        title: "Editar SubCategoría",
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

    $('#id').val('');
    CampoEnReadWrite("nombre");  
    CampoEnabled("categoria");
    $("#diagedit").dialog({
        title: "Agregar SubCategoría",
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
   
    PrepararRegistro(id);
    CampoEnReadOnly("nombre");
    CampoDisabled("categoria");
    $("#diagedit").dialog({
        title: "Eliminar SubCategoría",
        buttons: [
            {
                text: "Eliminar",
                click: function() {
                    confirmarMensaje("SubCategoría será eliminada de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
    var categoria = $('#categoria option:selected').val();
    var nombre = allTrim($('#nombre').val());

    try {
        $.ajax({
            type: "POST",
            url: "/tablas/subcategorias/",
            data: {accion: accion, id: id, nombre: nombre, categoria: categoria, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
            { orderable: false, targets: [0,4] },
            { searchable: false, targets: [0,4] }
            ]
        });
    }
    