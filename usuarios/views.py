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
        return render(request, 'personas_list.html', {'personas': personas,'regiones': regiones, 'comunas': comunas, 'ciudades': ciudades,'miregion': miregion, 'micomuna': micomuna, 'miciudad': miciudad})
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
        if (accion == FuncionesAjax.ELIMINAR):
            eliminar_persona(id)
        elif (accion == FuncionesAjax.CREAR):
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
            print('Accion= Crear Usuario' + ' Error= '+str(e))
            return None
    except Exception as e:
        print('Accion= Crear Persona' + ' Error= '+str(e))
        return None

  
def eliminar_persona(id):
    try:
        persona = UsuariosPersonas.objects.get(id=id)
        usuario = User.objects.get(id=persona.usuario)
        persona.delete()
        usuario.delete()       
    except Exception as e:
        print('Accion= Eliminar Persona' + ' Error= '+str(e))


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
    
     
@method_decorator(csrf_exempt, name='dispatch')
class personas_verregistro(View):
    def get(self, request):
        id = request.GET.get('id')
        if id is not None:
            try:
                persona = UsuariosPersonas.objects.get(id=id)
                data = [{'username': persona.usuario.username, 'rut': persona.rut, 'nombre': persona.usuario.first_name, 'apellido': persona.usuario.last_name,  
                            'fnacimiento': fecha_sql_to_str(persona.fnacimiento), 'email': persona.usuario.email,'telefono': persona.telefono, 'region': str(persona.region.id),
                            'comuna': str(persona.comuna.id), 'ciudad': str(persona.ciudad.id)}]
            except UsuariosPersonas.DoesNotExist:
                    data = [{'username': "", 'rut': "", 'nombre': "", 'apellido': "", 'fnacimiento': "", 'email': "",'telefono':"", 'region': str(Constantes.REGIONMETRO),
                             'comuna': str(Constantes.COMUNASTGO), 'ciudad': str(Constantes.CIUDADSTGO)}]
        else:
            data = {'Error': 'Se requiere un ID válido'}
        return JsonResponse(data, safe=False)
    
    
def especialistas_listar(request):

    especialistas = UsuariosEspecialistas.objects.all()
    if (request.method == 'GET'):
        rubros = Rubros.objects.order_by('nombre')
        categorias = Categorias.objects.filter(rubro_id=Constantes.MEDICINA).order_by('nombre')
        subcategorias = SubCategorias.objects.filter(categoria_id=Constantes.MEDICOCIRUJANO).order_by('nombre')
        return render(request, 'especialistas_list.html', {'especialistas': especialistas,'rubros': rubros,'mirubro': Constantes.MEDICINA,'categorias': categorias,'micategoria': Constantes.MEDICOCIRUJANO,
                                                           'subcategorias': subcategorias,'misubcategoria': Constantes.CIRUJANOGRAL,'EstadosSuscripcion': EstadosSuscripcion,'EstadosDocumentos': EstadosDocumentos})
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
        if (accion == FuncionesAjax.ELIMINAR):
            eliminar_persona(id)
        elif (accion == FuncionesAjax.CREAR):
            crear_persona(rut,username,EstadosUsuarios.ENPROCESO,PerfilesUsuarios.REGISTRADO,fnacimiento,telefono,region,comuna,ciudad,email,nombre,apellido)
        else:
            modificar_persona(id,fnacimiento,telefono,region,comuna,ciudad,email,nombre,apellido)
        return render(request, 'especialistas_ajax_list.html', {'especialistas': especialistas})
    
@method_decorator(csrf_exempt, name='dispatch')
class especialistas_verpersona(View):
    def get(self, request):
        username = request.GET.get('username')
        if username is not None:
            try:
                usuario = User.objects.get(username=username)
                persona = UsuariosPersonas.objects.get(usuario_id=usuario.id)
                estado_persona = EstadosUsuarios.ESTADOS_USUARIOS[int(persona.estado)][1]
                data = [{'idpersona': persona.id,'idusuario': persona.usuario.id, 'nombre': persona.usuario.first_name,'apellido': persona.usuario.last_name,'email': persona.usuario.email,'estado_persona': estado_persona}]
#                data = [{'idpersona': persona.id,'idusuario': persona.usuario.id, 'nombre': persona.usuario.first_name,'apellido': persona.usuario.last_name,'email': persona.usuario.email,
#                         'estado_persona': EstadosUsuarios.ESTADOS_USUARIOS[persona.estado][1]}]
            except:
                data = [{'idpersona': "", 'idusuario': "", 'nombre': "", 'apellido': "",'email': "",'estado_persona': ""}]
        else:
            data = {'Error': 'Se requiere un ID válido'}
        return JsonResponse(data, safe=False)
    