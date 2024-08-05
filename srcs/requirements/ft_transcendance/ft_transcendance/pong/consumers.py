import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .game_logic import PongGame
import asyncio
import logging

logger = logging.getLogger(__name__)

class PongConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'game_{self.room_name}'
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        self.connected = True
        self.configured = False

    async def disconnect(self, close_code):
        self.connected = False
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        if hasattr(self, 'update_task'):
            self.update_task.cancel()
            try:
                await self.update_task
            except asyncio.CancelledError:
                pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['type'] == 'config' and not self.configured:
            ball_speed = float(data['ball_speed'])
            paddle_speed = float(data['paddle_speed'])
            ball_size = float(data['ball_size'])
            self.pong_game = PongGame(ball_speed, paddle_speed, ball_size)
            self.configured = True
            self.update_task = asyncio.create_task(self.update_game_state())
        elif data['type'] == 'move':
            player = data['player']
            direction = 1 if data['direction'] == 'down' else -1
            self.pong_game.update_player_position(player, direction)
        elif data['type'] == 'start_ball':
            self.pong_game.start_ball_movement()

        await self.send_game_state()

    async def send_game_state(self):
        if self.connected:
            game_state = {
                'type': 'game_state',
                'player1_y_position': self.pong_game.player1_y_position,
                'player2_y_position': self.pong_game.player2_y_position,
                'ball_x_position': self.pong_game.ball_x_position,
                'ball_y_position': self.pong_game.ball_y_position,
                'score_player1': self.pong_game.score_player1,
                'score_player2': self.pong_game.score_player2
            }
            try:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_state',
                        'game_state': game_state
                    }
                )
            except Exception as e:
                logger.error(f"Error sending game state: {e}")

            if self.pong_game.game_over:
                try:
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'game_over',
                            'winner': self.pong_game.winner,
                            'score_player1': self.pong_game.score_player1,
                            'score_player2': self.pong_game.score_player2
                        }
                    )
                except Exception as e:
                    logger.error(f"Error sending game over message: {e}")

                if self.pong_game.game_over:
                    await self.handle_game_over()

    async def handle_game_over(self):
        try:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_over',
                    'winner': self.pong_game.winner,
                    'score_player1': self.pong_game.score_player1,
                    'score_player2': self.pong_game.score_player2
                }
            )
        except Exception as e:
            logger.error(f"Error sending game over message: {e}")
        finally:
            self.connected = False
            await self.disconnect(close_code=1000)

    async def game_state(self, event):
        try:
            if self.channel_layer and self.channel_name:
                await self.send(text_data=json.dumps(event['game_state']))
            else:
                logger.warning("Connection is closed. Cannot send message.")
        except Exception as e:
            logger.error(f"Error sending message: {e}")

    async def game_over(self, event):
        try:
            if self.connected:
                await self.send(text_data=json.dumps({
                    'type': 'game_over',
                    'winner': event['winner'],
                    'score_player1': self.pong_game.score_player1,
                    'score_player2': self.pong_game.score_player2
                }))
        except Exception as e:
            logger.error(f"Error sending game_over message: {e}")
        finally:
            await self.close()

    async def update_game_state(self):
        while self.connected:
            await asyncio.sleep(0.02)
            self.pong_game.update_ball_position()
            await self.send_game_state()