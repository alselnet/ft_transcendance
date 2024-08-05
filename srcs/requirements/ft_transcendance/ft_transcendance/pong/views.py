from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .game_logic import PongGame

ball_speed = 20
player_speed = 7
ball_size = 8
pong_game = PongGame(ball_speed, player_speed, ball_size)

active_rooms = set()

class LocalGameInitView(APIView):
    def get(self, request, room_name):
        if len(room_name) > 15:
            return Response({'error': 'Room name must be less than 15 characters'}, status=status.HTTP_400_BAD_REQUEST)
        
        if ' ' in room_name:
            return Response({'error': 'Room name must not contain spaces'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not room_name:
            return Response({'error': 'Room name must not be empty'}, status=status.HTTP_400_BAD_REQUEST)

        if room_name in active_rooms:
            return Response({'error': 'Room already exists'}, status=status.HTTP_400_BAD_REQUEST)

        active_rooms.add(room_name)
        pong_game.view_init()
        return Response({'message': f'Local game {room_name} initialized'}, status=status.HTTP_200_OK)

class LocalGameCloseView(APIView):
    def get(self, request, room_name):
        if room_name in active_rooms:
            active_rooms.remove(room_name)
            return Response({'message': f'Local game {room_name} closed'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Room does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class LocalPlayerMoveView(APIView):
    def post(self, request, room_name, player):
        if room_name not in active_rooms:
            return Response({'error': 'Room does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        direction = request.data.get('direction')
        if direction == 'up':
            pong_game.update_player_position(player, -1)
        elif direction == 'down':
            pong_game.update_player_position(player, 1)
        return Response({'message': f'Player {player} moved {direction}'}, status=status.HTTP_200_OK)

class LocalGameStateView(APIView):
    def get(self, request, room_name):
        if room_name not in active_rooms:
            return Response({'error': 'Room does not exist'}, status=status.HTTP_400_BAD_REQUEST)
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
        if room_name not in active_rooms:
            return Response({'error': 'Room does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        pong_game.start_ball()
        return Response({'message': 'Ball movement started'}, status=status.HTTP_200_OK)

def pong_game_view(request):
    return render(request, 'srcs/ft_transcendance/ft_transcendance/assets/src/app/pages/Game.js')