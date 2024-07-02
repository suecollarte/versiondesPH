$(document).ready(function(){

	$('#btncancelar').click(function(){
		window.location.href = "/home";
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
		
	$('#oksubmitformsuscrip').prop('disabled', true);
	
	$('#divnewuser').modal('show');

	$('#txtPassword').keyup(function () {
		$('#strengthMessage').html(checkStrength($('#txtPassword').val()));
		})

	$('#oksubmitformsuscrip').on('click', function() {
		$('#formclaves').submit();
		})
	
	$('#btnclaves').on('click',function(event) {
		var password1 = allTrim($('#txtPassword').val());
		var password2 = allTrim($('#txtConfirmPassword').val());
		event.preventDefault();
		limpiarMsgModalLogin();
		if (password1 == "") {
			enviarMsgModal("Debe ingresar Contraseña");
			efectoTemblor($('#divnewuser'));
			}
		else if (password2 == "") {
			enviarMsgModal("Debe confirmar Contraseña");
			efectoTemblor($('#divnewuser'));
			}
		else if (password1 != password2) {
			enviarMsgModal("Contraseñas No coinciden");
			efectoTemblor($('#divnewuser'));
			}
		else if (password1.length < 8) {
			enviarMsgModal("Contraseña debe tener al menos 8 carcateres");
			efectoTemblor($('#divnewuser'));
			}
		else {
			var rut = allTrim($('#rutusuario').val());
			var password = allTrim($('#txtPassword').val());
			var token = allTrim($('#entok').val());
			var region = $('#region option:selected').val();
			var comuna = $('#comuna option:selected').val();
			var ciudad = $('#ciudad option:selected').val();
			var username = rut_sin_formato(rut);

			$('#loader-msg-wait').show();
			$('#divnewuser').modal('hide');
			$('#AvisoRegStep2Modal').modal('show');
			$('#oksubmitformsuscrip').prop('disabled', false);

			try {
				$.ajax({
					type: "POST",
					dataType: 'json',
					url: "/usuarios/registro_usuario_crear/",
					data: {rut: rut, password: password, token: token, region: region, comuna: comuna, ciudad: ciudad, 
							username: username, csrfmiddlewaretoken:  $("input[name=csrfmiddlewaretoken]").val()},
					success: function( response ) {
						if (response['status'] == 200)
							enviarMsgFinal(response['message']) 
						else
							enviarMsgFinal(response['message']+' ('+response['status']+')');
						},
					error: function(jqXHR, textStatus, errorThrown) {
						enviarMsgFinal(textStatus);
						},
					complete: function() {
						$('#loader-msg-wait').hide();
						}			
					});
				} 
			catch (error) {
				enviarMsgFinal(error);
				}	
			}
		});

	$('#region').change(function(){
		Cargar_Comunas();
		Cargar_Ciudades();
		});	

	});
//
// ********************************
//          Funciones
// ********************************
//
//
function enviarMsgModal(msg) {

	$("#divmsg1").text("Error: ");
	$("#divmsg2").text(msg);  
	$('#divmsg').show();
	efectoTemblor($('#divnewuser'));
    }

function enviarMsgFinal(msg) {

	$("#divmsgfinal1").text(msg);
	$('#divmsgfinal').show();
	}
	
function Cargar_Comunas() {
	var region, comuna;

	region = $('#region option:selected').val();
	comuna = COMUNASTGO;
//	alert("En Cargar_Comunas Region="+region+" Comuna="+comuna)
	$.ajax({
		url: "/tablas/selectcomunas",
		data: {region: region, comuna: comuna},
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
// Actualiza lista de Ciudades, dependiendo de la region elegida
//	
function Cargar_Ciudades() {
	var region, ciudad;

	region = $('#region option:selected').val();
	ciudad = CIUDADSTGO;
//	alert("En Cargar_Ciudades Region="+region+" Ciudad="+ciudad)
	$.ajax({
		url: "/tablas/selectciudades",
		data: {region: region, ciudad: ciudad, opcion0: 1},
		type: 'GET',
		dataType: 'html',
		success: function(response) {
			$('#divciudades').html(response);
			},
		error: function(jqXHR, textStatus, errorThrown) {
			MensajeErrorDesconocido('Hubo un problema(2) con la solicitud:', textStatus, errorThrown);
			}
		});
	};
	