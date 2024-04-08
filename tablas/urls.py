#
# urls.py tablas
#
from django.urls import path
from . import views

urlpatterns = [

    path('regiones/', views.regiones, name='regiones'),
    path('ciudades/', views.ciudades, name='ciudades'),
    path('comunas/', views.comunas, name='comunas'),
    path('categorias/', views.categorias, name='categorias'),
    path('subcategorias/', views.subcategorias, name='subcategorias'),
    path('rubros/', views.rubros, name='rubros'),
    path('formapagosalud/', views.formapagosalud, name='formapagosalud'),
    path('formapagogral/', views.formapagogral, name='formapagogral'),
    path('tipoprevision/', views.tipoprevision, name='tipoprevision'),
    path('modalidadatencion/', views.modalidadatencion, name='modalidadatencion'),
    path('promociones/', views.promociones, name='promociones'),

]
