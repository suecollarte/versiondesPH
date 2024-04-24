#
# urls.py usuarios
#
from django.urls import path
from . import views

urlpatterns = [

    path('personas_listar/', views.personas_listar, name='personas_listar'),
    path('personas_password/', views.personas_password, name='personas_password'),
    path('personas_verregistro/', views.personas_verregistro.as_view(), name='personas_verregistro'),
    path('personas_cambiarestado/', views.personas_cambiarestado, name='personas_cambiarestado'),
    path('especialistas_listar/', views.especialistas_listar, name='especialistas_listar'),
    path('especialistas_verpersona/', views.especialistas_verpersona.as_view(), name='especialistas_verpersona'),
    ]
