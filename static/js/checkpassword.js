$(document).ready(function () {
    $('#txtPassword').keyup(function () {
        $('#strengthMessage').html(checkStrength($('#txtPassword').val()))
    })
    function checkStrength(password) {
        var strength = 0
        if (password.length < 6) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Short')
            return 'Muy Corto'
            }
        if (password.length > 7) strength += 1
        // If password contains both lower and uppercase characters, increase strength value.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
        // If it has numbers and characters, increase strength value.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
        // If it has one special character, increase strength value.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // If it has two special characters, increase strength value.
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // Calculated strength value, we can return messages
        // If value is less than 2
        if (strength < 2) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Weak')
            return 'Debil'
            } 
        else if (strength == 2) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Good')
            return 'Bueno'
            } 
        else {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Strong')
            return 'Fuerte'
            }
    }
});

function PasswordValida() { 
	var txtaux1 = allTrim($('#txtPassword').val());
	if (txtaux1 == "") 	{
		mostrarMensaje("Debe indicar Password",MSG_STOP);
		return false;
		}	
	var txtaux2 = allTrim($('#txtConfirmPassword').val());
	if (txtaux2 == "") 	{
		mostrarMensaje("Debe Confirmar Password",MSG_STOP);
		return false;
		}
	if (txtaux1 != txtaux2) {
		mostrarMensaje("Password no Coinciden",MSG_STOP);
		return false;
		}
	if (txtaux1.length < 8) {
		mostrarMensaje("Password debe tener al menos 8 caracteres",MSG_STOP);
		return false;
		}
	return true;
	};
