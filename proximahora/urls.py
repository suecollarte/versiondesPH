"""
URL configuration for proximahora project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('__debug__/', include('debug_toolbar.urls')),
    path('', views.home),
    path('home', views.home, name='home'),
    path('ingresar_plataforma/', views.ingresar_plataforma, name='ingresar_plataforma'),
    path('salir_plataforma/', views.salir_plataforma, name='salir_plataforma'),
    path('administrador/', views.administrador, name='administrador'),
    path('registrado/', views.registrado, name='registrado'),
    path('especialista/', views.especialista, name='especialista'),
    path('about/', views.about, name='about'),
    path('ayuda/', views.ayuda, name='ayuda'),
    path('test/', views.test, name='test'),     
    path('tablas/', include ('tablas.urls')),
    path('usuarios/', include ('usuarios.urls')),
    path('especialistas/', include ('especialistas.urls')),
    path("blog", include('blog.urls')),
        
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
