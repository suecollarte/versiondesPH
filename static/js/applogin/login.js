$(document).ready(function(){

	try{
		var f100 = new LiveValidation('rut');
		f100.add(Validate.Presence);
	} catch (e) {};
	try{
		var f101 = new LiveValidation('txtPassword');
		f101.add(Validate.Presence);
	} catch (e) {};

	$('#rut').blur(function(){
		if (validarRUT()) {
			$('#username').val(rut_a_username($('#rut').val()));
			}
		else {
			$('#rut').focus();
			$('#txtPassword').val('');
			}
		});

		/*
	$( "#loginform" ).on( "submit", function( event ) {
		alert( "Handler for `submit` called." );
		event.preventDefault();
		if (CamposValidos())
			if (ValidarUsername())
				$( "#loginform" ).trigger( "submit" )
			else
				return false;
		else
			return false;		
		}); */

	});
//
// ********************************
//          Funciones
// ********************************


function ValidarForm(){
	if (CamposValidos())
		if (ValidarUsername())
			return true;
		else
			return false;
	else
		return false;	
	};
//
// Valida Campos
//	
function CamposValidos(){

	var txtaux = allTrim($('#rut').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe indicar R.U.T. de Usuario",MSG_STOP);
		return false;
		}	
	txtaux = allTrim($('#txtPassword').val());
	if (txtaux == "") 	{
		mostrarMensaje("Debe ingresar Password",MSG_STOP);
		return false;
		}	
	return true;
	};
//
// Valida datos de ingreso y luego debe ir al home
//	
function ValidarUsername(){

	var username = val(rut_a_username($('#username').val()));
	var password = allTrim($('#txtPassword').val());
	try {
		$.ajax({
			type: "POST",
			url: "/applogin/validarlogin/",
			data: {username: username, password: password, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response = "OK"){
					return true;
					}
				else
					mostrarMensaje("Usuario ingresado no Existe<br />",MSG_STOP);
				}
			});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}
	return false;
	};
