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
    path('validarlogin/', views.validarlogin, name='validarlogin'),
    path('dologin/', views.dologin, name='dologin'), 
    path('enviarcontacto/', views.enviarcontacto, name='enviarcontacto'),     
    path('registro_inicio/<int:solicita>/', views.registro_inicio, name='registro_inicio'),  
    path('suscripcion_enviar/', views.suscripcion_enviar, name='suscripcion_enviar'),             
    path('suscripcion_final/<int:solicita>/<str:rut>/<str:token>/', views.suscripcion_final, name='suscripcion_final'),      
    path('suscripcion_pagar/', views.suscripcion_pagar, name='suscripcion_pagar'),  
    path('suscripcion_formulario_pago/<str:rut>/<str:token>/', views.suscripcion_formulario_pago, name='suscripcion_formulario_pago'),  
    path('suscripcion_cargar_pago/', views.suscripcion_cargar_pago, name='suscripcion_cargar_pago'),  
    path('registro_usuario_crear/', views.registro_usuario_crear, name='registro_usuario_crear'), 
    path('registros_pendientes/<int:solicita>/', views.registros_pendientes, name='registros_pendientes'),      
    path('cancelaregistro_pendiente/', views.cancelaregistro_pendiente, name='cancelaregistro_pendiente'),      
    path('reenvia_primermail/', views.reenvia_primermail, name='reenvia_primermail'),           
    path('suscripciones_por_aprobar/', views.suscripciones_por_aprobar, name='suscripciones_por_aprobar'),  
    path('suscripciones_cambiar_estado/', views.suscripciones_cambiar_estado, name='suscripciones_cambiar_estado'),               
    path('reenvia_mail_url_pago/', views.reenvia_mail_url_pago, name='reenvia_mail_url_pago'),          
       
       
    ]
