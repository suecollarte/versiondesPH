# 
#   views.py proximahora
#
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from tablas.models import Rubros
from .funciones import Constantes


def home(request):
    rubros = Rubros.objects.all().order_by('nombre')
    return render(request,'home.html',{'rubros': rubros, 'mirubro': Constantes.MEDICINA})

# @login_required(login_url='users/userlogin')
def administrador(request):
    return render(request,'home_adm.html')

def registrado(request):
    return render(request, 'home_user_base.html')

def about(request):
    return render(request,'about.html')

def ayuda(request):
    return render(request,'ayuda.html')

def test(request):
    return render(request, 'base-esp.html')
