#
#   views.py Usuarios
#
""" Este modulo premite realizar operaciones CRUD de usuarios
    Metodo GET muestra los registros en DB via ajax
    Metodo POST recibe por ajax el CRUD a realizar y los campos a modificar
    accion=0 Elimina registro
    accion=1 Crea registro
    accion02 modifica registro """
    
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from django.core.mail import EmailMessage, BadHeaderError
from smtplib import SMTPException
from django.utils.crypto import get_random_string
from django.db.models import Q 
from proximahora.settings import EMAIL_HOST_USER
from tablas.models import *
from proximahora.funciones import *
from especialistas.models import EspecialistasPagos, EstadosPagos
from especialistas.forms import UploadPagoForm
from .models import *
from .forms import *
import os

# @login_required(login_url='/users/userlogin')
def personas_listar(request):
    ''' 
    Si es GET Lista usuarios; Si es POST crea o modifica usuarios 
    '''
    miregion = Constantes.REGIONMETRO
    miciudad = Constantes.CIUDADSTGO
    micomuna = Constantes.COMUNASTGO
    personas = UsuariosPersonas.objects.all()
    regiones = Regiones.objects.all()
    ciudades = Ciudades.objects.filter(region=miregion)
    comunas = Comunas.objects.all()
    if (request.method == 'GET'):
        return render(request, 'personas_list.html', {'personas': personas,'regiones': regiones, 'comunas': comunas, 'ciudades': ciudades,'miregion': miregion, 'micomuna': micomuna, 
                                                      'miciudad': miciudad,'EstadosUsuarios': EstadosUsuarios,'PerfilesUsuarios': PerfilesUsuarios})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        username = request.POST.get('username')
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        rut = request.POST.get('rut')
        fnacimiento = request.POST.get('fnacimiento')
        telefono = request.POST.get('telefono')
        email = request.POST.get('email')
        ciudad = request.POST.get('ciudad')
        comuna = request.POST.get('comuna')
        region = request.POST.get('region')
        fnacimiento = fecha_str_to_sql(fnacimiento)
        if (accion == FuncionesAjax.CREAR):
            crear_persona(rut,username,EstadosUsuarios.ENPROCESO,PerfilesUsuarios.REGISTRADO,fnacimiento,telefono,region,comuna,ciudad,email,nombre,apellido)
        else:
            modificar_persona(id,fnacimiento,telefono,region,comuna,ciudad,email,nombre,apellido)
        return render(request, 'personas_ajax_list.html', {'personas': personas})

    
def crear_persona(rut,username,estado,perfil,fnacimiento,telefono,region,comuna,ciudad,email,nombre,apellido):
    '''
    Crea registro en tabla  usuarios_personas y en auth_user; generando un usuario registrado
    Usado solo dentro de views.py
    '''
    try:
        nuevo_usuario = User.objects.create_user(username=username, email=email, first_name= nombre, last_name=apellido, is_active=False)
        userid = nuevo_usuario.id
        try:
            nueva_persona = UsuariosPersonas.objects.create(rut=rut,estado=estado,perfil=perfil,fnacimiento=fnacimiento,
                                                            telefono=telefono,region_id=region,comuna_id=comuna,ciudad_id=ciudad,usuario_id=userid)
            return "OK", nuevo_usuario, nueva_persona
        except:
            return "KO2"
    except:
        return "KO1"


def modificar_persona(id,fnacimiento,telefono,region,comuna,ciudad,email,nombre,apellido):
    '''
    Modifica registro en tablas usuarios_personas y auth_user;
    Usado solo dentro de views.py
    '''    
    userid = UsuariosPersonas.objects.get(id=id).usuario.id
    try:
        UsuariosPersonas.objects.filter(id=id).update(fnacimiento=fnacimiento,telefono=telefono,region=region,comuna=comuna,ciudad=ciudad)
        try:
            usuario = User.objects.get(id=userid)
            usuario.first_name = nombre
            usuario.last_name = apellido
            usuario.email = email
            usuario.save()
        except Exception as e:
            print('Accion= Modificar Usuario' + ' Error= '+str(e))  
    except Exception as e:
        print('Accion= Modificar Persona' + ' Error= '+str(e))
    
    
def personas_password(request):
    '''
    Modifica password en tabla auth_user; Retorna json
    '''  
    context = {}
    context['status'] = 0 
    context['message'] = ''
    if (request.method == 'POST'):
        id = request.POST.get('id')
        password = request.POST.get('password')
        userid = UsuariosPersonas.objects.get(id=id).usuario_id
        try:
            usuario = User.objects.get(id=userid)
            usuario.set_password(password)
            usuario.save()
            context['status'] = 200
            context['message'] = 'Cambio realizado con exito'
        except Exception as e:
            context['status'] = 500
            context['message'] = f'ERROR Cambio Clave ({str(e)})'
    else:
        context['status'] = 400
        context['message'] = f'{ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]}'
    return JsonResponse(context)


