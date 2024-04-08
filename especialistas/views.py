#
#   views.py Especialistas
#
""" Este modulo premite realizar operaciones CRUD de Especialistas
    Metodo GET muestra los registros en DB via ajax
    Metodo POST recibe por ajax el CRUD a realizar y los campos a modificar
    accion=0 Elimina registro
    accion=1 Crea registro
    accion02 modifica registro """

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import *

# @login_required(login_url='/users/userlogin')
def especialista(request):
    especialistas = Especialistas.objects.all()
    if (request.method == 'GET'):
        return render(request, 'varios/especialistas_list.html', {'especialistas': especialistas})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        if (accion == '0'):
            try:
                Especialistas.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == '1'):
            try:
                Especialistas.objects.create(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                Especialistas.objects.filter(id=id).update(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'varios/especialistas_ajax_list.html', {'especialistas': especialistas})
