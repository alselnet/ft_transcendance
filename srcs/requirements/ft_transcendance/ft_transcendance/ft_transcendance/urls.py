from django.urls import path, include
from django.contrib import admin
from pong.views import pong_game

urlpatterns = [
	path('admin', admin.site.urls),
	path('', include('webserver.urls')),
    path('pong/', include('pong.urls')),
    
]