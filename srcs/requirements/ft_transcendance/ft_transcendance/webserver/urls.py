
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from webserver import views
from webserver.views import GameSummaryView, UserRegistrationView, UserSigninView, Callback, UpdateEmailView, UpdateUsernameView, UpdatePasswordView, FortyTwoLoginView, PublicUserInfoView, CsrfTokenView, AddFriendView, RemoveFriendView, FriendListView

router = routers.DefaultRouter()
router.register(r'gamesummaries', views.GameSummaryView, 'gamesummary')


urlpatterns = [
	path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
	path('api/csrf_token', CsrfTokenView, name='csrf_token_view'),
	path('api/user/<str:username>', PublicUserInfoView.as_view(), name='public_user_info'),
	path('api/register', UserRegistrationView.as_view(), name='user-registration'),
	path('api/signin', UserSigninView.as_view(), name='user-registration'),
	path('api/update_username', UpdateUsernameView.as_view(), name='username-update'),
	path('api/update_email', UpdateEmailView.as_view(), name='email-update'),
	path('api/update_password', UpdatePasswordView.as_view(), name='password-update'),
	path('api/42login', FortyTwoLoginView, name='forty-two-login'),
	path('api/callback', Callback.as_view(), name='callback'),
	path('api/user/<str:username>/addfriend/<str:friend_username>/', AddFriendView.as_view(), name='add-friend'),
    path('api/user/<str:username>/unfriend/<str:friend_username>/', RemoveFriendView.as_view(), name='remove-friend'),
	path('api/user/<str:username>/friendlist/', FriendListView.as_view(), name='friend-list'),
	re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html"))
]