def personas_cambiarestado(request):
    '''
    Modifica estado en tablas usuarios_personas y auth_user; Retorna html
    '''
    if (request.method == 'POST'):
        id = request.POST.get('id')
        estado = request.POST.get('estado')
        userid = UsuariosPersonas.objects.get(id=id).usuario_id
        try:
            usuario = User.objects.get(id=userid)
            usuario.is_active= estado
            usuario.save()
            personas = UsuariosPersonas.objects.all()
            return render(request, 'personas_ajax_list.html', {'personas': personas})
        except Exception as e:
            return HttpResponse('ERROR Cambio Estado' + ' Error= '+str(e)) 
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})
    
    
def personas_verificarut(request):
    '''
    Verifica si ya ha sido ingresado un RUT en tabla usuarios_personas
    '''
    context = {}
    context['status'] = 0 
    context['message'] = ''
    if (request.method == 'POST'):
        rut = request.POST.get('rut')
        try:
            id = UsuariosPersonas.objects.get(rut=rut).id
            context['status'] = 200 
            context['message'] = "R.U.T. Ya se encuentra Ingresado como Usuario"
        except Exception as e:
            context['status'] = 404 
            context['message'] = "R.U.T. NO se encuentra Ingresado como Usuario"
    else:
        context['status'] = 400
        context['message'] = f'{ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]}'
    return JsonResponse(context)


@method_decorator(csrf_exempt, name='dispatch')
class personas_verpersona(View):
    '''
    Verifica si ya ha sido ingresado un RUT en tabla usuarios_personas
    '''   
    def get(self, request):
        username = request.GET.get('username')
        if username is not None:
            try:
                usuario = User.objects.get(username=username)
                persona = UsuariosPersonas.objects.get(usuario_id=usuario.id)
                if (persona.usuario.is_active):
                    activo = "Activo"
                else:
                    activo = "Bloqueado"
                data = [{'id': persona.id, 'rut': persona.rut,'username': persona.usuario.username, 'nombre': persona.usuario.first_name,
                         'apellido': persona.usuario.last_name,'email': persona.usuario.email,'fnacimiento': fecha_sql_to_str(persona.fnacimiento),
                         'telefono': persona.telefono,'region': persona.region_id,'comuna': persona.comuna_id,'ciudad': persona.ciudad_id,
                         'activo': activo,'estado': persona.estado,'perfil': persona.perfil}]
            except:
                data = [{'id': "", 'rut': "", 'username': "", 'nombre': "", 'apellido': "",'email': "",'fnacimiento': "",'telefono': "",'region': "",
                         'comuna': "",'ciudad': "",'activo': "",'estado': "",'perfil': ""}]
        else:
            data = {'Error': 'Se requiere un Username válido'}
        return JsonResponse(data, safe=False)
    

def validarlogin(request):
    '''
    Verifica si existe username en tabla auth_user
    '''   
    context = {}
    context['status'] = 0 
    context['message'] = ''
    if (request.method == 'POST'):
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            usuario = User.objects.get(username=username)
            context['status'] = 200 
        except Exception as e:
            context['status'] = 404 
            context['message'] = 'Usuario ingresado no Existe<br />'
    else:
        context['status'] = 400
        context['message'] = f'{ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]}'
    return JsonResponse(context)
  
  
def dologin(request):
    
    context = {}
    context['status'] = 0 
    context['home'] = ""
    context['message1'] = ''
    context['message2'] = ''   
    if (request.method == 'POST'):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request,username=username, password=password)
        if user is None :
            context['status'] = 404 
            context['message1'] = 'Ingreso Inválido!!'
            context['message2'] = 'Intente con RUT y Contraseña válidos.'           
            return JsonResponse(context, status = 200)
        elif user is not None and not user.is_active:
            context['status'] = 403
            context['message1'] = 'La cuenta se encuentra desactivada.'
            context['message2'] = 'Contacte nuestra Area de Soporte.'       
            return JsonResponse(context, status = 200)
        elif user:
            login(request, user)
            userid = User.objects.get(username=username).id
            perfil = UsuariosPersonas.objects.get(usuario_id=userid).perfil
            context['status'] = 200 
            context['home'] = AppsUsuarios.APPS_USUARIOS[int(perfil)][1]
            context['message1'] = 'Ingreso Correcto.'                           
            return JsonResponse(context, status = 200) 
        else:           
            context['status'] = 404 
            context['message1'] = 'Ingreso Inválido!!'
            context['message2'] = 'Intente con RUT y Contraseña válidos.'       
            return JsonResponse(context, status = 200)
    else:
        context['status'] = 405
        context['message1'] = ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]
    return JsonResponse(context)
 
 
