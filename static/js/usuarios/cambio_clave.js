$(document).ready(function(){
	
	if ($('#cclave').val() == 1)
		$('#modalcclave').modal('show');
	else 
		$('#modalcclave').modal('hide');

	$("#btncclavesfin").hide();

	$("#btncclavesfin").click(function (){
		$('#modalcclave').modal('hide');
		});

	$("#claveactual").blur(function (){  
		if ($('#claveactual').val() == "") {
			enviarMsgModalcClave("Falta Contraseña","Debe Indicar Contraseña Actual");
			efectoTemblor($('#modalcclave'));
			}
		else {
			ValidarLogin();		
			limpiarMsgModalcClave();
			}
		});
	
	$("#nuevaclave").blur(function (){  
		if ($('#nuevaclave').val() == "") {
			enviarMsgModalcClave("Falta Contraseña","Debe Indicar Nueva Contraseña");
			efectoTemblor($('#modalcclave'));
			}
		else {
			limpiarMsgModalcClave();
			}
		});

	$('#nuevaclave').keyup(function () {
		$('#strengthMessage').html(checkStrength($('#nuevaclave').val()));
		})

	$("#nuevaclaveconf").blur(function (){  
		if ($('#nuevaclaveconf').val() != $('#nuevaclave').val()) {
			enviarMsgModalcClave("Contraseñas","Nueva Contraseña no coincide");
			efectoTemblor($('#modalcclave'));
			}
		else {
			limpiarMsgModalcClave();
			}
		});
	
	$("#btncclavesok").click(function (){    
		var claveactual = $('#claveactual').val();
		var nuevaclave1 = $('#nuevaclave').val();
		var nuevaclave2 = $('#nuevaclaveconf').val();

		if (claveactual == "") {
			enviarMsgModalcClave("Debe Indicar Contraseña Actual");
			efectoTemblor($('#modalcclave'));
			}
		else 
			if (nuevaclave1 == "") {
				enviarMsgModalcClave("Debe Indicar Nueva Contraseña");
				efectoTemblor($('#modalcclave'));
				}
			else
				if (nuevaclave2 == "") {
					enviarMsgModalcClave("Debe Confirmar Nueva Contraseña");
					efectoTemblor($('#modalcclave'));
					}
				else
					if (nuevaclave1 != nuevaclave2) {
						enviarMsgModalcClave("Nueva Contraseña no coincide");
						efectoTemblor($('#modalcclave'));
						}
					else 
						if (nuevaclave1.length < 8) {
							enviarMsgModalcClave("Contraseña nueva debe tener al menos 8 caracteres");
							efectoTemblor($('#modalcclave'));
							}
						else
							ConfirmaCambioClave();
		});

	$("#btncclavesko").click(function (){
		if ($('#cclave').val() == 1) {
			window.location.href = "/home";
			}
		else 
			$('#modalcclave').modal('hide');
		});

	$("#closeloginmodal").click(function (){
		if ($('#cclave').val() == 1) {
			window.location.href = "/home";
			}
		else 
			$('#modalcclave').modal('hide');
		});

	$('#modalcclave').on('show.bs.modal', function () {
		$("#claveactual").val('');
		$("#nuevaclave").val('');
		$("#nuevaclaveconf").val('');
		limpiarMsgModalcClave();
		$(document).on('keydown', function(event) {
			if (event.key === "Escape" || event.key === "Esc") {
				if ($('#cclave').val() == "1")
					window.location.href = "/home";
				else 
					$('#modalcclave').modal('hide');
				}
			});
		});

	$('#toggleclaveactual').click(function() {
		var passwordField = $('#claveactual');
		var passwordFieldType = passwordField.attr('type');
		
		if (passwordFieldType === 'password') {
			passwordField.attr('type', 'text');
			$(this).find('i').removeClass('fa-eye').addClass('fa-eye-slash');
			setTimeout(function() {
				passwordField.attr('type', 'password');
				$('#toggleclaveactual').find('i').removeClass('fa-eye-slash').addClass('fa-eye');
				}, 4000);
			} 
/*		else {
			passwordField.attr('type', 'password');
			$(this).find('i').removeClass('fa-eye-slash').addClass('fa-eye');
			}
*/
		});


	$('#toggleclavenueva').click(function() {
		var passwordField = $('#nuevaclave');
		var passwordFieldType = passwordField.attr('type');
		
		if (passwordFieldType === 'password') {
			passwordField.attr('type', 'text');
			$(this).find('i').removeClass('fa-eye').addClass('fa-eye-slash');
			setTimeout(function() {
				passwordField.attr('type', 'password');
				$('#toggleclavenueva').find('i').removeClass('fa-eye-slash').addClass('fa-eye');
				}, 4000);
			} 
/*		else {
			passwordField.attr('type', 'password');
			$(this).find('i').removeClass('fa-eye-slash').addClass('fa-eye');
			}
*/
		});



	});
//
// ********************************
//          Funciones
// ********************************
//
//
function ValidarLogin() {
	var username = $('#cclaveusername').val();
	var password = $('#claveactual').val();

	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/validarlogin/",
			dataType: 'json',
			data: {username: username, password: password, csrfmiddlewaretoken:  $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response['status'] != 200){
					enviarMsgModalcClave('Error('+response['status']+'):',response['message']);
					efectoTemblor($('#modalcclave'));
					}
				},
			error: function(jqXHR, textStatus, errorThrown) {
				enviarMsgModalcClave(textStatus);
				}				
			});
		} 
	catch (error) {
		enviarMsgModalcClave(error);
		}
	}

function ConfirmaCambioClave() {
	var username = $('#cclaveusername').val();
	var oldpassword = $('#claveactual').val();
	var newpassword = $('#nuevaclave').val();

	$('#loader-msg-wait').show();
	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/confirmacambioclave/",
			dataType: 'json',
			data: {username: username,oldpassword: oldpassword, newpassword: newpassword, csrfmiddlewaretoken:  $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response['status'] == 200){
					$("#btncclavesok").hide();
					$("#btncclavesko").hide();
					$("#btncclavesfin").show();
					enviarMsgModalcClave(response['message']);
					}
				else{
					enviarMsgModalcClave('Error('+response['status']+'):',response['message']);
					efectoTemblor($('#modalcclave'));
					}
				},
			error: function(jqXHR, textStatus, errorThrown) {
				enviarMsgModalcClave(textStatus);
				},
			complete: function() {
				$('#loader-msg-wait').hide();
				}				
			});
		} 
	catch (error) {
		enviarMsgModalcClave(error);
		}
	}

	
function limpiarMsgModalcClave() {  

	$("#divmsgcclave1").text('');
	$("#divmsgcclave2").text(''); 
	$("#msgmodalcclave").hide();
	};

	
function enviarMsgModalcClave(msg1,msg2="") {

	$("#divmsgcclave1").text(msg1);
	$("#divmsgcclave2").text(msg2);  
	$('#msgmodalcclave').show();
	}

