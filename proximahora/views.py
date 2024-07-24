# 
#   views.py proximahora
#
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.shortcuts import render,redirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth.models import User
from tablas.models import Rubros
from usuarios.models import UsuariosPersonas, EstadosUsuarios, PerfilesUsuarios
from .funciones import Constantes, ErroresPH
from blog.models import Post


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
            persona = UsuariosPersonas.objects.get(rut=rut)
            if (persona.estado == EstadosUsuarios.HABILITADO):
                usuario = User.objects.get(username=username)
                if (password is not None):
                    if (usuario.check_password(password)):
                        todook = True
                    else:
                        todook = False
                else:
                    todook = True
                if (todook):    
                    if (persona.perfil == PerfilesUsuarios.REGISTRADO): 
                        return render(request, 'home_user.html',{'persona': persona, 'usuario': usuario})
                    else:
                        if (persona.perfil == PerfilesUsuarios.ESPECIALISTA):
                            return render(request, 'home_esp.html', {'persona': persona, 'usuario': usuario})
                        else:
                            if ((persona.perfil == PerfilesUsuarios.ROOT) or (persona.perfil == PerfilesUsuarios.ADMINISTRADOR)):
                                return render(request, 'home_adm.html',{'persona': persona, 'usuario': usuario})
                            else:
                                return render(request, 'home.html')
                else:
                    return render(request, 'error.html', {'error_ph': ErroresPH.ERRORESPH[ErroresPH.ERROR_ERRORPARAM][1]})
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

def home(request):
    rubros = Rubros.objects.all().order_by('nombre')
    blogs = Post.objects.all()
    return render(request,'home.html',{'rubros': rubros, 'mirubro': Constantes.MEDICINA, 'posts':blogs})

# @login_required(login_url='users/userlogin')
def administrador(request):
    return render(request,'home_adm.html')

def registrado(request):
    return render(request, 'home_user.html')

def especialista(request):
    return render(request, 'home_esp.html')

def about(request):
    return render(request,'about.html')

def ayuda(request):
    return render(request,'ayuda.html')

def test(request):
    return render(request, 'base-esp.html')