def enviarcontacto(request):
    '''
    Envia mail avisando al Administrador de un registro de contacto en la plataforma. 
    Ajax desde home.js
    '''
    context = {}
    context['status'] = 0
    context['message1'] = ""
    context['message2'] = ""
    if (request.method == 'POST'):
        context = {}
        rut = request.POST.get('rut')
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        mail = request.POST.get('mail')
        asunto = request.POST.get('asunto')
        msg = request.POST.get('msg')
        subject = "Contacto Web ProximaHora"
        l1 = f"El usuario {nombre} {apellido}, RUT {rut}. email {mail} ha enviado el siguente mensaje\n"
        l2 = f"Asunto: {asunto}\n"
        l3 = f"Mensaje: {msg}\n\n\n"
        l4 = 'Este es un correo enviado automáticamente desde ProximaHora.Favor No responder'
        body = f'Estimado Administrador(ra).\n\n'+l1+l2+l3+l4
        from_email = EMAIL_HOST_USER
#        to_email = ["aconlledo@vilco.cl","scollarte@cmdgroup.cl"]
        to_email = [Constantes.MAIL_ADMIN]
        email = EmailMessage(subject, body, from_email, to_email)
        context['message1'] = "Correo NO enviado."
        try:
            email.send()
            context['status'] = 200
            context['message1'] = "Se ha enviado Correo a contacto@proximahora.cl"
            context['message2'] = ''
        except BadHeaderError:
            context['status'] = 502
            context['message2'] = "Encabezado inválido."
        except SMTPException as e:
            context['status'] = 502
            context['message2'] = f"Error de SMTP: {str(e)}"
        except Exception as e:
            context['status'] = 500
            context['message2'] = f"Se produjo un error: {str(e)}"
    else:
        context['status'] = 405
        context['message'] ="Solicitud Erronea. "+ ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]
    return JsonResponse(context)
    
'''
Proceso de inscripcion de usuarios e inicio en especialistas
============================================================
'''
def registro_inicio(request,solicita):
    '''
    Muestra formulario de inicio de registro de Usuarios y Especialistas
    '''
    if (request.method == 'GET'):
        if (solicita == int(SolicitudRegister.ESPECIALISTA)):
            return render(request, 'registro_inicio.html',{'solicita': solicita, 'titulo1': 'Suscripción de Especialista', 'titulo2': 'Suscripción'})
        else:
            if (solicita == int(SolicitudRegister.USUARIO)):
                return render(request, 'registro_inicio.html',{'solicita': solicita, 'titulo1': 'Registro de Usuario', 'titulo2': 'Registro'})
            else:
                return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ERRORPARAM][1]+' ('+str(solicita)+')'})
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})
       
       
def suscripcion_enviar(request):
    '''
    Ingresa Solicitudes de Registro de Usuarios y Especialistas. Envia el primer mail al usuario o especialista para continuar con el proceso
    Ajax desde registro_inicio.js y registro_inicio.html
    '''
    context = {}
    context['status'] = 0
    context['message'] = ""
    if (request.method == 'POST'):
        rut = request.POST.get('rut')
        username = request.POST.get('username')
        try:
            userid = User.objects.get(username=username).id
            context['status'] = 406
            context['message'] = f"R.U.T. {rut} Se encuentra registrado"
        except:
            nombre = request.POST.get('nombre')
            apellido = request.POST.get('apellido')
            mail = request.POST.get('mail')
            telefono = request.POST.get('telefono')
            fnacimiento = request.POST.get('fnacimiento')
            solicita = request.POST.get('solicita')
            token = get_random_string(64)
            try:
                id = UsuariosRegisterRequest.objects.get(rut=rut).id
                UsuariosRegisterRequest.objects.filter(id=id).update(nombre=nombre,apellido=apellido,email=mail,telefono=telefono,
                                                       fnacimiento=fecha_str_to_sql(fnacimiento),token=token,solicita=solicita)   
            except:
                UsuariosRegisterRequest.objects.create(rut=rut,nombre=nombre,apellido=apellido,email=mail,telefono=telefono,
                                                       fnacimiento=fecha_str_to_sql(fnacimiento),token=token,solicita=solicita)
            status , mensaje = envio_primer_mail(nombre,apellido,rut,solicita,token,mail)
            context['status'] = status
            context['message'] = mensaje
    else:
        context['status'] = 405
        context['message'] ="Solicitud Errónea. "+ ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]
    return JsonResponse(context)


