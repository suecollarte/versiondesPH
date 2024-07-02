$(document).ready(function(){

	var f100 = new LiveValidation('formsusrut');
	f100.add(Validate.Presence);
	var f101 = new LiveValidation('formsusnombre');
	f101.add(Validate.Presence);
	var f102 = new LiveValidation('formsusapellido');
	f102.add(Validate.Presence);
	var f103 = new LiveValidation('formsusfono');
	f103.add(Validate.Presence);
	var f104 = new LiveValidation('formsusmail');
	f104.add(Validate.Presence);

	$('#msgresreg1').hide();

	$('#btncancelar').click(function(){
		window.location.href = "/home";
		});

	$('#fnacimiento').datepicker({
		locale: 'es-es', 
		size: 'small',
		format: 'dd-mm-yyyy',
		iconsLibrary: 'fontawesome',
		uiLibrary: 'bootstrap5',
		keyboardNavigation: true,
		showOtherMonths: true,
		});

	$('#divnewuser').on('shown.bs.modal', function () {
		$(document).on('keydown', function(event) {
			if (event.key === "Escape" || event.key === "Esc") {
				window.location.href = "/home";
				}
			});
		});

	$('#divnewuser').on('hidden.bs.modal', function () {
		$(document).off('keydown');
		});
		
	$('#divnewuser').modal('show');

	$('#formsusrut').blur(function(){
		if (validarRUT('formsusrut',false)) {
			$('#formsusrut2').val(rut_sin_formato($('#formsusrut').val()));
			$('#divmsg').hide();
			}
		else {
			enviarMsgModal("Verifique el R.U.T por favor");
			$('#formsusrut2').val('');
			$('#formsusrut').focus();
			}
		});

	$('#formsusmail').blur(function(){
		if (!validarCorreo(allTrim($('#formsusmail').val()))) {
			enviarMsgModal("Correo Electrónico ingresado no es válido");
			$('#formsusmail').focus();
			}
		else {
			$('#divmsg').hide();
			}
		});

	$('#btnformsuscrip').on('click', function() {
		if($('#chkacepto').is(':checked')){
			if (CamposValidos()) {
				$('#AvisoRegStep1Modal').modal('show');
				$('#msgcontinuarreg1').show();
				$('#msgresreg1').hide();
				}
			}
		});

	$('#okenviosuscrip').on('click', function() {
		$('#divnewuser').modal('hide');
		$('#msgcontinuarreg1').hide();
		$('#msgresreg1').show();
		IniciarRegistro();   
		});

	$('#koenviosuscrip').on('click', function() {
		$('#AvisoRegStep1Modal').modal('hide');
		});
				
	$('#oksubmitformsuscrip').on('click', function() {
		$('#formsuscripstep1').submit();
		})

	});
//
// ********************************
//          Funciones
// ********************************
//
// Valida Campos
//	
function CamposValidos(){

	var txtaux = allTrim($('#formsusrut').val());
	if (txtaux == "") 	{
		enviarMsgModal("Debe indicar R.U.T.");
		return false;
		}	
	txtaux = allTrim($('#formsusrut2').val());
	if (txtaux == "") 	{
		enviarMsgModal("Verifique el R.U.T por favor");
		return false;
		}
	txtaux = allTrim($('#formsusnombre').val());
	if (txtaux == "") 	{
		enviarMsgModal("Debe ingresar Nombre(s)");
		return false;
		}	
	txtaux = allTrim($('#formsusapellido').val());
	if (txtaux == "") 	{
		enviarMsgModal("Debe ingresar Apellido(s)");
		return false;
		}	
	txtaux = allTrim($('#formsusfono').val());
	if (txtaux == "") 	{
		enviarMsgModal("Debe ingresar Teléfono");
		return false;
		}	
	txtaux = allTrim($('#formsusmail').val());
	if (txtaux == "") 	{
		enviarMsgModal("Debe ingresar Correo Electrónico");
		return false;
		}	
	if (!validarCorreo(txtaux)) {
		enviarMsgModal("Correo Electrónico ingresado no es válido");
		return false;
		}
	return true;
	};
//
// Envia Datos para que el usuario reciba mail para que continue cpn la suscripcion
//	
function IniciarRegistro(){
	var rut = allTrim($('#formsusrut').val());
	var username = allTrim($('#formsusrut2').val());
	var nombre = allTrim($('#formsusnombre').val());
	var apellido = allTrim($('#formsusapellido').val());
	var mail = allTrim($('#formsusmail').val());
	var telefono = allTrim($('#formsusfono').val());
	var fnacimiento = allTrim($('#fnacimiento').val());
	var solicita = allTrim($('#formsussolicita').val());

	$('#loader-msg-wait').show();

	try {
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: "/usuarios/suscripcion_enviar/",
			data: {rut: rut, username: username, nombre: nombre, apellido: apellido, telefono: telefono, mail: mail, fnacimiento: fnacimiento,
				solicita: solicita,csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				$('#divregerror').show();
				if (response['status'] == 200){
					$("#divregerror1").text(response['message'])
					}
				else
					$("#divregerror1").text(response['message']+' ('+response['status']+')')
				},
			complete: function() {
				$('#loader-msg-wait').hide();
				}
		});
	} catch (error) {
		enviarMsgModal(error);
		}

	};

function enviarMsgModal(msg) {

	$("#divmsg1").text("Error en la Solicitud");
	$("#divmsg2").text(msg);  
	$('#divmsg').show();
	efectoTemblor($('#divnewuser'));
	}
	