from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import FortyTwoLoginView, UserRegistrationView, UserSigninView, UserSignoutView, UserDeletionView, Callback, CsrfTokenView, Generate2FACodeView, Validate2FACodeView, SendConfirmationEmailView, ConfirmEmailView, Update2FAStatusView, InitialAuthenticationView

urlpatterns = [
	path('42login/', FortyTwoLoginView, name='forty-two-login'),
	path('callback/', Callback.as_view(), name='callback'),
    path('confirm-email/<str:token>/', ConfirmEmailView.as_view(), name='confirm-email'),
	path('csrf-token/', CsrfTokenView, name='csrf_token_view'),
	path('delete-user/', UserDeletionView.as_view(), name='user-deletion'),
	path('generate-2fa-code/', Generate2FACodeView.as_view(), name='generate-2fa-code'),
    path('validate-2fa-code/', Validate2FACodeView.as_view(), name='validate-2fa-code'),
	path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('send-confirmation-email/', SendConfirmationEmailView.as_view(), name='send-confirmation-email'),
	path('signin/', UserSigninView.as_view(), name='user-signin'),
	path('signout/', UserSignoutView.as_view(), name='user-signout'),
	path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('update-2fa/', Update2FAStatusView.as_view(), name='2fa-update'),
    path('initial-auth/', InitialAuthenticationView.as_view(), name='initial-auth'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)