from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import MeView, MyGameHistory, FriendListView, UpdateAvatarView, UpdateEmailView, UpdatePasswordView, UpdateUsernameView, UpdateStatusView, PublicUserInfoView, PublicGameHistoryView, AddFriendView, RemoveFriendView
urlpatterns = [
	path('me/', MeView.as_view(), name='me'),
	path('friendlist/', FriendListView.as_view(), name='friend-list'),
	path('game-history/', MyGameHistory.as_view(), name='my-history'),
	path('update-avatar/', UpdateAvatarView.as_view(), name='avatar-update'),
	path('update-email/', UpdateEmailView.as_view(), name='email-update'),
	path('update-status/', UpdateStatusView.as_view(), name='status-update'),
	path('update-password/', UpdatePasswordView.as_view(), name='password-update'),
	path('update-username/', UpdateUsernameView.as_view(), name='username-update'),
	path('<str:username>/', PublicUserInfoView.as_view(), name='public-user-info'),
	path('<str:username>/game-history/', PublicGameHistoryView.as_view(), name='profile'),
	path('add-friend/<str:username>/', AddFriendView.as_view(), name='add-friend'),
    path('unfriend/<str:username>/', RemoveFriendView.as_view(), name='remove-friend'),
   ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)