def envio_primer_mail(nombre,apellido,rut,solicita,token,mail):
    '''
    Envia primer mail al usuario o especialista para continuar con su proceso de registro o suscripcion respectivamente
    Desde Vista suscripcion_enviar
    '''
    if (solicita == SolicitudRegister.ESPECIALISTA):
        aux1 = 'Suscripción'
        aux2 = 'suscribirse'
    else:
        aux1 = 'Registro'
        aux2 = 'registrarse'
    subject = f'{aux1} Plataforma ProximaHora'
    l1 = f'Estimado(a): {nombre} {apellido} RUT {rut}. \n\nUsted ha solicitado {aux2} en {Constantes.URL_PROXIMAHORAPROD}\n\n'
    l2 = 'Para continuar con el proceso por favor vaya al siguiente enlace:\n\n'
    l3 = f'{Constantes.URL_PROXIMAHORATEST}/usuarios/suscripcion_final/{solicita}/{rut}/{token}\n\n'
    l4 = 'Este es un correo enviado automáticamente desde ProximaHora.Favor No responder\n\nAtentamente\nPlataforma ProximaHora '
    body = l1 + l2 + l3 + l4
    from_email = EMAIL_HOST_USER
    to_email = [mail]
    email = EmailMessage(subject, body, from_email, to_email) 
    try:
        email.send()
        status = 200
        mensaje = f"Correo de Confirmación enviado a {mail}"
    except Exception as e:
        status = 400
        mensaje = f"Correo NO enviado. Se produjo Error({status}): {str(e)}"
    return status , mensaje
 
    
def suscripcion_final(request,solicita,rut,token):
    '''
    Envia segundo formulario para continuar con el Registro de Usuarios o Especialistas.
    Atiende url enviada en mail desde envio_primer_mail
    '''
    if (request.method == 'GET'):
        try:
            solicitante = UsuariosRegisterRequest.objects.get(rut=rut)
            if (solicitante.token == token):   
                if (solicitante.solicita == SolicitudRegister.ESPECIALISTA):
                    planes = Planes.objects.filter(estado=EstadosPlanes.VIGENTE)
                    fpagos = FormaPagoGral.objects.order_by('nombre')
                    return render(request, 'suscripcion_especialista.html', {'solicitante': solicitante,'planes': planes,'fpagos': fpagos})
                else:
                    regiones = Regiones.objects.order_by('nombre')
                    comunas = Comunas.objects.filter(region_id=Constantes.REGIONMETRO).order_by('nombre')    
                    ciudades = Ciudades.objects.filter(region_id=Constantes.REGIONMETRO).order_by('nombre')    
                    return render(request, 'registro_usuario.html', {'solicitante': solicitante,'regiones': regiones,'miregion': Constantes.REGIONMETRO,
                                                                    'comunas': comunas,'micomuna': Constantes.COMUNASTGO,'ciudades': ciudades,
                                                                    'miciudad': Constantes.CIUDADSTGO})
            else:
                return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_DATONOEXISTE][1]+' ('+token+')'})
        except Exception as e:
            return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_DATONOEXISTE][1]+' ('+str(e)+')'})
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})
    
    
def registro_usuario_crear(request):
    '''
    Ingresa Solicitudes de Registro de Usuarios. Envia mail de confirmacion al usuario adjuntando archivo "Declaración de Privacidad"
    Termina el proceso de registro de usuarios
    Ajax desde registro_usuario.js y registro_usuario.html
    '''
    context = {}
    context['status'] = 0
    context['message'] = ""
    if (request.method == 'POST'):
        context = {}
        rut = request.POST.get('rut')
        token = request.POST.get('token')
        try:
            solicitante = UsuariosRegisterRequest.objects.get(rut=rut)
            if (solicitante.token == token):              
                password = request.POST.get('password')
                username = request.POST.get('username')
                region = request.POST.get('region')
                comuna = request.POST.get('comuna')
                ciudad = request.POST.get('ciudad')
                try:
                    msg, usuario, persona = crear_persona(rut,username,EstadosUsuarios.HABILITADO,PerfilesUsuarios.REGISTRADO, solicitante.fnacimiento,
                                                        solicitante.telefono,region,comuna,ciudad,solicitante.email,solicitante.nombre,solicitante.apellido)
                    usuario.set_password(password)
                    usuario.is_active = 1
                    usuario.save()
                    UsuariosRegisterRequest.objects.filter(id=solicitante.id).delete()
                    mail = usuario.email                 
                    subject = f"Registro Plataforma ProximaHora"
                    l1 = f'Estimado(a): {solicitante.nombre} {solicitante.apellido} RUT {rut}. \n\nUsted ha sido registrado como Usuario en {Constantes.URL_PROXIMAHORAPROD}\n\n'
                    l2 = 'Adjunto encontrará nuestra Declaración de Privacidad y Confidencialidad de la Información de Próxima Hora\n\n'
                    l3 = 'No dude en comunicarse con nuestra área de soporte ante cualquier inconveniente.\n\n'
                    l4 = 'Este es un correo enviado automáticamente desde ProximaHora. Favor No responder\n\nAtentamente\nPlataforma ProximaHora '
                    body = l1 + l2 + l3 + l4
                    from_email = EMAIL_HOST_USER
                    to_email = [mail]
                    email = EmailMessage(subject, body, from_email, to_email)                  
                    if os.path.isfile(Constantes.PDF_CONFIDENCIALIDAD):
                        email.attach_file(Constantes.PDF_CONFIDENCIALIDAD)
                    try:
                        email.send()
                        context['status'] = 200
                        context['message'] = f"Ingreso exitoso. Correo de Bienvenida enviado a {mail}"
                    except Exception as e:
                        context['status'] = 500
                        context['message'] = f"Error en envio Correo. Comunique a Soporte ProximaHora:  ({str(e)})"
                except Exception as e:    
                    context['status'] = 500
                    context['message'] =f"Error en Registro. Comunique a Soporte ProximaHora: ({str(e)})"        
            else:
                context['status'] = 500
                context['message'] = "R.U.T. No ha solicitado registro con anterioridad"
        except Exception as e:
            context['status'] = "KO"
            context['message'] = f"Error en Registro. Comunique a Soporte ProximaHora: ({str(e)})"
    else:
        context['status'] = 405
        context['message'] ="Solicitud Erronea. "+ ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]
    return JsonResponse(context)


