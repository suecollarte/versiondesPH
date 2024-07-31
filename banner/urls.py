from django.urls import path

from . import views


urlpatterns=[

    path("", views.banners, name="banners"),
    path('<int:id>/', views.banner, name="banner"),
]