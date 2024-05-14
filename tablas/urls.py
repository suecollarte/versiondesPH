#
# urls.py tablas
#
from django.urls import path
from . import views

urlpatterns = [

    path('regiones/', views.regiones, name='regiones'),
    path('ciudades/', views.ciudades, name='ciudades'),
    path('selectciudades', views.selectciudades, name='selectciudades'),
    path('comunas/', views.comunas, name='comunas'),
    path('selectcomunas', views.selectcomunas, name='selectcomunas'),
    path('categorias/', views.categorias, name='categorias'),
    path('selectcategorias', views.selectcategorias, name='selectcategorias'),
    path('subcategorias/', views.subcategorias, name='subcategorias'),
    path('selectsubcategorias', views.selectsubcategorias, name='selectsubcategorias'),    
    path('rubros/', views.rubros, name='rubros'),
    path('formapagosalud/', views.formapagosalud, name='formapagosalud'),
    path('formapagogral/', views.formapagogral, name='formapagogral'),
    path('tipoprevision/', views.tipoprevision, name='tipoprevision'),
    path('modalidadatencion/', views.modalidadatencion, name='modalidadatencion'),
    path('promociones/', views.promociones, name='promociones'),
    path('planes/', views.planes, name='planes'),
]
