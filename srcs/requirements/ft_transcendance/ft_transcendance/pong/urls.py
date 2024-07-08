from django.urls import path
from .views import (
    LocalGameInitView, LocalPlayerMoveView, LocalGameStateView, LocalStartBallView,
    pong_game_view
)

urlpatterns = [
    path('init/<str:room_name>/', LocalGameInitView.as_view(), name='local-game-init'),
    path('move/<str:room_name>/<int:player>/', LocalPlayerMoveView.as_view(), name='local-player-move'),
    path('state/<str:room_name>/', LocalGameStateView.as_view(), name='local-game-state'),
    path('start/<str:room_name>/', LocalStartBallView.as_view(), name='local-start-ball'),
    path('', pong_game_view, name='pong-game-view'),
]