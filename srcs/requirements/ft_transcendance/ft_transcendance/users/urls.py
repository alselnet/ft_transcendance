from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import MeView, MyGameHistory, FriendListView, UpdateAvatarView, UpdateEmailView, UpdatePasswordView, UpdateUsernameView, UpdateStatusView, PublicUserInfoView, PublicGameHistoryView, AddFriendView, RemoveFriendView

urlpatterns = [
	path('me/', MeView.as_view(), name='me'),
	path('friendlist/', FriendListView.as_view(), name='friend-list'),
	path('game_history/', MyGameHistory.as_view(), name='my-history'),
	path('update_avatar/', UpdateAvatarView.as_view(), name='avatar-update'),
	path('update_email/', UpdateEmailView.as_view(), name='email-update'),
	path('update_status/', UpdateStatusView.as_view(), name='status-update'),
	path('update_password/', UpdatePasswordView.as_view(), name='password-update'),
	path('update_username/', UpdateUsernameView.as_view(), name='username-update'),
	path('<str:username>/', PublicUserInfoView.as_view(), name='public_user_info'),
	path('<str:username>/game_history/', PublicGameHistoryView.as_view(), name='profile'),
	path('addfriend/<str:friend_username>/', AddFriendView.as_view(), name='add-friend'),
    path('unfriend/<str:friend_username>/', RemoveFriendView.as_view(), name='remove-friend')
   ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)