//
// ********************************
// Funciones jquery Generales
// ********************************
//

const MaxNum = 999999999999;   	// 999.999.999.999
const MaxMon = 9999999999; 		// 9.999.999.999
const IVA = 0.19;  				// Tasa IVA

const DIGITOSVENTAS = 2;
const DIGITOSCOSTOS = 4;
const DIGITOSCANTIDAD = 4;
const DIGITOSPORCENTAJE = 2;

const REGIONMETRO = 13
const CIUDADSTGO = 325
const COMUNASTGO = 13101

const ELIMINAR_REG = 0;
const AGREGAR_REG = 1;
const EDITAR_REG = 2;
const VER_REG = 3;
var ACCION = EDITAR_REG;

const MSG_SUCCESS = 0;
const MSG_WARNING = 1;
const MSG_STOP = 2;

var idGlobal1 = 0;
var idGlobal2 = 0;
var idGlobal3 = 0;
var idGlobal4 = 0;

// Models Usuarios
var	ROOT = 0
var ADMINISTRADOR = 1
var ESPECIALISTA = 2
var REGISTRADO = 3
var INVITADO = 4
var RELACIONADO = 5

var mesesLargos = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var mesesCortos = new Array ("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");

$(document).ready(function(){

	$(window).resize(function () {
		fluidDialog();
		});

	$(document).on("dialogopen", ".ui-dialog", function (event, ui) {
		fluidDialog();
		});

	$('#main-menu').smartmenus({
		subMenusSubOffsetX: 1,
		subMenusSubOffsetY: -8
		});

	$("#div-msg-wait").css({ opacity: 0.5 });	
	$('#div-msg-wait').bind("ajaxStart", function() {$(this).show();})
					  .bind("ajaxComplete", function() {$(this).hide();});   

	$(".tip").tooltip();

	$( ".myhelp" ).tooltip({
		classes: {
		  "ui-tooltip": "highlight"
		}
	  });

	$('input').addClass("ui-corner-all");
	
	$("#menu").menu({position: {at: "left bottom"}});
	
	$(".fechainput").datepicker({
		showOn: 'button',
		buttonImageOnly: true,
		buttonImage: "/static/imagenes/icon_calendar.png",
		numberOfMonths: 1,
		dateFormat: "dd-mm-yy",
		changeMonth: true,
		changeYear: true,
		buttonText: "Seleccionar fecha",
//		maxDate: "-1d",
		maxDate: "+2y",
		yearRange: "1900:2030",
		duration: "slow",
		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
		monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ] 
		});

	$(".uppcase").blur(function(){
		if ($('#chk_upper').length) {
			if ($("#chk_upper").is(':checked'))
				$(this).val($(this).val().toUpperCase());
			}
		else
			$(this).val($(this).val().toUpperCase());
		});

	$(".lowcase").blur(function(){
		$(this).val($(this).val().toLowerCase());
		});
	
	$(".ucword").blur(function(){
			$(this).val($(this).val().ucwords());
			});		
	BloquearReadonly();
	
	});
//
// ********************************
//          Funciones
// ********************************
//
function fluidDialog() {
	var $visible = $(".ui-dialog:visible");
	// each open dialog
	$visible.each(function () {
		var $this = $(this);
		var dialog = $this.find(".ui-dialog-content").data("dialog");
		// if fluid option == true
		if (dialog.options.fluid) {
			var wWidth = $(window).width();
			// check window width against dialog width
			if (wWidth < dialog.options.maxWidth + 50) {
				// keep dialog from filling entire screen
				$this.css("max-width", "90%");
			} else {
				// fix maxWidth bug
				$this.css("max-width", dialog.options.maxWidth);
				}
			//reposition dialog
			dialog.option("position", dialog.options.position);
			}
		});
	}

function BloquearReadonly() {
	$(":input[type=text][readonly='readonly']").css({'background-color' : '#F0EAE9'});
	$(":input[type=password][readonly='readonly']").css({'background-color' : '#F0EAE9'});
	}

