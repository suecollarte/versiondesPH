# 
#  funciones.py
#
from datetime import datetime
import calendar

class Constantes:
    REGIONMETRO = 13
    CIUDADSTGO = 325
    COMUNASTGO = 13101
    MEDICINA = 1
    MEDICOCIRUJANO = 1
    CIRUJANOGRAL = 1
    ESPANOL = 0
    INGLES = 1


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
