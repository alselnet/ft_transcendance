from django.urls import path, include
from django.contrib import admin

urlpatterns = [
	path('admin/', admin.site.urls),
    path('pong/', include('pong.urls')),
	path('api/user/', include('users.urls')),
	path('api/auth/', include('authentication.urls'))
]