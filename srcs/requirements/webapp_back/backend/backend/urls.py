from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include
from rest_framework import routers
from ft_transcendance import views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('home/', views.index, name='index'),
]
