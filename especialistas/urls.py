#
# urls.py especialistas
#
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [

    path('especialistas_listar/', views.especialistas_listar, name='especialistas_listar'),
    path('especialistas_detalle/', views.especialistas_detalle, name='especialistas_detalle'),
    path('especialistas_verespecialista/', views.especialistas_verespecialista.as_view(), name='especialistas_verespecialista'),
    path('especialistas_verificarut/', views.especialistas_verificarut.as_view(), name='especialistas_verificarut'),
    path('especialistas_cambiarestado/', views.especialistas_cambiarestado, name='especialistas_cambiarestado'),
    path('especialista_cargarfoto/', views.especialista_cargarfoto, name='especialista_cargarfoto'),    
    path('especialista_cargarimagen/', views.especialista_cargarimagen, name='especialista_cargarimagen'),    
    path('especialista_cargardocumento/', views.especialista_cargardocumento, name='especialista_cargardocumento'),    
    path('especialistas_buscar/', views.especialistas_buscar, name='especialistas_buscar'),   
    path('especialistas_buscar_detalle/', views.especialistas_buscar_detalle, name='especialistas_buscar_detalle'),   
          
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)