# 
#   views.py proximahora
#
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from tablas.models import Rubros
from usuarios.models import UsuariosPersonas, EstadosUsuarios, PerfilesUsuarios
from .funciones import Constantes, ErroresPH


def home(request):
    rubros = Rubros.objects.all().order_by('nombre')
    return render(request,'home.html',{'rubros': rubros, 'mirubro': Constantes.MEDICINA})

# @login_required(login_url='users/userlogin')
def administrador(request):
    return render(request,'home_adm.html')

@csrf_exempt
def ingresar_plataforma(request):
    '''
    Envia home segun el login del usuario
    '''
    if (request.method == 'POST'):
        rut = request.POST.get('rutuser')
        username = request.POST.get('username')
        password = request.POST.get('txtPassword')
        try:
            userlogin = UsuariosPersonas.objects.get(rut=rut)
            if (userlogin.estado == EstadosUsuarios.HABILITADO):   
                nombre_usuario = f'{userlogin.usuario.last_name} , {userlogin.usuario.first_name}'
                if (userlogin.perfil == PerfilesUsuarios.REGISTRADO): 
                    return render(request, 'home_user.html',{'nombre_userlogin': nombre_usuario})
                else:
                    if (userlogin.perfil == PerfilesUsuarios.ESPECIALISTA):
                        return render(request, 'home_esp.html', {'nombre_esplogin': nombre_usuario})
                    else:
                        if ((userlogin.perfil == PerfilesUsuarios.ROOT) or (userlogin.perfil == PerfilesUsuarios.ADMINISTRADOR)):
                            return render(request, 'home_adm.html',{'nombre_admlogin': nombre_usuario})
                        else:
                            return render(request, 'home.html')
            else:
                return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_USERLOCK][1]})
        except Exception as e:
            return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_DATONOEXISTE][1]+' ('+str(e)+')'})
    else:
        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})

@csrf_exempt
def salir_plataforma(request):
    '''
    Realiza logout y envia home 
    '''
#    if (request.method == 'POST'):
    logout(request)
    return redirect('home')
#    else:
#        return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ACCESO][1]})


def registrado(request):
    return render(request, 'home_user.html')

def about(request):
    return render(request,'about.html')

def ayuda(request):
    return render(request,'ayuda.html')

def test(request):
    return render(request, 'base-esp.html')
