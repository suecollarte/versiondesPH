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
    path('personas_verpersona/', views.personas_verpersona.as_view(), name='personas_verpersona'),
    
    ]
