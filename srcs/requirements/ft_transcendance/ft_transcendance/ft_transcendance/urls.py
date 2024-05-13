from django.urls import path, include

urlpatterns = [
	path('', include('webserver.urls')),
]