function CampoEnReadOnly(id) {
    $("#"+id).css({'background-color' : '#F0EAE9'});
    $("#"+id).attr("readonly","readonly");
	}

function CampoEnReadWrite(id) {
    $("#"+id).css({'background-color' : '#FFFFFF'});
    $("#"+id).removeAttr("readonly");
	}

function CampoDisabled(id) {
	$("#"+id).css({'background-color' : '#F0EAE9'});
	$("#"+id).attr("disabled","disabled");
	}

function CampoEnabled(id) {
	$("#"+id).css({'background-color' : '#FFFFFF'});
	$("#"+id).removeAttr("disabled");
	}


function validarFechas(finicio,ffin) {
	var f1 = finicio.split("-");
    var faux = f1[2] + "-" + f1[1] + "-" + f1[0];
	var fechaInicio = new Date(faux);
	f1 = ffin.split("-");
  	faux = f1[2] + "-" + f1[1] + "-" + f1[0];
	var fechaFin = new Date(faux);

	if (fechaInicio >= fechaFin)
		return false;
	
	return true;
	}

String.prototype.ucwords = function() {
    str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function($1){
            return $1.toUpperCase();
        });
	}

function lTrim(sStr){
	while (sStr.charAt(0) == " ")
		sStr = sStr.substr(1, sStr.length - 1);
	return sStr;
	}

function rTrim(sStr){
	while (sStr.charAt(sStr.length - 1) == " ")
		sStr = sStr.substr(0, sStr.length - 1);
	return sStr;
	}

function allTrim(sStr){
	return rTrim(lTrim(sStr));
	}

function Trim(sStr) {
	return sStr.replace(/^\s+/g,'').replace(/\s+$/g,'');
	}

function validaCampoNumerico(campoId,titulo,maximo,decimales){
	var aux, bien=true;
	if (maximo === undefined)
		maximo = MaxNum;
	if (decimales === undefined)
		decimales = 2;
	if (validaInputFloat(campoId,titulo)) {
		aux = number_unformat($(campoId).val());
		if (aux <= maximo)
			$(campoId).val(number_format(aux,decimales));
		else {
			bien = false;
			mostrarMensaje("Error en "+titulo+"\nValor indicado excede maximo\npermitido de "+number_format(maximo,0,",","."),MSG_STOP);
			$(campoId).focus();
			}
		}
	else
		bien = false;
	return bien;
	}

function validaInputFloat(ocampoId,oCampoNom){
	var valor = Trim($(ocampoId).val());
	if (valor == "")
		return true;
	if (!validaFloat(valor)) {
		mostrarMensaje("El valor indicado en " + oCampoNom + " no es un numero valido!",MSG_STOP);
		try {
			$(ocampoId).select();
			$(ocampoId).focus();
			}
		catch(err){};
		return false;
		}
	return true;
	}

function validaFloat(numero) {
	var er_num=/^([0-9])*[.]?[0-9]*$/;
	var aux = number_unformat(numero);
	if(!er_num.test(aux))
		return false;
	else
		return true;
	}

function number_format(number,decimals,dec_point,thousands_sep) {
	if (decimals === undefined)
		decimals = 2;
	if (dec_point === undefined)
		dec_point = ',';
	if (thousands_sep === undefined)
		thousands_sep = '.';
	number = number_unformat(number,thousands_sep);
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? ',' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
			};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
		}
	return s.join(dec);
	}

function number_unformat(number,thousands_sep) {
	var aux=String(number);
	if (thousands_sep === undefined)
		thousands_sep = '.';
	if (number != '') {
		aux = $.trim(number);
		if (thousands_sep == ".") {
			aux = aux.replace(/[.]/g,'');
			aux = aux.replace(',',".");
			}
		else
			aux = aux.replace(/[,]/g,'');
		}
	return Number(aux);
	}

function number_puntoxcoma(par) {
	var	tmp = String(par);
	return tmp.replace(/[.]/g,',');
	}
	

