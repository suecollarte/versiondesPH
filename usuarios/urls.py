#
# urls.py usuarios
#
from django.urls import path
from . import views

urlpatterns = [

    path('personas_listar/', views.personas_listar, name='personas_listar'),
    path('personas_password/', views.personas_password, name='personas_password'),
    path('personas_cambiarestado/', views.personas_cambiarestado, name='personas_cambiarestado'),
    path('personas_verificarut/', views.personas_verificarut, name='personas_verificarut'),
    path('especialistas_listar/', views.especialistas_listar, name='especialistas_listar'),
    path('especialistas_verpersona/', views.especialistas_verpersona.as_view(), name='especialistas_verpersona'),
    path('especialistas_verespecialista/', views.especialistas_verespecialista.as_view(), name='especialistas_verespecialista'),
    path('especialistas_verificarut/', views.especialistas_verificarut, name='especialistas_verificarut'),
    path('especialistas_cambiarestado/', views.especialistas_cambiarestado, name='especialistas_cambiarestado'),
    
    ]