def suscripcion_formulario_pago(request,rut,token):
    '''
    Envia formulario al futuro especialista para que realice pago
    '''
    if (request.method == 'GET'):
        try:
            solicitante = UsuariosRegisterRequest.objects.get(rut=rut)
            if  (token != solicitante.token):
                return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ERRORPARAM][1]+' ('+str(token)+')'})
            else:
                return render(request, 'suscripcion_formulario_pago.html',{'solicitante': solicitante})
        except:
            return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ERRORPARAM][1]+' ('+str(rut)+')'})
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})
    
    
def suscripcion_pagar(request):
    '''
    Envia mail al futuro especialista con url para que suba su comprobante de pago. 
    Ajax desde suscripcion_especialista.js
    '''
    context = {}
    context['status'] = 0
    context['message'] = ""
    if (request.method == 'POST'):
        rut = request.POST.get('rut')
        plan = request.POST.get('plan')
        fpago = request.POST.get('formapago')
        try:
            UsuariosRegisterRequest.objects.filter(rut=rut).update(plan=plan,fpago=fpago)  
            solicitante = UsuariosRegisterRequest.objects.get(rut=rut)
            status , mensaje = enviar_mail_url_pago(solicitante) 
            context['status'] = status
            context['message'] = mensaje
        except Exception as e:        
            context['status'] = 500
            context['message'] = f"Correo NO enviado. Se produjo un Error({str(context['status'])}): {str(e)}"
    else:
        context['status'] = 405
        context['message'] ="Solicitud Erronea. "+ ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]
    return JsonResponse(context)


def enviar_mail_url_pago(solicitante):
    '''
    Envia mail al especialista indicando url para subir documento de pago
    Desde suscripcion_pagar y renviar_mail_url_pago en esta views.py
    '''
    subject = "Suscripción Plataforma ProximaHora"
    l1 = f'Estimado(a): {solicitante.nombre} {solicitante.apellido} RUT {solicitante.rut}. \n\nUsted ha iniciado proceso de pago en {Constantes.URL_PROXIMAHORAPROD}\n\n'
    l2 = 'Para confirmar su pago y enviar comprobante de pago (pdf, png o jpg) por favor vaya al siguiente enlace:\n\n'
    l3 = f'{Constantes.URL_PROXIMAHORATEST}/usuarios/suscripcion_formulario_pago/{solicitante.rut}/{solicitante.token}\n\n'
    l4 = 'Este es un correo enviado automáticamente desde ProximaHora. Favor No responder\n\nAtentamente\nPlataforma ProximaHora '
    body = l1 + l2 + l3 + l4
    from_email = EMAIL_HOST_USER
    to_email = [solicitante.email]
    email = EmailMessage(subject, body, from_email, to_email)
    try:
        email.send()
        status = 200
        mensaje = f"Correo con Instrucciones enviado a {solicitante.email}"
    except Exception as e:
        status = 503
        mensaje = f"Correo NO enviado. Se produjo un Error({str(status)}): {str(e)}"
    return status , mensaje


