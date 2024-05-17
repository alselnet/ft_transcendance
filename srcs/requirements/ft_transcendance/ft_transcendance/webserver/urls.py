from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from webserver import views
from webserver.views import GameSummaryView, UserRegistration

router = routers.DefaultRouter()
router.register(r'gamesummaries', views.GameSummaryView, 'gamesummary')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
	path('register/', UserRegistration.as_view(), name='user-registration'),
    path('', TemplateView.as_view(template_name='index.html')),
]