function textvalida(e,obj) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla != 13) 
		return;
	filas = obj.rows;
	txt = obj.value.split('\n');
	return (txt.length < filas);
	}

function validarRUT() {
	var tmpstr = "", dvr = '0';
	var largo,rut1,dv,suma,mul,res,dvi,rutfinal;
	var crut = allTrim($('#rut').val());

	if (crut.length < 3)	{
		mostrarMensaje('Debe Ingresar R.U.T.',MSG_STOP)
		return false;
		}
	for ( i=0; i <crut.length ; i++ )
		if (crut.charAt(i) != '.' && crut.charAt(i) != '-' ) 
			tmpstr = tmpstr + crut.charAt(i);
	rut1 = tmpstr;
	crut = tmpstr;
	largo = crut.length;
	if (largo > 2)
		rut1 = crut.substring(0, largo - 1);
	else
		rut1 = crut.charAt(0);
	dv = crut.charAt(largo-1);
	if (rut1 == null || dv == null ) {
		mostrarMensaje('R.U.T. Ingresado no es Correcto',MSG_STOP)
		return false;
		}
	suma = 0;
	mul  = 2;
	for (i= rut1.length-1 ; i>= 0; i--) {
		suma = suma + rut1.charAt(i) * mul;
		if (mul == 7)
			mul = 2;
		else
			mul++;
		}
	res = suma % 11;
	if (res==1)
		dvr = 'k';
	else
		if (res==0)
			dvr = '0';
		else {
			dvi = 11-res;
			dvr = dvi + "";
			}
	if (dvr != dv.toLowerCase()){
		mostrarMensaje('R.U.T. Ingresado no es Correcto',MSG_STOP)
		return false;
		}
	dv = dv.toUpperCase();
	switch (rut1.length) {
		case 8:
			rutfinal = rut1.replace( /^(\d{2})(\d{3})(\d{3})$/, '$1.$2.$3'+'-'+dv);
			break;
		case 7:
			rutfinal = rut1.replace( /^(\d{1})(\d{3})(\d{3})$/, '$1.$2.$3'+'-'+dv);
			break;
		case 6:
			rutfinal = rut1.replace( /^(\d{3})(\d{3})$/, '$1.$2'+'-'+dv);
			break;
		case 5:
			rutfinal = rut1.replace( /^(\d{2})(\d{3})$/, '$1.$2'+'-'+dv);
			break;
		case 4:
			rutfinal = rut1.replace( /^(\d{1})(\d{3})$/, '$1.$2'+'-'+dv);
			break;
		default:
			rutfinal = rut1+'-'+dv;
			break;
			}
	$('#rut').val(rutfinal);
	return true;
	}
//
// Elimina ".""  y " -"" del RUT formateado para campo usuario
//
function rut_a_username(rut) {
	var tmpstr = "";
	var crut = allTrim(rut);

	for ( i=0; i <crut.length ; i++ )
		if (crut.charAt(i) != '.' && crut.charAt(i) != '-' ) 
			tmpstr = tmpstr + crut.charAt(i);
	return tmpstr;
	}
	
function validarCorreo(correo) {
	var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	if (expresion.test(correo)) {
		return true;
		} 
	else {
		return false;
		}
	}

function MensajeErrorDesconocido(p) {
	mostrarMensaje("Ha ocurrido un Error Desconocido. Favor comunique Error=("+p+") al Administrador",MSG_STOP);
	}

function mostrarMensaje(texto,aviso=0) {  
	var msg;

	switch (aviso) {
		case 0: // MSG_SUCCESS
			msg = "<button class='btn btn-sm btn-success'><i class='fa-regular fa-thumbs-up'></i>&nbsp&nbspA V I S O:";
			break;
		case 1: // MSG_WARNING
			msg = "<button class='btn btn-sm btn-warning'><i class='fa-regular fa-bell'></i>&nbsp&nbspA T E N C I O N:";
			break;
		default: // MSG_STOP
			msg = "<button class='btn btn-sm btn-danger'><i class='fa-regular fa-hand'></i>&nbsp&nbspA L T O:";
			break;
			}
	var msg1  = "<div id='msg' title='Mensaje del Sistema'><span style='float: left; margin: 0 7px 50px 0;'><p class='tit10lb'>"+
			     msg+"</button><p>"+texto+"</p></span></div>";
	enviarmostrarMensaje(msg1);
	}
	
