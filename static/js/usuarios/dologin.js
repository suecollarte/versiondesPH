$(document).ready(function(){

	$('#rutuser').blur(function(){
		if (validarRUT('rutuser',false)) {
			$('#username').val(rut_sin_formato($('#rutuser').val()));
			limpiarMsgModalLogin();
			}
		else {
			$('#username').val('');
			efectoTemblor($('#LoginModal'));
			enviarMsgModalLogin("R.U.T. Inválido","Debe indicar R.U.T. Válido");
			}
		});

	$('#rutoclave').blur(function(){
		if (validarRUT('rutoclave',false)) {
			$('#useroclave').val(rut_sin_formato($('#rutoclave').val()));
			ValidarLogin();
			}
		else {
			$('#useroclave').val('');
			efectoTemblor($('#ModalOlvidoClave'));
			enviarMsgModaloClave("R.U.T. Inválido","Debe indicar R.U.T. Válido");
			}
		});
		
	$("#btnacceso").click(function (){    
		limpiarMsgModalLogin();
		limpiarCamposModalLogin();
		});
	
	$("#hidemsglogin").click(function (){    
		limpiarMsgModalLogin();
		limpiarCamposModalLogin();
		});

	$("#closeloginmodal").click(function (){    
		limpiarMsgModalLogin();
		limpiarCamposModalLogin();
		});

	$("#btnconfirmacclave").click(function (){    
		var username = $('#useroclave').val();
		if (username == "") {
			enviarMsgModaloClave("Falta R.U.T.","Debe Indicar R.U.T.");
			efectoTemblor($('#LoginModal'));
			}
		else {
			ConfirmaCambioClave();
			}
		});

	$("#btncancelacclave").click(function (){    
		$('#ModalOlvidoClave').modal('hide');
		});

	$("#btnfincclave").click(function (){    
		$('#ModalOlvidoClave').modal('hide');
		});

	$('#ModalOlvidoClave').on('show.bs.modal', function () {
		$("#useroclave").val('');
		$("#rutoclave").val('');
		$("#btnconfirmacclave").prop('disabled', true);
		$("#btnfincclave").hide();
		limpiarMsgModaloClave();
		});

	$('#txtPassword').addClass('fa-eye');
	
	$('#togglePassword').click(function() {
		var passwordField = $('#txtPassword');
		var passwordFieldType = passwordField.attr('type');
		
		if (passwordFieldType === 'password') {
			passwordField.attr('type', 'text');
			$(this).find('i').removeClass('fa-eye').addClass('fa-eye-slash');
			setTimeout(function() {
				passwordField.attr('type', 'password');
				$('#togglePassword').find('i').removeClass('fa-eye-slash').addClass('fa-eye');
				}, 3000);
			}	 
/*		else {
			passwordField.attr('type', 'password');
			$(this).find('i').removeClass('fa-eye-slash').addClass('fa-eye');
			} 
			*/
		});


	$('#formlogin').on('submit',function(event) {
		var username = $('#username').val();
		var password = allTrim($('#txtPassword').val());
		event.preventDefault();
		limpiarMsgModalLogin();
		if (username == "") {
			enviarMsgModalLogin("Falta R.U.T.","Debe Indicar R.U.T.");
			efectoTemblor($('#LoginModal'));
			}
		else if (password == "") {
			enviarMsgModalLogin("Falta Contraseña","Debe ingresar Contraseña");
			efectoTemblor($('#LoginModal'));
			}
		else {
			EnviarLogin(username,password);
			}
		});

	});
//
// ********************************
//          Funciones
// ********************************
//
//	
function EnviarLogin(username,password) {
//	alert("Usuario="+username+" Password="+password);
	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/dologin/",
			dataType: 'json',
			data: {username: username, password: password, csrfmiddlewaretoken:  $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response['status'] == 200){
					$('#LoginModal').hide();
					$('#formlogin')[0].submit();
					}
				else{
					enviarMsgModalLogin(response['message1']+'('+response['status']+')',response['message2']);
					efectoTemblor($('#LoginModal'));
					}
				},
			error: function(jqXHR, textStatus, errorThrown) {
				enviarMsgModalLogin(textStatus);
				}				
			});
		} 
	catch (error) {
		enviarMsgModalLogin(error);
		}
	}

function ValidarLogin() {
	var username = $('#useroclave').val();
	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/validarlogin/",
			dataType: 'json',
			data: {username: username, csrfmiddlewaretoken:  $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response['status'] == 200){
					$("#btnconfirmacclave").prop('disabled', false);
					enviarMsgModaloClave("Confirme el envío de mail con nueva contraseña a: ",response['message']);
					}
				else{
					enviarMsgModaloClave('Error('+response['status']+')',response['message']);
					efectoTemblor($('#ModalOlvidoClave'));
					}
				},
			error: function(jqXHR, textStatus, errorThrown) {
				enviarMsgModaloClave(textStatus);
				}				
			});
		} 
	catch (error) {
		enviarMsgModaloClave(error);
		}
	}

function ConfirmaCambioClave() {
	var username = $('#useroclave').val();

	$('#loader-msg-wait').show();
	try {
		$.ajax({
			type: "POST",
			url: "/usuarios/confirmaolvidoclave/",
			dataType: 'json',
			data: {username: username, csrfmiddlewaretoken:  $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response['status'] == 200){
					$("#btnconfirmacclave").hide();
					$("#btncancelacclave").hide();
					$("#btnfincclave").show();
					enviarMsgModaloClave("Nueva Contraseña Creada: ",response['message']);
					}
				else{
					enviarMsgModaloClave(response['message']);
					efectoTemblor($('#ModalOlvidoClave'));
					}
				},
			error: function(jqXHR, textStatus, errorThrown) {
				enviarMsgModaloClave(textStatus);
				},
			complete: function() {
				$('#loader-msg-wait').hide();
				}				
			});
		} 
	catch (error) {
		enviarMsgModaloClave(error);
		}
	}

		
function limpiarCamposModalLogin() {  

	$('#rutuser').val('');
	$('#username').val('');
	$('#txtPassword').val('');
	};

function limpiarMsgModalLogin() {  

	$("#divloginerror1").text('');
	$("#divloginerror2").text(''); 
	$("#divloginerror").hide();
	};

function enviarMsgModalLogin(msg1,msg2="") {

	$("#divloginerror1").text(msg1);
	$("#divloginerror2").text(msg2);  
	$('#divloginerror').show();
    }

	
function limpiarMsgModaloClave() {  

	$("#divmsgoclave1").text('');
	$("#divmsgoclave2").text(''); 
	$("#divmsgoclave").hide();
	};

	
function enviarMsgModaloClave(msg1,msg2="") {

	$("#divmsgoclave1").text(msg1);
	$("#divmsgoclave2").text(msg2);  
	$('#divmsgoclave').show();
	}