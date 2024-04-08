# 
#   views.py proximahora
#
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# @login_required(login_url='/users/userlogin')
def home(request):
    return render(request,'index.html')

# @login_required(login_url='users/userlogin')
def about(request):
    return render(request,'about.html')

# @login_required(login_url='users/userlogin')
def ayuda(request):
    return render(request,'ayuda.html')