def suscripcion_cargar_pago(request):
    '''
    En proceso de suscripcion confirma recepcion del comprobante de pago. Envia mail al futuro especialista indicando que sera contactado
    Crea un registro en auth_user, usuarios_personas, usuarios_especialistas y en especialistas_pagos.
    En usuarios_registros hace un update al campo "solicita" indicando que queda en espera aprobacion por parte del administrador. 
    En caso de haber sido rechazado algun pago anterior solo crea un nuevo registro en especialistas_pagos. 
    Envia mail al Administrador para que revise y confirme o rechace el pago. 
    Ajax desde suscripcion_formulario_pago.js. Atiende url enviada en suscripcion_pagar
    '''
    import traceback  #  Eliminar SOLO DEBUG
    from django.db import connection    #  Eliminar SOLO DEBUG    
    
    context = {}
    context['status'] = 0
    context['archivo'] = ""
    context['message1'] = ""
    context['message2'] = ""
    if (request.method == 'POST'):
        id = request.POST.get('id')
        token = request.POST.get('token')
        try:
            solicitante = UsuariosRegisterRequest.objects.get(id=id)
            if  (token != solicitante.token):
                context['status'] = 403
                context['message1'] = ErroresPH.ERRORESPH[ErroresPH.ERROR_ERRORPARAM][1]
                context['message2'] = f'(Token= {str(token)})'
            else:
                try:
                    username = rut_a_username(solicitante.rut)
                    plan = Planes.objects.get(id=solicitante.plan)
                    try:
                        pago = EspecialistasPagos.objects.get(id=solicitante.epago_id) 
                    except:
                        pago = EspecialistasPagos.objects.create(fdesde=plan.fdesde,fhasta=plan.fhasta,uname=username,monto=plan.valor,formapago_id=solicitante.fpago)
                    form = UploadPagoForm(request.POST, request.FILES, instance=pago)
                    if form.is_valid():
                        crear_directorio_pagos(username)
                        pago = form.save()
                        UsuariosRegisterRequest.objects.filter(id=solicitante.id).update(solicita=SolicitudRegister.REVISARPAGO,epago_id=pago.id)  
                        status , mensaje = envio_mail_pago_suscripcion_user(solicitante)     
                        if (status == 200):                             
                            status , mensaje1, mensaje2 = envio_mail_pago_suscripcion_admin(solicitante)   
                            if (status == 200):                             
                                directorio, archivo = os.path.split(pago.documento.name)
                                context['archivo'] = archivo
                                context['message1'] = mensaje1
                                context['message2'] = mensaje2
                            else:
                                context['status'] = status 
                                context['message1'] = mensaje1
                                context['message2'] = mensaje2
                        else:
                            context['status'] = status 
                            context['message1'] = mensaje
                    else:
                        context['status'] = 503
                        context['message1'] = f"Error Archivo Incompatible"
                except Exception as e:
                    traceback_str = traceback.format_exc()
                    context['status'] = 500 
                    context['message1'] = "Documento no cargado."
#                    context['message2'] = f"Error=({str(e)})"
#                    context['message2'] = f"Error=({str(e)})  Detalles:{traceback_str}"
                    context['message2'] = f"Documento no cargado. Error=({str(e)})  Detalles:{traceback_str}  Queries=({connection.queries})"
        except Exception as e:
            context['status'] = 400 
            context['message1'] = ErroresPH.ERRORESPH[ErroresPH.ERROR_ERRORPARAM][1]
            context['message2'] = f'Error({str(e)}))'
    else:
        context['status'] = 405
        context['message1'] = ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]
    return JsonResponse(context)


def envio_mail_pago_suscripcion_user(solicitante):
    '''
    Envia mail al especialista indicando recepcion del comprobante de pago
    Desde suscripcion_cargar_pago en esta views.py
    '''
    subject = f"Suscripción Plataforma ProximaHora"
    l1 = f'Estimado(a): {solicitante.nombre} {solicitante.apellido} RUT {solicitante.rut}. \n\n'
    l2 = 'Hemos recibido su comprobante de pago. Nuestros ejecutivos verificarán la información y pronto recibirá un correo de confirmación.\n\n'
    l3 = 'Adjunto encontrará nuestra Declaración de Privacidad y Confidencialidad de la Información de Próxima Hora\n\n'
    l4 = 'No dude en comunicarse con nuestra área de soporte ante cualquier inconveniente.\n\n'
    l5 = 'Este es un correo enviado automáticamente desde ProximaHora. Favor No responder\n\nAtentamente\nPlataforma ProximaHora'
    body = l1 + l2 + l3 + l4 +l5
    from_email = EMAIL_HOST_USER
    to_email = [solicitante.email]
    email = EmailMessage(subject, body, from_email, to_email)   
    if os.path.isfile(Constantes.PDF_CONFIDENCIALIDAD):
        email.attach_file(Constantes.PDF_CONFIDENCIALIDAD)   
    try:
        email.send()
        status = 200
        mensaje = f"Correo de Confirmación enviado a {solicitante.email}"
    except Exception as e:
        status = 500
        mensaje = f"Correo NO enviado. Se produjo un Error({status}): {str(e)}"
    return status , mensaje


def envio_mail_pago_suscripcion_admin(solicitante):
    '''
    Envia mail al administrador indicando recepcion del comprobante de pago
    Desde suscripcion_cargar_pago en esta views.py
    '''
    subject = f"Suscripción y Pago Plataforma ProximaHora RUT {solicitante.rut}"
    l1 = 'Estimado(a) Administrador:\n\n'
    l2 = f'Hemos recibido comprobante de pago de  {solicitante.nombre} {solicitante.apellido} RUT {solicitante.rut}\n\n'
    l3 = 'Favor consulte y verifique en Módulo de Administración, Suscripciones por Aprobar\n\n'
    l4 = 'Este es un correo enviado automáticamente desde ProximaHora. Favor No responder\n\nAtentamente\nPlataforma ProximaHora'
    body = l1 + l2 + l3 + l4
    from_email = EMAIL_HOST_USER
    to_email = [Constantes.MAIL_ADMIN]
    email = EmailMessage(subject, body, from_email, to_email)                  
    try:
        email.send()
        status = 200
        mensaje1 = f"Correo enviado al Administrador"
        mensaje2 = f"Correo de Confirmación enviado a {solicitante.email}"
    except Exception as e:
        status = 503
        mensaje1 = f"Correo no enviado a la Administración."
        mensaje2 = f"Correo NO enviado. Se produjo un Error({status}): {str(e)}"
    return status , mensaje1, mensaje2

