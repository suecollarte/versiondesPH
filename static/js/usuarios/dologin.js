$(document).ready(function(){

	$('#rutuser').blur(function(){
		if (validarRUT('rutuser',false)) {
			$('#username').val(rut_sin_formato($('#rutuser').val()));
			}
		else {
			$('#username').val('');
			efectoTemblor($('#LoginModal'));
			enviarMsgModalLogin("R.U.T. Inválido","Debe indicar R.U.T. Válido");
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
