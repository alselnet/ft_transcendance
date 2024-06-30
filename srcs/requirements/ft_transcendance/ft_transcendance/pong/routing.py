from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'api/game/(?P<room_name>\w+)/$', consumers.PongConsumer.as_asgi()),
    re_path(r'api/local_game/(?P<room_name>\w+)/$', consumers.PongConsumer.as_asgi()),
]