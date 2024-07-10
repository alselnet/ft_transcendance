from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import GameSummaryView, UpdateEmailView, UpdateUsernameView, UpdatePasswordView, PublicUserInfoView, AddFriendView, RemoveFriendView, FriendListView, ProfileStatusUpdateView, ProfileView
from .views import ChangeAvatarView

urlpatterns = [
	path('update_username/', UpdateUsernameView.as_view(), name='username-update'),
	path('update_email/', UpdateEmailView.as_view(), name='email-update'),
	path('update_password/', UpdatePasswordView.as_view(), name='password-update'),
	path('<str:username>/', PublicUserInfoView.as_view(), name='public_user_info'),
	path('<str:username>/addfriend/<str:friend_username>/', AddFriendView.as_view(), name='add-friend'),
    path('<str:username>/unfriend/<str:friend_username>/', RemoveFriendView.as_view(), name='remove-friend'),
	path('<str:username>/friendlist/', FriendListView.as_view(), name='friend-list'),
	path('<str:username>/update-status/', ProfileStatusUpdateView.as_view(), name='profile-status-update'), # PUT request, json : status "online", "offline" or "in-game"
	path('<str:username>/profile/', ProfileView.as_view(), name='profile'),
	path('change-avatar/', ChangeAvatarView.as_view(), name='change-avatar')
   ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)