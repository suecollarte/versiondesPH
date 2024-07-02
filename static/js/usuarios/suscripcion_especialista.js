$(document).ready(function(){

	$("#divpago2").hide();
	$("#divconfirmpago").hide();
		
	$('#okenviopago').on('click', function() {
		EnviarPago();
		$('#msgcontinuarpago1').hide();
		$('#divmsgpago').show();
		});

	$('#oksubmitformpago').on('click', function() {
		$('#formulariopago').submit();
		})

	$('#btnpagar').on('click', function() {
		if ($('#formapago option:selected').val() != '0') {
			$('#ModalConfirmaPago').modal('show');
			$('#DivRecepcionPago').hide();
			$('#msgcontinuarpago1').show();
			$('#divmsgpago').hide();
			}
		});
	
	$('#planpago').change(function(){
		if ($('#planpago option:selected').val() != '0') {
			$("#divpago1").hide();
			TraerPlan();
			$("#divpago2").show();
			}
		else {
			$("#planselec").html('');
			$("#finicio").html('');
			$("#ftermino").html('');	
			$('#subtotalpago').val('');
			$('#ivapago').val('');
			$('#totalpago').val('');		
			}
		});

	});
//
// ********************************
//          Funciones
// ********************************
//
//
// Consulñta informacion del plan elegido
//	
function TraerPlan(){
	var plan = $('#planpago option:selected').val();

	try {
		$.ajax({
			async: false,
			type: 'GET',
			dataType: "json",
			url: "/tablas/planes_detalles/",
			data: {plan: plan,csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
				if (response['status'] = "OK"){
					$("#planselec").html(response['plan']);
					$("#finicio").html(response['finicio']);
					$("#ftermino").html(response['ftermino']);
					$("#montopago").val(response['valor']);
					TotalSuscripcion();
					}
				else
					$("#divregerror1").text(response['error'])
				},
		});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}

	};

function TotalSuscripcion(){
	var total = parseFloat($('#montopago').val());
	var neto = (total / 1.19).toFixed(0);
	var imptos = total - neto;
	total = total.toFixed(0);
	imptos  = imptos.toFixed(0);	
	fmonto = number_puntoxcoma($("#montopago").val())
	$("#montopago").val(number_format(fmonto,0));
	$('#subtotalpago').val(number_format(neto,0));
	$('#ivapago').val(number_format(imptos,0));
	$('#totalpago').val(number_format(total,0));

	}


function EnviarPago(){
	var rut = allTrim($('#rutcontacto').val());
	var plan = $('#planpago option:selected').val();
	var formapago = $('#formapago option:selected').val();

	$('#loader-msg-wait').show();
	$('#divconfirmpago').show();
	try {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "/usuarios/suscripcion_pagar/",
			data: {rut: rut, plan: plan, formapago: formapago,csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()},
			success: function( response ) {
//				alert("Status="+response['status']+" Mensaje="+response['message']);
				if (response['status'] == 200){
					$("#msgpagoconf").text(response['message'])
					}
				else
					$("#msgpagoconf").text(response['message'])
				},
			complete: function() {
				$('#loader-msg-wait').hide();
				}
		});
	} catch (error) {
		MensajeErrorDesconocido(error);
		}

	};