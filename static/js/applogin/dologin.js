$(document).ready(function(){

	$('#rutuser').blur(function(){
		if (validarRUT('rutuser',false)) {
			$('#username').val(rut_a_username($('#rutuser').val()));
			}
		else {
			$('#username').val('');
			efectoTemblor($('#divmodal'));
			errorLogin("R.U.T. Inválido","Debe indicar R.U.T. Válido");
			}
		});
		
	$("#hide_msg").click(function (){    
		limpiarMsgError();
		});

	$('#loginform').on('submit',function(event) {
		var username = $('#username').val();
		var password = allTrim($('#txtPassword').val());
		event.preventDefault();
		limpiarMsgError();
//		alert("Submit RUT="+ $('#rutuser').val()+" Clave="+ $('#txtPassword').val()+" Username="+ $('#username').val());
		if (username == "") {
			errorLogin("Falta R.U.T.","Debe Indicar R.U.T.");
			efectoTemblor($('#divmodal'));
			}
		else if (password == "") {
			errorLogin("Falta Contraseña","Debe ingresar Contraseña");
			efectoTemblor($('#divmodal'));
			}
		else {
			try {
				$.ajax({
					type: "POST",
					url: "/applogin/dologin/",
					data: {username: username, password: password, csrfmiddlewaretoken:  $("input[name=csrfmiddlewaretoken]").val()},
					success: function( response ) {
//						alert("script="+response['home']);
						if (response['home'] != ""){
							$('#loginform').attr('action', response['home']);
							var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
							if (!$("input[name=csrfmiddlewaretoken]").length) {
								$('#loginform').append('<input type="hidden" name="csrfmiddlewaretoken" value="' + csrfToken + '">');
								} 
							else {
								$("input[name=csrfmiddlewaretoken]").val(csrfToken);
								}
							$('#LoginModal').hide();
							$('#loginform')[0].submit();
//							$('#loginform').off('submit').submit();
}
						else{
							efectoTemblor($('#divmodal'));
							errorLogin(response['message1'],response['message2']);
							}
						},
					error: function(jqXHR, textStatus, errorThrown) {
						event.preventDefault();
						errorLogin(error);
						}				
					});
				} 
				catch (error) {
					errorLogin(error);
					}
			}
		});

	});
//
// ********************************
//          Funciones
// ********************************
//
// Valida datos de ingreso y si todo esta bien da login al usuario
//	

function errorLogin(msg1,msg2="") {

	$("#error1").text(msg1);
	$("#error2").text(msg2);  
	$('#login_error_div').show();
    }

function efectoTemblor() {
	const $div = $('#divmodal');
	const interval = 80;  // Duración de cada movimiento (en milisegundos)
	const distance = 10;   // Distancia que se mueve el div
	const times = 4;       // Número de veces que se mueve el div (izquierda y derecha)

	for (let i = 0; i < times; i++) {
		$div.animate({ left: -distance }, interval)
			.animate({ left: distance }, interval);
		}
	$div.animate({ left: 0 }, interval);  // Devolver el div a su posición original
	
	}

function limpiarMsgError() {  
	$("#error1").text('');
	$("#error2").text(''); 
	$("#login_error_div").hide();
	};


	/*
	function doLogin(){
		alert("aca");
		var username = val(rut_a_username($('#username').val()));
		var password = allTrim($('#txtPassword').val());
		if (username == "") {
			errorLogin("Debe Indicar R.U.T.");
			$('#username').val('');
			}
		else if (password == "") {
			errorLogin("Debe ingresar Contraseña");
			}
		else {
			try {
				$.ajax({
					type: "POST",
					url: "/applogin/dologin/",
					data: {username: username, password: password, csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
					success: function( response ) {
						alert("script="+response['home']);
						if (response['code'] === 401){
							$('#loginform').attr('action', response['home']);
							$('#LoginModal').hide();
							return true;
							}
						else{
							efectoTemblor($('#divmodal'));
							$('#login_error_div').show();
							$("#error1").text(response['message1']+' :');
							$("#error2").text(response['message2']);  
							}
						},
					error: function(jqXHR, textStatus, errorThrown) {
						MensajeErrorDesconocido(error)
						}				
					});
				} catch (error) {
					MensajeErrorDesconocido(error);
					}
			}
		return false;
		};
*/