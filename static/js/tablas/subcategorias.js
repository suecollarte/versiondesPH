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
        mostrarMensaje("Debe indicar Nombre de la SubEspecialidad",MSG_STOP);
        return false;
        }
    return true;
    };
    
function EditarRegistro(id){

    PrepararRegistro(id);
    CampoEnReadWrite("nombre");   
    CampoEnabled("categoria");
    $("#diagedit").dialog({
        title: "Editar SubEspecialidad",
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
        title: "Agregar SubEspecialidad",
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
        title: "Eliminar SubEspecialidad",
        buttons: [
            {
                text: "Eliminar",
                click: function() {
                    $( this ).dialog("close");
                    confirmarMensaje("SubEspecialidad será eliminada de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
            { orderable: false, targets: [4] },
            { searchable: false, targets: [0,4] }
            ]
        });
    $(".tip").tooltip();
    };
    