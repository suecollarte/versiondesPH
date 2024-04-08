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
                $("#areasalud option:selected").each(function(){
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
    var asalud = allTrim($("#asa"+id).html());
    var aux;
    $('#id').val(allTrim($('#id'+id).html()));
    $('#nombre').val(allTrim($('#nom'+id).html()));

    $("#areasalud option").each(function(){
        $(this).prop("selected", false);
        aux = allTrim($(this).text());
        if (asalud === aux) {
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
    CampoEnabled("areasalud");
    PrepararRegistro(id);

    $("#diagedit").dialog({
        title: "Editar Rubro",
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
    CampoEnabled("areasalud");
    $('#id').val('');

    $("#diagedit").dialog({
        title: "Agregar Rubro",
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
    CampoDisabled("areasalud");
    PrepararRegistro(id);

    $("#diagedit").dialog({
        title: "Eliminar Rubro",
        buttons: [
            {
                text: "Eliminar",
                click: function() {
                    confirmarMensaje("El Rubro será eliminado de la Base de Datos.",EnviaPeticionAjax,ELIMINAR_REG,id);
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
    var nombre = allTrim($('#nombre').val());
    var areasalud = $('#areasalud option:selected').val();
    try {
        $.ajax({
            type: "POST",
            url: "/tablas/rubros/",
            data: {accion: accion, id: id, nombre: nombre, areasalud: areasalud, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
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
