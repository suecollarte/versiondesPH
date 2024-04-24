#
#   views.py tablas
#
""" Este modulo premite realizar operaciones CRUD de Regiones, Comunas, Ciudades, Rubros, Categorias, Subcategorias,Formas de Pagos Area Salud
    Formas de Pagos Otros Rubros, Tipo de Prevision, Modalidad de Atencion y Promociones
    Metodo GET muestra los registros en DB via ajax
    Metodo POST recibe por ajax el CRUD a realizar y los campos a modificar
    accion=0 Elimina registro
    accion=1 Crea registro
    accion=2 modifica registro """

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from proximahora.funciones import *
from .models import *


# @csrf_exempt
# @login_required(login_url='/users/userlogin')
def regiones(request):
    regiones = Regiones.objects.all()
    if (request.method == 'GET'):
        return render(request, 'regiones/regiones_list.html', {'regiones': regiones})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        numero = request.POST.get('numero')
        nombre = request.POST.get('nombre')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                Regiones.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                Regiones.objects.create(nombre=nombre, numero=numero)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                Regiones.objects.filter(id=id).update(numero=numero, nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'regiones/regiones_ajax_list.html', {'regiones': regiones})


#  @login_required(login_url='/users/userlogin')
def ciudades(request):
    ciudades = Ciudades.objects.all()
    if (request.method == 'GET'):
        regiones = Regiones.objects.order_by('nombre')
        return render(request, 'ciudades/ciudades_list.html', {'ciudades': ciudades, 'regiones': regiones})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        region = request.POST.get('region')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                Ciudades.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                Ciudades.objects.create(nombre=nombre, region_id=region)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                Ciudades.objects.filter(id=id).update(
                    nombre=nombre, region_id=region)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'ciudades/ciudades_ajax_list.html', {'ciudades': ciudades})


def selectciudades(request):
    if (request.method == 'GET'):
        region = request.GET.get('region')
        ciudad = request.GET.get('ciudad')
        if (region == 0):
            ciudades = Ciudades.objects.order_by('nombre')
        else:        
            ciudades = Ciudades.objects.filter(region_id=region).order_by('nombre')
        return render(request,'ciudades/ciudades_ajax_select.html', {'ciudades': ciudades, 'miciudad': ciudad})
    else:
        return HttpResponse('Petición inválida') 
     
        
# @login_required(login_url='/users/userlogin')
def comunas(request):
    comunas = Comunas.objects.all()
    if (request.method == 'GET'):
        regiones = Regiones.objects.order_by('nombre')
        return render(request, 'comunas/comunas_list.html', {'comunas': comunas, 'regiones': regiones})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        region = request.POST.get('region')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                Comunas.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                Comunas.objects.create(nombre=nombre, region_id=region)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                Comunas.objects.filter(id=id).update(
                    nombre=nombre, region_id=region)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'comunas/comunas_ajax_list.html', {'comunas': comunas})

    
def selectcomunas(request):
    if (request.method == 'GET'):
        region = request.GET.get('region')
        comuna = request.GET.get('comuna')
        if (region == 0):
            comunas = Comunas.objects.order_by('nombre')
        else:        
            comunas = Comunas.objects.filter(region_id=region).order_by('nombre')
        return render(request,'comunas/comunas_ajax_select.html', {'comunas': comunas, 'micomuna': comuna})
    else:
        return HttpResponse('Petición inválida') 


# @login_required(login_url='/users/userlogin')
def categorias(request):
    categorias = Categorias.objects.all()
    if (request.method == 'GET'):
        rubros = Rubros.objects.order_by('nombre')
        return render(request, 'varios/categorias_list.html', {'categorias': categorias, 'rubros': rubros})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        rubro = request.POST.get('rubro')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                Categorias.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                Categorias.objects.create(nombre=nombre, rubro_id=rubro)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                Categorias.objects.filter(id=id).update(nombre=nombre, rubro_id=rubro)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'varios/categorias_ajax_list.html', {'categorias': categorias})


    
def selectcategorias(request):
    if (request.method == 'GET'):
        rubro = request.GET.get('rubro')
        categoria = request.GET.get('categoria')
        if (rubro == 0):
            categorias = Categorias.objects.order_by('nombre')
            categoria = categorias.first().id
        else:        
            categorias = Categorias.objects.filter(rubro_id=rubro).order_by('nombre')
        return render(request,'varios/categorias_ajax_select.html', {'categorias': categorias, 'micategoria': categoria})
    else:
        return HttpResponse('Petición inválida') 
    
    
