# 
#  funciones.py
#
""" En este modulo se definen alguna funciones varias
"""
    
from datetime import datetime, timedelta,date
from django.conf import settings
import calendar
import os
import re
from dateutil.relativedelta import relativedelta


class ErroresPH:
    ERROR_DESCONOCIDO = 0
    ERROR_ACCESO = 1
    ERROR_LECTURA = 2
    ERROR_ESCRITURA = 3
    ERROR_DATOEXISTE = 4
    ERROR_DATONOEXISTE = 5
    ERROR_TIPODATO = 6
    ERROR_FALTAPARAM = 7
    ERROR_ERRORPARAM = 8
    ERRORESPH = [
        (ERROR_DESCONOCIDO, 'ERROR DESCONOCIDO'),
        (ERROR_ACCESO, 'ERROR TIPO DE ACCESO'),
        (ERROR_LECTURA, 'ERROR LECTURA EN BD'),
        (ERROR_ESCRITURA, 'ERROR ESCRITURA EN BD'),
        (ERROR_DATOEXISTE, 'ERROR INFORMACION YA EXISTE'),
        (ERROR_DATONOEXISTE, 'ERROR INFORMACION NO EXISTE'),
        (ERROR_TIPODATO, 'ERROR TIPO DE DATO NO EXISTE'),
        (ERROR_FALTAPARAM, 'ERROR FALTAN PARAMETROS'),
        (ERROR_ERRORPARAM, 'ERROR EN PARAMETROS'),
        ]
    
    
class Constantes:
    REGIONMETRO = 13
    CIUDADSTGO = 325
    COMUNASTGO = 13101
    MEDICINA = 1
    MEDICOCIRUJANO = 1
    CIRUJANOGRAL = 1
    ESPANOL = 0
    INGLES = 1
    MAIL_ADMIN = 'aconlledo@vilco.cl'
    PATH_FOTOS = 'especialistas/fotos/'
    PATH_DOCUMENTOS = 'especialistas/documentos/'
    PATH_PAGOS = 'especialistas/pagos/'
    URL_PROXIMAHORAPROD = 'http://www.proximahora.cl'
    URL_PROXIMAHORATEST = 'http://127.0.0.1:8000'
    PDF_CONFIDENCIALIDAD = 'media/proximahora/privacidad.pdf'
        
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
    
    try:
        fecha1 = datetime.strptime(fecha_str, '%Y-%m-%d').date()
    except:
        fecha1 = fecha_str
    try:
        fecha_nuevo_formato = fecha1.strftime('%d-%m-%Y')
    except Exception as e:
        return(f"Error: {e}")
    return fecha_nuevo_formato


def uploaddocu_location(instance, filename):
    return f"{Constantes.PATH_DOCUMENTOS}/{instance.persona.usuario.username}/{instance.cliente.username}/{filename}"


def uploadfoto_location(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{instance.persona.usuario.username}.{ext}"
    return os.path.join(Constantes.PATH_FOTOS, new_filename)   


def crear_directorio_documentos(filename):
    carpeta = filename.split('/')
    dir1 = f"{Constantes.PATH_DOCUMENTOS}/{carpeta[1]}"
    full_path = os.path.join(settings.MEDIA_ROOT, dir1)
    if not os.path.isdir(full_path):
        os.mkdir(full_path,mode = 777)
    dir2 = f"{full_path}/{carpeta[2]}"
    if not os.path.isdir(dir2):
        os.mkdir(dir2,mode = 777)


def uploadpago_location(instance, filename):
    ''' 
    Agrega el rut sin formato como subcarpeta antes del nombre del archivo. Ej banco.pdf queda 7777777/banco.pdf
    Retorna especialistas/pagos/74510887/banco.pdf
    '''
    new_filename = f"{instance.uname}/{filename}"
    return os.path.join(Constantes.PATH_PAGOS,new_filename)   


def crear_directorio_pagos(username):
    ''' 
    Verifica que si el directorio /media/especialistas/pagos/74510887/  
    existe o no y si no existe lo crea 
    '''
    full_path = os.path.join(settings.MEDIA_ROOT, f"{Constantes.PATH_PAGOS}/{username}/")
    if not os.path.isdir(full_path):
        os.mkdir(full_path,mode = 777)


def rut_formateado(rut):
    numero, digito = rut[:-1], rut[-1].upper()
    numero_formateado = "{:,}".format(int(numero)).replace(",", ".")
    return f"{numero_formateado}-{digito}"


def rut_sin_formato(rut):
    numero, digito = rut[:-1], rut[-1].upper()
    numero_formateado = "{:,}".format(int(numero)).replace(",", ".")
    return f"{numero_formateado}-{digito}"


def rut_a_username(rut):
    ''' 
    Elimina puntos y guion de un rut el cual se usa como username  
    Ej: Rut 7.777.777-K queda como  7777777K
    '''
    newrut = re.sub(r'[.-]', '', rut)
    return newrut
 
 
def fecha_de_hoy():
    return  date.today()


def add_months_to_date(date_str, months):
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        new_date = date_obj + relativedelta(months=+int(months))
    except Exception as e:
        return(f"Error: {e}")
    return str(new_date)
  
      
def mostrar_fecha_actual():
    # Obtener la fecha y hora actual
    now = datetime.now()
    dia1= now+ timedelta(days=1)
    dia2=dia1+ timedelta(days=1)
    dia3=dia2+ timedelta(days=1)
    dia4=dia3+ timedelta(days=1)

    dias_semana = {
        0: 'Lunes',
        1: 'Martes',
        2: 'Miércoles',
        3: 'Jueves',
        4: 'Viernes',
        5: 'Sábado',
        6: 'Domingo'
    }
    dia_semana = dias_semana[now.weekday()]
    mes_y_anio = now.strftime('%B %Y')  # Formato completo del mes y el año, por ejemplo "Mayo 2024"
    return dia_semana , mes_y_anio, now.strftime("%d/%m/%Y") , dia1.strftime("%d/%m/%Y"),dia2.strftime("%d/%m/%Y"),dia3.strftime("%d/%m/%Y"),dia4.strftime("%d/%m/%Y")
       
        
def enmascarar_email(email):
    
    usuario, dominio = email.split('@')  # Separar el nombre de usuario y el dominio
    usuario_enmascarado = usuario[0] + '*' * (len(usuario) - 1) # Enmascarar el nombre de usuario dejando el primer carácter visible
    dominio_nombre, tld = dominio.rsplit('.', 1) # Separar el dominio en la parte antes del punto y el TLD
    dominio_enmascarado = '*' * len(dominio_nombre) + '.' + tld  # Enmascarar el dominio dejando solo el TLD visible
    email_enmascarado = usuario_enmascarado + '@' + dominio_enmascarado # Combinar el usuario enmascarado con el dominio enmascarado 
    return email_enmascarado

