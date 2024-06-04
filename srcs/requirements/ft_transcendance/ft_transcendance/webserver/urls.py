
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from webserver import views
from webserver.views import GameSummaryView, UserRegistration, UserSignin, Callback, Generate2FACodeView

router = routers.DefaultRouter()
router.register(r'gamesummaries', views.GameSummaryView, 'gamesummary')

urlpatterns = [
	path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
	path('api/register/', UserRegistration.as_view(), name='user-registration'),
	path('api/signin/', UserSignin.as_view(), name='user-registration'),
	path('api/42login', views.FortyTwoLogin, name='forty-two-login'),
	path('api/callback', Callback.as_view(), name='callback'),
	re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
	path('api/generate-2fa-code/', Generate2FACodeView.as_view(), name='verify-2fa-code'),
]