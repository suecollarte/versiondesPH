#
#   views.py Especialistas
#
""" Este modulo premite realizar operaciones CRUD de Especialistas
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
from .forms import *
from tablas.models import *
from proximahora.funciones import *
from usuarios.models import EstadosUsuarios, EstadosSuscripcion, EstadosDocumentos, UsuariosEspecialistas
import os
    
def especialistas_listar(request):

    especialistas = UsuariosEspecialistas.objects.all()
    if (request.method == 'GET'):
        rubros = Rubros.objects.order_by('nombre')
        rubro_id = rubros.first().id
        categorias = Categorias.objects.filter(rubro_id=rubro_id).order_by('nombre')
        categoria_id = categorias.first().id
        subcategorias = SubCategorias.objects.filter(categoria_id=categoria_id).order_by('nombre')
        return render(request, 'especialistas_list.html', {'especialistas': especialistas,'rubros': rubros,'mirubro': Constantes.MEDICINA,'categorias': categorias,'micategoria': Constantes.MEDICOCIRUJANO,
                                                           'subcategorias': subcategorias,'misubcategoria': Constantes.CIRUJANOGRAL,
                                                           'EstadosSuscripcion': EstadosSuscripcion,'EstadosDocumentos': EstadosDocumentos})
    else:
        accion = request.POST.get('accion')
        id = request.POST.get('id')
        idpersona = request.POST.get('idpersona')
        descripcion = request.POST.get('descripcion')
        reg_especialista = request.POST.get('reg_especialista')
        tiempo_consulta = request.POST.get('tiempo_consulta')
        rubro = int(request.POST.get('rubro'))
        categoria = int(request.POST.get('categoria'))
        subcategoria = request.POST.get('subcategoria')        
        if (accion == FuncionesAjax.CREAR):
            crear_especialista(idpersona,descripcion,reg_especialista,tiempo_consulta,rubro,categoria,subcategoria)
        else:
            modificar_especialista(id,descripcion,reg_especialista,tiempo_consulta,rubro,categoria,subcategoria)
        return render(request, 'especialistas_ajax_list.html', {'especialistas': especialistas})

    
def crear_especialista(idpersona,descripcion,reg_especialista,tiempo_consulta,rubro,categoria,subcategoria):

    try:
        nuevo_especialista = UsuariosEspecialistas.objects.create(descripcion=descripcion,reg_especialista=reg_especialista,tiempo_consulta=tiempo_consulta,
                                                                  rubro_id=rubro,categoria_id=categoria,subcategoria_id=subcategoria,persona_id=idpersona,
                                                                  estado_suscripcion=EstadosSuscripcion.BLOQUEADA,ctr_altadctos=EstadosDocumentos.PENDIENTE)
        return nuevo_especialista
    except Exception as e:
        print('Accion= Crear Especialista' + ' Error= '+str(e))
        return None
    

def modificar_especialista(id,descripcion,reg_especialista,tiempo_consulta,rubro,categoria,subcategoria):
    
    try:
        UsuariosEspecialistas.objects.filter(id=id).update(descripcion=descripcion,reg_especialista=reg_especialista,tiempo_consulta=tiempo_consulta,
                                                           rubro=rubro,categoria=categoria,subcategoria=subcategoria)
    except Exception as e:
        print('Accion = Modificar Especialista' + ' Error= '+str(e))
        
     
@method_decorator(csrf_exempt, name='dispatch')
class especialistas_verespecialista(View):
    
    def get(self, request):
        id = request.GET.get('id')
        if id is not None:
            try:
                especialista = UsuariosEspecialistas.objects.get(id=id)
                persona = UsuariosPersonas.objects.get(id=especialista.persona_id)
                nombre = persona.usuario.last_name+", "+ persona.usuario.first_name
                estado_persona = EstadosUsuarios.ESTADOS_USUARIOS[int(persona.estado)][1]     
                rubro = str(especialista.rubro.id)
                categoria = str(especialista.categoria.id)    
                if especialista.subcategoria is not None:     
                   subcategoria = str(especialista.subcategoria.id)
                else:
                   subcategoria = "0"                   
                data = [{'id': especialista.id,'idpersona': persona.id, 'idusuario': persona.usuario_id, 'nombre': nombre, 'email': persona.usuario.email, 
                         'descripcion': especialista.descripcion,'reg_especialista': especialista.reg_especialista,'tiempo_consulta': especialista.tiempo_consulta,
                         'promedio_evaluacion': especialista.promedio_evaluacion,'ctr_altadctos': especialista.ctr_altadctos,'estado_suscripcion': especialista.estado_suscripcion, 
                         'estado_persona': estado_persona,'rubro': rubro,'categoria': categoria, 'subcategoria': subcategoria}]
            except UsuariosEspecialistas.DoesNotExist:
                    data = [{'username': "", 'rut': "", 'nombre': "", 'apellido': "", 'fnacimiento': "", 'email': "",'telefono':"", 'region': str(Constantes.REGIONMETRO),
                             'comuna': str(Constantes.COMUNASTGO), 'ciudad': str(Constantes.CIUDADSTGO)}]
        else:
            data = {'Error': 'Se requiere un ID válido'}
        return JsonResponse(data, safe=False) 

        
def especialistas_cambiarestado(request):

    if (request.method == 'POST'):
        id = request.POST.get('id')
        estado = request.POST.get('estado')
        try:
            UsuariosEspecialistas.objects.filter(id=id).update(estado_suscripcion=estado)
            especialistas = UsuariosEspecialistas.objects.all()
            return render(request, 'especialistas_ajax_list.html', {'especialistas': especialistas})
        except Exception as e:
            return HttpResponse('ERROR Cambio Estado Especialista' + ' Error= '+str(e)) 
    else:
        return HttpResponse('Petición Inválida!!!')
    

@method_decorator(csrf_exempt, name='dispatch')
class especialistas_verificarut(View):
    
    def get(self, request):
        rut = request.GET.get('rut')
        if rut is not None:
            try:
                persona = UsuariosPersonas.objects.get(rut=rut)
                nombre = persona.usuario.last_name+", "+ persona.usuario.first_name
                try:
                    especialista = UsuariosEspecialistas.objects.get(persona_id=persona.id)
                    data = [{'res': '1', 'idusuario': persona.usuario.id,'idpersona': persona.id,'idespecialista': especialista.id,'nombre': nombre,
                             'email': persona.usuario.email,'estado': EstadosUsuarios.ESTADOS_USUARIOS[int(persona.estado)][1]}]
                except Exception as e:      
                     data = [{'res': '0', 'idusuario': persona.usuario.id,'idpersona': persona.id,'idespecialista': '0','nombre': nombre,
                             'email': persona.usuario.email,'estado': EstadosUsuarios.ESTADOS_USUARIOS[int(persona.estado)][1]}]
            except:
                data = [{'res': '-1', 'id': '','nombre': '','email': '','estado': ''}]
        else:
            data = [{'res': '-2','nombre': 'Se requiere un RUT válido'}]
        return JsonResponse(data, safe=False)
    
    
def especialistas_detalle(request):

    if (request.method == 'GET'):
        id = request.GET.get('id')
        try:
            especialista = UsuariosEspecialistas.objects.get(id=id)
            persona = UsuariosPersonas.objects.get(id=especialista.persona_id)
            rubros = Rubros.objects.all().order_by('nombre')
            categorias = Categorias.objects.filter(rubro_id=especialista.rubro_id).order_by('nombre')
            subcategorias = SubCategorias.objects.filter(categoria_id=especialista.categoria_id).order_by('nombre')
            regiones = Regiones.objects.all().order_by('nombre')
            ciudades = Ciudades.objects.filter(region_id=persona.region_id).order_by('nombre')
            comunas = Categorias.objects.filter(rubro_id=persona.region_id).order_by('nombre')
            return render(request, 'especialistas_detalle.html', {'especialista': especialista,'persona': persona,'rubros': rubros,'categorias': categorias,
                                                                  'subcategorias': subcategorias,'micategoria': especialista.categoria_id,
                                                                  'misubcategoria': especialista.subcategoria_id,'regiones': regiones,'comunas': comunas,'ciudades': ciudades,
                                                                  'EstadosSuscripcion': EstadosSuscripcion,'EstadosDocumentos': EstadosDocumentos,'estado': EstadosUsuarios.ESTADOS_USUARIOS[int(persona.estado)][1]
                                                                  })
        except Exception as e:
            return HttpResponse('ERROR En Consulta de Especialista' + ' Error= '+str(e)) 
    else:
        return HttpResponse('Petición Inválida!!!')
            
            
def especialista_cargarfoto(request):
    
    if (request.method == 'POST'):
        idespecialista = request.POST.get('idespecialista')
        try:
            especialista = UsuariosEspecialistas.objects.get(id=idespecialista)    
            archivo = especialista.foto.path
            form = UploadPhotoForm(request.POST, request.FILES, instance=especialista)
            if form.is_valid():
                if os.path.exists(archivo):
                    os.remove(archivo)
                especialista = form.save()
                foto_url = especialista.foto.url if especialista.foto else None
                data = {'foto_url': foto_url, 'message': 'Foto cargada exitosamente'}
            else:
                data = {'foto_url': None, 'message': form.errors}
        except UsuariosEspecialistas.DoesNotExist:
            data = {'foto_url': None, 'message': 'Especialista no encontrado'}
    else:
        data = {'foto_url': None, 'message': 'Solicitud inválida'}
    return JsonResponse(data)


def especialista_cargardocumento(request):
    
    if (request.method == 'POST'):
        idespecialista = request.POST.get('idespecialista')
        idcliente = request.POST.get('idcliente')
        titulo = request.POST.get('titulo')
        try:
            especialistadoc = EspecialistasDocumentos.objects.create(titulo=titulo,especialista_id=idespecialista,cliente_id=idcliente)
            form = UploadFileForm(request.POST, request.FILES, instance=especialistadoc)
            if form.is_valid():
                archivo = especialistadoc.archivo.path
                crear_directorios_documentos(archivo)
                especialistadoc = form.save()
                doc_url = especialistadoc.archivo.url if especialistadoc.archivo else None
                data = {'doc_url': doc_url, 'message': 'Documento cargado exitosamente'}
            else:
                data = {'doc_url': None, 'message': form.errors}
        except Exception as e:
            data = {'doc_url': None, 'message': 'Documento no cargado. Error'+str(e)}
    else:
        data = {'doc_url': None, 'message': 'Solicitud inválida'}
    return JsonResponse(data)


def especialista_cargarimagen(request):
    if request.method == 'POST':
        idespecialista = request.POST.get('idespecialista')
        idcliente = request.POST.get('idcliente')
        titulo = request.POST.get('titulo')
        try:
            especialistaimg = EspecialistasImagenes.objects.create(titulo=titulo,especialista_id=idespecialista,cliente_id=idcliente)
            form = UploadImageForm(request.POST, request.FILES, instance=especialistaimg)
            if form.is_valid():
                archivo = especialistaimg.imagen.path
                crear_directorios_documentos(archivo)
                especialistaimg = form.save()
                doc_url = especialistaimg.imagen.url if especialistaimg.imagen else None
                data = {'imagen_url': doc_url, 'message': 'Imagen cargada exitosamente'}
            else:
                data = {'imagen_url': None, 'message': form.errors}
        except Exception as e:
            data = {'imagen_url': None, 'message': 'Imagen no cargada. Error'+str(e)}
    else:
        data = {'imagen_url': None, 'message': 'Solicitud inválida'}
    return JsonResponse(data)

