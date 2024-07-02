$(document).ready(function(){

	$('#rutcontacto').blur(function(){
		if (validarRUT('rutcontacto',false)) {
			$('#rutcontacto2').val(rut_sin_formato($('#rutcontacto').val()));
			}
		else {
			enviarMsgModalContacto("R.U.T. Inválido","Debe indicar R.U.T. Válido");
			efectoTemblor($('#ContactoModal'));
			}
		});
		
	$("#hidemsgcontacto").click(function (){    
		limpiarMsgModalContacto();
		limpiarCamposModalContacto();
		});

	$("#btncerrarcontacto").click(function (){    
		limpiarMsgModalContacto();
		limpiarCamposModalContacto();
		});

	$("#btcontacto").click(function (){  
		limpiarMsgModalContacto();
		if (CamposValidosModalContacto()) {
			EnviarFormularioContacto();
			}
		else
			efectoTemblor($('#ContactoModal'));		
		});

	});
//
// ********************************
//          Funciones
// ********************************
//
function CamposValidosModalContacto(){
	var txtaux = allTrim($('#rutcontacto').val());

	if (txtaux == "") 	{
		enviarMsgModalContacto("Error en Formulario","Debe indicar R.U.T.");
		$('#rutcontacto2').val('');
		return false;
		}
	txtaux = allTrim($('#rutcontacto2').val());
	if (txtaux == "") 	{
		enviarMsgModalContacto("Error en Formulario","Verifique el R.U.T por favor");
		return false;
		}
	txtaux = allTrim($('#nombrecontacto').val());
	if (txtaux == "") 	{
		enviarMsgModalContacto("Error en Formulario","Debe indicar Nombre(s)");
		return false;
		}
	txtaux = allTrim($('#apellidocontacto').val());
	if (txtaux == "") 	{
		enviarMsgModalContacto("Error en Formulario","Debe indicar Apellido(s)");
		return false;
		}
	txtaux = allTrim($('#mailcontacto').val());
	if (txtaux == "") 	{
		enviarMsgModalContacto("Error en Formulario","Debe indicar Correo Electrónico");
		return false;
		}
	if (!validarCorreo(txtaux)) {
		enviarMsgModalContacto("Error en Formulario","Correo Electrónico ingresado es inválido");
		return false;
		}
	txtaux = allTrim($('#asuntocontacto').val());
	if (txtaux == "") 	{
		enviarMsgModalContacto("Error en Formulario","Debe indicar Asunto");
		return false;
		}
	txtaux = allTrim($('#msgcontacto').val());
	if (txtaux == "") 	{
		enviarMsgModalContacto("Error en Formulario","Debe escribir un Mensaje");
		return false;
		}
	return true;
	};

function EnviarFormularioContacto(){
	var rut = allTrim($('#rutcontacto').val());
	var nombre = allTrim($('#nombrecontacto').val());
	var apellido = allTrim($('#apellidocontacto').val());
	var mail = allTrim($('#mailcontacto').val());
	var asunto = allTrim($('#asuntocontacto').val());
	var msg = allTrim($('#msgcontacto').val());

	$('#ContactoModal').modal('hide');
	try {
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: "/usuarios/enviarcontacto/",
			data: {rut: rut, nombre: nombre, apellido: apellido, mail: mail, asunto: asunto, msg: msg, 
					csrfmiddlewaretoken:  $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response['status'] == 200){
					mostrarMensaje(response['message1'],MSG_SUCCESS);
					}
				else{
					mostrarMensaje(response['message1']+'<br />'+response['message2']+' ('+response['status']+')',MSG_WARNING);
					}

				},
			error: function(jqXHR, textStatus, errorThrown) {
				enviarMsgModalContacto(textStatus);
				}				
			});
		} 
		catch (error) {
			enviarMsgModalContacto(error);
			}


	};

function limpiarCamposModalContacto() {  
/*	$('#rutcontacto').val('');
	$('#rutcontacto2').val('');	
	$('#nombrecontacto').val('');
	$('#apellidocontacto').val('');
	$('#mailcontacto').val('');
*/
	$('#asuntocontacto').val('');
	$('#msgcontacto').val('');
	};

function limpiarMsgModalContacto() {  
	$("#contacterror1").text('');
	$("#contacterror2").text(''); 
	$("#divcontacterror").hide();
	};

function enviarMsgModalContacto(msg1,msg2="") {
	$("#contacterror1").text(msg1);
	$("#contacterror2").text(msg2);  
	$('#divcontacterror').show();
	}
	
	