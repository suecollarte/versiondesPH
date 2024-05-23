#
# urls.py especialistas
#
from django.urls import path
from . import views

urlpatterns = [

    path('especialistas_listar/', views.especialistas_listar, name='especialistas_listar'),
    path('especialistas_detalle/', views.especialistas_detalle, name='especialistas_detalle'),
    path('especialistas_verespecialista/', views.especialistas_verespecialista.as_view(), name='especialistas_verespecialista'),
    path('especialistas_verificarut/', views.especialistas_verificarut.as_view(), name='especialistas_verificarut'),
    path('especialistas_cambiarestado/', views.especialistas_cambiarestado, name='especialistas_cambiarestado'),
    
    ]