function enviarmostrarMensaje(mensaje) {

	var msg = $(mensaje);
	msg.dialog({
		modal: true,
		show: 'puff',
		hide: 'scale',
		width: 450,
		minWidth: 200,
		maxWidth: 400,
		minHeight: 100,
		resizable: false,
		position: { my: "center", at: "center center", of: window },
        buttons: [
            {
                text: "Ok",
                click: function() {
					$(this).dialog("close");
                    },
                class:"ui-corner-all", style:"color:Green" 
                }
            ]
		});
	}
	
function confirmarMensaje(texto,callback1,par1,par2) {
	var msg1  = "<div id='msg' title='Mensaje del Sistema'><span style='float: left; margin: 0 7px 50px 0;'><p class='tit10lb'>"+
				"<button class='btn btn-sm btn-danger'><i class='fa-solid fa-circle-question'></i></button>"+
			    "&nbsp&nbsp&nbspA T E N C I O N:</p><p>"+texto+"</p> Esta Ud. Seguro?</span></div>";
	enviarconfirmarMensaje(msg1,callback1,par1,par2);
	}

function enviarconfirmarMensaje(mensaje,callback1,par1,par2) {
	var msg = $(mensaje);
	msg.dialog({
		modal: true,
		show: 'puff',
		hide: 'scale',
		height:300,
		width: 450,
		resizable: false,
		position: { my: "center", at: "center center", of: window },
        buttons: [
            {
                text: "Confirmar",
                click: function() {
					try {
						callback1(par1,par2);
						}
					catch(err){};
					$(this).dialog("close");
                    },
                class:"ui-corner-all", style:"color:Green" 
                },
            {
                text: "Cancelar",
                click: function() {
                    $( this ).dialog("close");
                    },
                class:"ui-corner-all", style:"color:Red" 
                }
            ]
		});
	}
	
function ConfirmarySubmit(texto) {
	var msg1  = "<div id='msg' title='Mensaje del Sistema'><span style='float: left; margin: 0 7px 50px 0;'><p class='tit10lb'><img src='./imagenes/notice.png' border='0' width='24' height='24' />"+
			   "&nbsp&nbsp&nbspA T E N C I O N:</p><p>"+texto+"</p> Esta Ud. Seguro?</span></div>";
	_confirmarySubmit(msg1);
	}
	
function _confirmarySubmit(texto) {
	var msg = $(texto);
	msg.dialog({
		modal: true,
		show: 'puff',
//		hide: 'scale',
		height:250,
		width: 400,
		resizable: false,
		position: { my: "center", at: "center bottom", of: window },
		buttons: {
			"Cancelar": function() {
				$(this).dialog("close");
				},
			"Confirmar": function() {
				$('form').submit();
				$(this).dialog("close");
				}
			}
		});
	}
	
function sumaFecha(d, fecha) {
	var Fecha = new Date();
	var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
	var sep = sFecha.indexOf('/') != -1 ? '/' : '-'; 
	var aFecha = sFecha.split(sep);
	var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];

	fecha= new Date(fecha);
	fecha.setDate(fecha.getDate()+parseInt(d));
	var anno=fecha.getFullYear();
	var mes= fecha.getMonth()+1;
	var dia= fecha.getDate();
	mes = (mes < 10) ? ("0" + mes) : mes;
	dia = (dia < 10) ? ("0" + dia) : dia;
	var fechaFinal = dia+sep+mes+sep+anno;
 	return (fechaFinal);
 	}
 