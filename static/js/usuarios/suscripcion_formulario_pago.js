$(document).ready(function(){

	$('#btncancelar').click(function(){
		window.location.href = "/home";
		});

	$('#btnterminar').hide();

	$('#btnterminar').click(function(){
		window.location.href = "/home";
		});

	$('#divmsg').hide();
	
	$('#btncargarfile').click(function(){
		CambiarDcto();
		});

	try{
//		alert('id= '+ $("#id").val()+' token= '+ $("#token").val());
		$('#documento').fileinput({
			theme: 'fa5',
			language: 'es',
			showPreview: true,
			showCancel: true,
			showUpload: true,
			maxFileSize: 5000,
			maxFilesNum: 1,
			required: true,
			uploadUrl: '/usuarios/suscripcion_cargar_pago/',
			uploadAsync: true,
			uploadExtraData: {'id': $("#id").val(),'token': $("#token").val(),'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val()},
			maxFileCount: 1,
			autoreplace: true,
			allowedFileExtensions: ['pdf', 'jpg', 'png'],
			initialPreviewAsData: true,
			previewFileType: 'any'
			}).on('fileuploaded', function(event, data, previewId, index) {
				var response = data.response;
				$("#dctoedit").dialog("close");
				if (response.status = 200) {  
					$("#archivo").val(response.archivo); 
					$('#btncargarfile').hide();
					$('#btncancelar').hide();
					$('#btnterminar').show();
					$("#divmsg1").text(response.message1);  
					$("#divmsg2").text(response.message2);  
					$('#divmsg').show();
					}
				else {
					$("#divmsg1").text(response.message1);  
					$("#divmsg2").text(response.message2);  
					efectoTemblor($('#dialogomodal'));
					}
			}).on('fileuploaderror', function(event, data, msg) {
				mostrarMensaje(msg,MSG_STOP);
			});
		} catch (e) {
			alert("error="+e);
		};
//
// Dialogo para Modificar Registro.
//
$("#dctoedit").dialog({
	autoOpen: false,	 
	position: { my: "center", at: "center", of: window },
	height: 550,
	width: 500,
	resizable: false,
	modal: true,  
	show: {
		effect: "blind",
		duration: 1000
		},
	hide: {
		effect: "explode",
		duration: 1000
		},
	open: function() {
		$('#divmsg1').hide();
		},
	close: function() {
		$('#documento').val('');
		}
	})

	}); 
//
// ********************************
//          Funciones
// ********************************
//
// 
function CambiarDcto(){

	$("#dctoedit").dialog({
		title: "Cargar Documento Pago",
		buttons: [
			{
				text: "Salir",
				click: function() {
					$( this ).dialog("close");
					},
				class:"ui-corner-all", style:"color:Black" 
			}
			]
		});

	$("#dctoedit").dialog("open");
	};

