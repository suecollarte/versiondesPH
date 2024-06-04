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
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import *
from tablas.models import *
from proximahora.funciones import *

# @login_required(login_url='/users/userlogin')
def personas_listar(request):
    
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
    
    try:
        nuevo_usuario = User.objects.create_user(username=username, email=email, first_name= nombre, last_name=apellido, is_active=False)
        userid = nuevo_usuario.id
        try:
            nueva_persona = UsuariosPersonas.objects.create(rut=rut,estado=estado,perfil=perfil,fnacimiento=fnacimiento,
                                                            telefono=telefono,region_id=region,comuna_id=comuna,ciudad_id=ciudad,usuario_id=userid)
            return nueva_persona
        except Exception as e:
            print('Accion= Crear Persona' + ' Error= '+str(e))
            return None
    except Exception as e:
        print('Accion= Crear Usuario' + ' Error= '+str(e))
        return None


def modificar_persona(id,fnacimiento,telefono,region,comuna,ciudad,email,nombre,apellido):
    
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

    if (request.method == 'POST'):
        id = request.POST.get('id')
        password = request.POST.get('password')
        userid = UsuariosPersonas.objects.get(id=id).usuario_id
        try:
            usuario = User.objects.get(id=userid)
            usuario.set_password(password)
            usuario.save()
            return HttpResponse('OK') 
        except Exception as e:
            return HttpResponse('ERROR Cambio Clave' + ' Error= '+str(e)) 
    else:
        return HttpResponse('Petición Inválida!!!')


def personas_cambiarestado(request):

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
        return HttpResponse('Petición Inválida!!!')    
    
    
def personas_verificarut(request):

    if (request.method == 'POST'):
        rut = request.POST.get('rut')
        try:
            id = UsuariosPersonas.objects.get(rut=rut).id
            return HttpResponse(id)  
        except Exception as e:
            return HttpResponse('0')    
    else:
        return HttpResponse('Petición Inválida!!!')    


@method_decorator(csrf_exempt, name='dispatch')
class personas_verpersona(View):
    
    def get(self, request):
        username = request.GET.get('username')
        if username is not None:
            try:
                usuario = User.objects.get(username=username)
                persona = UsuariosPersonas.objects.get(usuario_id=usuario.id)
#                estado_persona = EstadosUsuarios.ESTADOS_USUARIOS[int(persona.estado)][1]
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
    
