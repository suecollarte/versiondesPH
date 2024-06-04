#
#   views.py applogin
#
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from http import HTTPStatus
from usuarios.models import *



def userlogin(request):
    return render(request,'login.html')

def validarlogin(request):
    if (request.method == 'POST'):
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            usuario = User.objects.get(username=username)
            return HttpResponse('OK') 
        except Exception as e:
            return HttpResponse('KO') 
    else:
        return HttpResponse('Petición Inválida!!!')
    
def usercrearlogin(request):
    return render(request,'base-esp.html')

def dologin(request):
    
    if (request.method == 'POST'):
        context = {}
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request,username=username, password=password)
        if user is None :
            context['home'] = ""
            context['message1'] = 'Ingreso Inválido!!'
            context['message2'] = 'Intente con RUT y Contraseña válidos.'           
            return JsonResponse(context, status = 200)
        
        elif user is not None and not user.is_active:
            context['home'] = ""
            context['message1'] = 'La cuenta se encuentra desactivada.'
            context['message2'] = 'Contacte nuestra Area de Soporte.'       
            return JsonResponse(context, status = 200)
        elif user:
            login(request, user)
            userid = User.objects.get(username=username).id
            perfil = UsuariosPersonas.objects.get(usuario_id=userid).perfil
            context['home'] = AppsUsuarios.APPS_USUARIOS[int(perfil)][1]
            context['message'] = 'Ingreso Correcto.'                           
            return JsonResponse(context, status = 200) 
        else:           
            context['home'] = ""
            context['message1'] = 'Ingreso Inválido!!'
            context['message2'] = 'Intente con RUT y Contraseña válidos.'       
            return JsonResponse(context, status = 200)
    return JsonResponse({}, status = 200)
    