'''
Vistas para el administrador relacionadas al registro de usuarios y suscriptores
================================================================================
'''   
    
def registros_pendientes(request,solicita):
    '''
    Muestra Solicitudes de Registro de Usuarios y Especialistas que aun no confirman su intencion de registrarse. 
    Modulo Administrador
    '''
    if (request.method == 'GET'):
        try:
            solicitudes = UsuariosRegisterRequest.objects.select_related('epago').filter(solicita=solicita)
        except:
            solicitudes = []
        if (solicita == int(SolicitudRegister.USUARIO)):
            titulo = "Usuarios Registros Pendientes"
        else:
            titulo = "Especialistas Suscripciones Pendientes"    
        return render(request, 'registros_pendientes.html',{'solicitudes': solicitudes,'titulo': titulo,'solicita': solicita})
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})    
 
    
def cancelaregistro_pendiente(request):
    '''
    Elimina Solicitudes de Registro de Usuarios o Especialistas que aun no confirman su intencion de registrarse.
    Modulo Administrador
    '''
    if (request.method == 'POST'):
        id = request.POST.get('id')
        solicita = request.POST.get('solicita')
        UsuariosRegisterRequest.objects.filter(id=id).delete()
        solicitudes = UsuariosRegisterRequest.objects.filter(solicita=solicita)
        return render(request, 'registros_pendientes_ajax.html',{'solicitudes': solicitudes})
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})


def reenvia_primermail(request):
    '''
    Reenvia primer mail al usuario o especialista para continuar con su proceso de registro o suscripcion respectivamente
    Ajax desde registro_pendientes.js  y registros_pendientes.html
    Modulo Administrador
    '''
    context = {}
    context['status'] = 0
    context['message'] = ""
    if (request.method == 'POST'):
        id = request.POST.get('id')
        try:
            registro = UsuariosRegisterRequest.objects.get(id=id)
            status , mensaje = envio_primer_mail(registro.nombre,registro.apellido,registro.rut,registro.solicita,registro.token,registro.email)
            context['status'] = status
            context['message'] = mensaje     
        except Exception as e:
            context['status'] = 404
            context['message'] = f"Solicitud No es Válida. {str(e)}"
    else:
        context['status'] = 405
        context['message'] ="Solicitud Errónea. "+ ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]
    return JsonResponse(context)
    
    
def reenvia_mail_url_pago(request):
    '''
    Reenvia mail al usuario o especialista para continuar con su proceso de registro o suscripcion respectivamente
    Ajax desde registro_pendientes.js registros_pendientes.html
    Modulo Administrador
    '''
    context = {}
    context['status'] = 0
    context['message'] = ""
    if (request.method == 'POST'):
        id = request.POST.get('id')
        try:
            solicitante = UsuariosRegisterRequest.objects.get(id=id)
            status , mensaje = enviar_mail_url_pago(solicitante)
            context['status'] = status
            context['message'] = mensaje     
        except Exception as e:
            context['status'] = 404
            context['message'] = f"Solicitud No es Válida. {str(e)}"
    else:
        context['status'] = 405
        context['message'] ="Solicitud Errónea. "+ ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]
    return JsonResponse(context)


