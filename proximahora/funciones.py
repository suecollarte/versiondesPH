# 
#  funciones.py
#
from datetime import datetime
import calendar
ESPANOL = 0
INGLES = 1

def number_unformat(nump,formato=ESPANOL):
    if nump == "":
        numx = "0"
    else:
        nums = str(nump)
        if formato == ESPANOL:
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