# @login_required(login_url='/users/userlogin')
def subcategorias(request):
    if (request.method == 'GET'):
        subcategorias = SubCategorias.objects.all()
        categorias = Categorias.objects.order_by('nombre')
        return render(request, 'varios/subcategorias_list.html', {'subcategorias': subcategorias, 'categorias': categorias})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        categoria_id = int(request.POST.get('categoria'))
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                SubCategorias.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                rubro_id = Categorias.objects.get(pk=categoria_id).rubro.id
            except Exception as e:
                 print('Accion= ' + accion + ' Error= '+str(e))
            if (accion == FuncionesAjax.CREAR):
                try:
                    SubCategorias.objects.create(nombre=nombre, categoria_id=categoria_id, rubro_id=rubro_id)
                except Exception as e:
                    print('Accion= ' + accion +' Error= '+str(e))
            else:
                try:
                    SubCategorias.objects.filter(id=id).update(nombre=nombre, categoria_id=categoria_id, rubro_id=rubro_id)
                except Exception as e:
                    print('Accion= ' + accion + ' Error= '+str(e))
        subcategorias = SubCategorias.objects.all()
        return render(request, 'varios/subcategorias_ajax_list.html', {'subcategorias': subcategorias})
    
    
def selectsubcategorias(request):
    if (request.method == 'GET'):
        categoria = request.GET.get('categoria')
        subcategoria = request.GET.get('subcategoria')    
        subcategorias = SubCategorias.objects.filter(categoria_id=categoria).order_by('nombre')

        return render(request,'varios/subcategorias_ajax_select.html', {'subcategorias': subcategorias, 'misubcategoria': subcategoria})
    else:
        return HttpResponse('Petición inválida') 
    
    
# @login_required(login_url='/users/userlogin')
def rubros(request):
    rubros = Rubros.objects.all()
    if (request.method == 'GET'):
        return render(request, 'varios/rubros_list.html', {'rubros': rubros})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        areasalud = request.POST.get('areasalud')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                Rubros.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                Rubros.objects.create(nombre=nombre, areasalud=areasalud)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                Rubros.objects.filter(id=id).update(nombre=nombre, areasalud=areasalud)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'varios/rubros_ajax_list.html', {'rubros': rubros})


# @login_required(login_url='/users/userlogin')
def formapagosalud(request):
    formapago = FormaPagoSalud.objects.all()
    if (request.method == 'GET'):
        return render(request, 'varios/formapagosalud_list.html', {'formaspagos': formapago})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                FormaPagoSalud.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                FormaPagoSalud.objects.create(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                FormaPagoSalud.objects.filter(id=id).update(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'varios/formapagosalud_ajax_list.html', {'formaspagos': formapago})


# @login_required(login_url='/users/userlogin')
def formapagogral(request):
    formapago = FormaPagoGral.objects.all()
    if (request.method == 'GET'):
        return render(request, 'varios/formapagogral_list.html', {'formaspagos': formapago})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                FormaPagoGral.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                FormaPagoGral.objects.create(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                FormaPagoGral.objects.filter(id=id).update(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'varios/formapagogral_ajax_list.html', {'formaspagos': formapago})
    

# @login_required(login_url='/users/userlogin')
def tipoprevision(request):
    tiposprevision = TipoPrevision.objects.all()
    if (request.method == 'GET'):
        return render(request, 'varios/tipoprevision_list.html', {'tiposprevision': tiposprevision})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                TipoPrevision.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                TipoPrevision.objects.create(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                TipoPrevision.objects.filter(id=id).update(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'varios/tipoprevision_ajax_list.html', {'tiposprevision': tiposprevision})

    
# @login_required(login_url='/users/userlogin')
def modalidadatencion(request):
    modalidadesatencion = ModalidadAtencion.objects.all()
    if (request.method == 'GET'):
        return render(request, 'varios/modalidadatencion_list.html', {'modalidadesatencion': modalidadesatencion})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                ModalidadAtencion.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                ModalidadAtencion.objects.create(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                ModalidadAtencion.objects.filter(id=id).update(nombre=nombre)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'varios/modalidadatencion_ajax_list.html', {'modalidadesatencion': modalidadesatencion})
    
    
# @login_required(login_url='/users/userlogin')
def promociones(request):
    promociones = Promociones.objects.all()
    if (request.method == 'GET'):
        return render(request, 'varios/promociones_list.html', {'promociones': promociones})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        fdesde = fecha_str_to_sql(request.POST.get('fdesde'))
        fhasta = fecha_str_to_sql(request.POST.get('fhasta'))
        nombre = request.POST.get('nombre')
        pclave = request.POST.get('pclave')
        dcto_porcentaje = number_unformat(request.POST.get('dcto_porcentaje'))
        dcto_cantidad = number_unformat(request.POST.get('dcto_cantidad'))
        if (accion == FuncionesAjax.ELIMINAR):
            try:
                Promociones.objects.filter(id=id).delete()
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        elif (accion == FuncionesAjax.CREAR):
            try:
                Promociones.objects.create(nombre=nombre,fdesde=fdesde,fhasta=fhasta,pclave=pclave,dcto_porcentaje=dcto_porcentaje,dcto_cantidad=dcto_cantidad)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        else:
            try:
                Promociones.objects.filter(id=id).update(nombre=nombre,fdesde=fdesde,fhasta=fhasta,pclave=pclave,dcto_porcentaje=dcto_porcentaje,dcto_cantidad=dcto_cantidad)
            except Exception as e:
                print('Accion= ' + accion + ' Error= '+str(e))
        return render(request, 'varios/promociones_ajax_list.html', {'promociones': promociones})    

