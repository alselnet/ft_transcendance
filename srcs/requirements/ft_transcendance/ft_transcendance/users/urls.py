from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
# from .views import MeView, MyGameHistory, FriendListView, ChangeAvatarView, UpdateEmailView, UpdatePasswordView, UpdateUsernameView, UpdateStatus, PublicUserInfoView, PublicGameHistoryView, AddFriendView, RemoveFriendView
from .views import MeView, MyGameHistory

urlpatterns = [
	path('me/', MeView.as_view(), name='me'),
	path('game_history/', MyGameHistory.as_view(), name='my-history'),
	# path('friendlist/', FriendListView.as_view(), name='friend-list'),
	# path('update_avatar/', ChangeAvatarView.as_view(), name='change-avatar'),
	# path('update_email/', UpdateEmailView.as_view(), name='email-update'),
	# path('update_password/', UpdatePasswordView.as_view(), name='password-update'),
	# path('update_username/', UpdateUsernameView.as_view(), name='username-update'),
	# path('update-status/', UpdateStatus.as_view(), name='profile-status-update'), # PUT request, json : status "online", "offline" or "in-game"
	# path('<str:username>/', PublicUserInfoView.as_view(), name='public_user_info'),
	# path('<str:username>/game_history/', PublicGameHistoryView.as_view(), name='profile'),
	# path('addfriend/<str:friend_username>/', AddFriendView.as_view(), name='add-friend'),
    # path('unfriend/<str:friend_username>/', RemoveFriendView.as_view(), name='remove-friend'),
   ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)