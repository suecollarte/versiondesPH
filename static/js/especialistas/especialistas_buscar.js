$(document).ready(function(){

	$('#categoria').on("change", function(){
		Cargar_SubEspecialidad();
	});	

	$('#region').on("change", function(){
		Cargar_Comunas();
		});	

	Mostrar_Subcategoria();

	});
//
// ********************************
//          Funciones
// ********************************
//
// Actualiza lista de Subespecialidades, dependiendo de la especialidad elegida
//	
async function Cargar_SubEspecialidad() {

    await EnviarAjaxSubEspecialidad()
        .then(function(data) {
            $("#divsubcategorias").html(data); 
			Mostrar_Subcategoria();
            })
        .catch(function(error) {
            MensajeErrorDesconocido(error);
            });
    }

function EnviarAjaxSubEspecialidad() {
    return new Promise(function(resolve, reject) {
            var categoria;
            try {
                categoria = $('#categoria option:selected').val();
            } catch (e) {
                categoria = 0;
                }
            $.ajax({
                method: "POST",
                dataType:"html",
                url: "/tablas/selectsubcategorias",
                data: {categoria: categoria,estilo: 1, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
                success: function(data) {
                    resolve(data);
                    },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    }
//
// Actualiza lista de Comunas, dependiendo de la region elegida
//
function Cargar_Comunas() {
	var region = $('#region option:selected').val();

	$.ajax({
		url: "/tablas/selectcomunas",
		data: {region: region, comuna: 0, estilo: 1},
		type: 'GET',
		dataType: 'html',
		success: function(response) {
			$('#divcomunas').html(response);
			},
		error: function(jqXHR, textStatus, errorThrown) {
			MensajeErrorDesconocido('Hubo un problema(1) con la solicitud:', textStatus, errorThrown);
			}
		}); 
	};
//
// Si lista de subcategorias esta en 0 la esconde
//
function Mostrar_Subcategoria() {
	var subcategoria = $('#subcategoria'); 
	
	if (subcategoria.children('option').length === 0)  {
		$('#divsubcategoriastit').hide();
	} else {
		$('#divsubcategoriastit').show();
		}
	};