def suscripciones_por_aprobar(request):
    '''
    Muestra Solicitudes de Suscripcion de Especialistas que han enviado comprobante de pago y deben ser aprobadas o rechazadas. 
    Modulo Administrador   
    '''  
    context = {}
    context['status'] = 0
    context['message'] = "" 
    if (request.method == 'GET'):
        try:
            solicitudes = UsuariosRegisterRequest.objects.filter(solicita=SolicitudRegister.REVISARPAGO)
        except:
            solicitudes = []   
        return render(request, 'suscripciones_por_aprobar.html',{'solicitudes': solicitudes})
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})
    
    
def suscripciones_cambiar_estado(request):
    '''
    Cambia estado de la suscripcion de un especialista; es el ultimo paso en caso de ser aceptado el pago. 
    Si el pago es rechazado se elimina toda informacion y la persona debe comenzar un nuevo proceso
    Ajax desde suscripciones_por_aprobar.js y suscripciones_por_aprobar.html
    Modulo Administrador   
    '''  
    if (request.method == 'POST'):
        id = request.POST.get('id')
        estado = request.POST.get('estado')
        motivo = request.POST.get('motivo')
        solicitante = UsuariosRegisterRequest.objects.get(id=id)  
        if (estado == int(SolicitudEstados.RECHAZADA)):
            EspecialistasPagos.objects.filter(id=solicitante.epago_id).delete() 
            status = enviar_mail_pago_suscripcion_rechazado(solicitante,motivo)
        else:
            username = rut_a_username(solicitante.rut)
            EspecialistasPagos.objects.filter(id=solicitante.epago_id).update(estado=EstadosPagos.CONFIRMADO) 
            UsuariosEspecialistas.objects.filter(id=solicitante.idespecialista).update(estado=EstadosSuscripcion.VIGENTE)
            msg, usuario, persona = crear_persona(solicitante.rut,username,EstadosUsuarios.HABILITADO,PerfilesUsuarios.ESPECIALISTA, solicitante.fnacimiento,
                                                solicitante.telefono,"","","",solicitante.email,solicitante.nombre,solicitante.apellido)
            especialista = UsuariosEspecialistas.objects.create(persona_id=persona.id,plan_id=solicitante.plan)
            usuario.set_password(username)
            usuario.is_active = 0
            usuario.save()
            status = enviar_mail_pago_suscripcion_aceptado(solicitante)
            solicitante.delete()
        try:
            solicitudes = UsuariosRegisterRequest.objects.filter(solicita=SolicitudRegister.REVISARPAGO)
        except:
            solicitudes = []   
        return render(request, 'suscripciones_por_aprobar_ajax.html',{'solicitudes': solicitudes})
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})


def enviar_mail_pago_suscripcion_rechazado(solicitante,motivo):
    '''
    Envia mail al suscriptor indicando rechazo de su pago y fin de su intento de suscripcion
    Desde suscripciones_cambiar_estado en esta views.py
    '''
    subject = f"Suscripción Plataforma ProximaHora: Pago Rechazado"
    l1 = f'Estimado(a): {solicitante.nombre} {solicitante.apellido} RUT {solicitante.rut}. \n\n'
    l2 = 'Lamentamos informar que el pago informado por Ud. ha sido rechazado.\n\n'
    if (motivo != ""):
        l3 = f'Motivo: \n\n {motivo.email}\n\n'
    else:
        l3 = ""
    l4 = 'No dude en comunicarse con nuestra área de soporte ante cualquier inconveniente.\n\n'
    l5 = 'Este es un correo enviado automáticamente desde ProximaHora. Favor No responder\n\nAtentamente\nPlataforma ProximaHora'
    body = l1 + l2 + l3 + l4 +l5
    from_email = EMAIL_HOST_USER
    to_email = [solicitante.email]
    email = EmailMessage(subject, body, from_email, to_email)   
    if os.path.isfile(Constantes.PDF_CONFIDENCIALIDAD):
        email.attach_file(Constantes.PDF_CONFIDENCIALIDAD)   
    try:
        email.send()
        status = 200
        mensaje = f"Correo de Aviso de Rechazo enviado a {solicitante.email}"
    except Exception as e:
        status = 500
        mensaje = f"Correo NO enviado. Se produjo un Error({status}): {str(e)}"
    return status , mensaje


def enviar_mail_pago_suscripcion_aceptado(solicitante):
    '''
    Envia mail al especialista indicando recepcion del comprobante de pago
    Desde suscripciones_cambiar_estado en esta views.py
    '''
    subject = f"Suscripción Plataforma ProximaHora"
    l1 = f'Estimado(a): {solicitante.nombre} {solicitante.apellido} RUT {solicitante.rut}. \n\n'
    l2 = 'Nos complace informar que su Pago de Suscripción ha sidp aceptado.\n\nAdjunto encontrará copia de nuestro Contrato\n\n'
    l3 = 'Para finalizar el proceso favor ingrese a nuestra Proxima Hora su RUT en Usuario y RUT sin puntos ni guión en Clave\n\n'
    l4 = 'No dude en comunicarse con nuestra área de soporte ante cualquier inconveniente.\n\n'
    l5 = 'Este es un correo enviado automáticamente desde ProximaHora. Favor No responder\n\nAtentamente\nPlataforma ProximaHora'
    body = l1 + l2 + l3 + l4 +l5
    from_email = EMAIL_HOST_USER
    to_email = [solicitante.email]
    email = EmailMessage(subject, body, from_email, to_email)   
    if os.path.isfile(Constantes.PDF_CONFIDENCIALIDAD):
        email.attach_file(Constantes.PDF_CONFIDENCIALIDAD)   
    try:
        email.send()
        status = 200
        mensaje = f"Correo de Aviso de Aceptación enviado a {solicitante.email}"
    except Exception as e:
        status = 500
        mensaje = f"Correo NO enviado. Se produjo un Error({status}): {str(e)}"
    return status , mensaje


