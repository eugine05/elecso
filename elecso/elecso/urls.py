"""elecso URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from django.urls import re_path
from firstapp import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# from django.views.defaults import page_not_found

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ajax/', views.ajax),
    path('multisend/', views.multisend),
    path('search/', views.search),
    path('kontakty', views.kontakty),
    path('poleznaya-informaciya', views.poleznaya),
    path('poleznaya-informaciya/<slug:id>', views.post),
    path('uslugi/prodazha-elektrooborudovaniya/<slug:id>', views.page3), 
    path('zakaz-i-dostavka/<slug:id>', views.page2),
    path('uslugi/<slug:id>', views.page2),
    path('<slug:id>', views.page1),
    path('', views.index),
]


urlpatterns += staticfiles_urlpatterns()
