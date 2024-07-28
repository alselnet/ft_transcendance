from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .game_logic import PongGame
from .models import Game

ball_speed = 20
player_speed = 7
pong_game = PongGame(ball_speed, player_speed)

class LocalGameInitView(APIView):
    def get(self, request, room_name):
        pong_game.reset_game()
        return Response({'message': f'Local game {room_name} initialized'}, status=status.HTTP_200_OK)

class LocalPlayerMoveView(APIView):
    def post(self, request, room_name, player):
        direction = request.data.get('direction')
        if direction == 'up':
            pong_game.update_player_position(player, -1)
        elif direction == 'down':
            pong_game.update_player_position(player, 1)
        return Response({'message': f'Player {player} moved {direction}'}, status=status.HTTP_200_OK)

class LocalGameStateView(APIView):
    def get(self, request, room_name):
        pong_game.update_ball_position()
        state = {
            'player1_y_position': pong_game.player1_y_position,
            'player2_y_position': pong_game.player2_y_position,
            'ball_x_position': pong_game.ball_x_position,
            'ball_y_position': pong_game.ball_y_position,
            'score_player1': pong_game.score_player1,
            'score_player2': pong_game.score_player2
        }
        return Response(state, status=status.HTTP_200_OK)

class LocalStartBallView(APIView):
    def post(self, request, room_name):
        pong_game.start_ball_movement()
        return Response({'message': 'Ball movement started'}, status=status.HTTP_200_OK)

def pong_game_view(request):
    return render(request, 'srcs/ft_transcendance/ft_transcendance/assets/src/app/pages/Game.js')

def save_game_result(room_name, winner):
    Game.objects.create(
        room_name=room_name,
        player1_score=pong_game.score_player1,
        player2_score=pong_game.score_player2,
        winner=winner
    )