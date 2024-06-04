# 
#   views.py proximahora
#
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from tablas.models import Rubros

# @login_required(login_url='/users/userlogin')
def home(request):
    rubros = Rubros.objects.all().order_by('nombre')
    return render(request,'home.html',{'rubros': rubros})

# @login_required(login_url='users/userlogin')
def administrador(request):
    return render(request,'index_adm.html')

# @login_required(login_url='users/userlogin')
def about(request):
    return render(request,'about.html')

# @login_required(login_url='users/userlogin')
def ayuda(request):
    return render(request,'ayuda.html')