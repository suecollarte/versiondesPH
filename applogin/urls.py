#
# urls.py usuarios
#
from django.urls import path
from . import views

urlpatterns = [

    path('userlogin/', views.userlogin, name='userlogin'),
    path('validarlogin/', views.validarlogin, name='validarlogin'),
    path('usercrearlogin/', views.usercrearlogin, name='usercrearlogin'),
    path('dologin/', views.dologin, name='dologin'),  
          
    ]
