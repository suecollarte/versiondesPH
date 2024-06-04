# 
#  funciones.py
#
""" En este modulo se definen alguna funciones varias
"""
    
from datetime import datetime
import calendar
import os

from django.conf import settings

class Constantes:
    REGIONMETRO = 13
    CIUDADSTGO = 325
    COMUNASTGO = 13101
    MEDICINA = 1
    MEDICOCIRUJANO = 1
    CIRUJANOGRAL = 1
    ESPANOL = 0
    INGLES = 1
    PATH_FOTOS = 'fotos/'
    PATH_DOCUMENTOS = 'documentos/'

class FuncionesAjax:
    ELIMINAR = '0'
    CREAR = '1'
    MODIFICAR = '2'
    
    
def number_unformat(nump,formato=Constantes.ESPANOL):
    if nump == "":
        numx = "0"
    else:
        nums = str(nump)
        if formato == Constantes.ESPANOL:
            nums = nums.replace(".", "")
            numx = nums.replace(",", ".")
        else: 
            numx = nums.replace(",", "")
    return numx


def ultima_fecha_del_mes(anio, mes):
    ultimo_dia = calendar.monthrange(anio, mes)[1]
    ultima_fecha = datetime(anio, mes, ultimo_dia)
    return ultima_fecha


def fecha_str_to_sql(fecha_str):
    fecha = datetime.strptime(fecha_str, '%d-%m-%Y')
    fecha_nuevo_formato = fecha.strftime('%Y-%m-%d')
    return fecha_nuevo_formato


def fecha_sql_to_str(fecha_str):
    fecha_nuevo_formato = fecha_str.strftime('%d-%m-%Y')
    return fecha_nuevo_formato


def uploaddocu_location(instance, filename):
    return f"{Constantes.PATH_DOCUMENTOS}/{instance.persona.usuario.username}/{instance.cliente.username}/{filename}"


def uploadfoto_location(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{instance.persona.usuario.username}.{ext}"
#    return os.path.join(instance.upload_to,  new_filename)   
    return os.path.join(Constantes.PATH_FOTOS, new_filename)   


def crear_directorios_documentos(filename):
    carpeta = filename.split('/')
    dir1 = f"{Constantes.PATH_DOCUMENTOS}/{carpeta[1]}"
    full_path = os.path.join(settings.MEDIA_ROOT, dir1)
    if not os.path.isdir(full_path):
        os.mkdir(full_path,mode = 777)
    dir2 = f"{full_path}/{carpeta[2]}"
    if not os.path.isdir(dir2):
        os.mkdir(dir2,mode = 777)
        
        
