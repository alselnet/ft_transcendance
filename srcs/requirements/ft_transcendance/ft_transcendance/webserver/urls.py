from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers
from webserver import views
from webserver.views import GameSummaryView, UserRegistration, UserSignin

router = routers.DefaultRouter()
router.register(r'gamesummaries', views.GameSummaryView, 'gamesummary')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
	path('api/register/', UserRegistration.as_view(), name='user-registration'),
	path('api/signin/', UserSignin.as_view(), name='user-registration'),
	re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
]