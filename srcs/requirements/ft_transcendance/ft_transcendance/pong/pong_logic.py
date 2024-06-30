import random
import math

class PongGame:
    def __init__(self):
        self.screen_width = 1200
        self.screen_height = 700
        self.ball_size = 10
        self.player_height = 70
        self.player_width = 10
        self.player_speed = 7
        self.ball_speed = 20
        self.reset_game()

    def reset_game(self):
        self.player1_y_position = self.screen_height / 2
        self.player2_y_position = self.screen_height / 2
        self.start_ball()
        self.score_player1 = 0
        self.score_player2 = 0
        self.ball_waiting = False
        self.waiting_player = None
        self.game_over = False
        self.winner = None

    def start_ball(self):
        start_angle = random.uniform(-math.pi/4, math.pi/4)
        start_direction = 1 if start_angle > 0 else -1 if start_angle < 0 else 1
        self.ball_x_speed = self.ball_speed * start_direction * math.cos(start_angle)
        self.ball_y_speed = self.ball_speed * start_direction * math.sin(start_angle)
        self.ball_x_position = self.screen_width / 2
        self.ball_y_position = self.screen_height / 2

    def update_player_position(self, player, direction):
        if player == 1:
            self.player1_y_position += self.player_speed * direction
            self.player1_y_position = max(0, min(self.screen_height - self.player_height, self.player1_y_position))
        elif player == 2:
            self.player2_y_position += self.player_speed * direction
            self.player2_y_position = max(0, min(self.screen_height - self.player_height, self.player2_y_position))

    def map_value(self, value, leftMin, leftMax, rightMin, rightMax):
        leftSpan = leftMax - leftMin
        rightSpan = rightMax - rightMin
        valueScaled = float(value - leftMin) / float(leftSpan)
        return rightMin + (valueScaled * rightSpan)

    def update_ball_position(self):
        if not self.ball_waiting:
            self.ball_x_position += self.ball_x_speed
            self.ball_y_position += self.ball_y_speed

            if self.ball_y_position <= 0 + self.ball_size or self.ball_y_position >= self.screen_height - self.ball_size:
                self.ball_y_speed = -self.ball_y_speed

            if (self.ball_y_position + self.ball_size > self.player1_y_position and
                self.ball_y_position < self.player1_y_position + self.player_height and
                self.ball_x_position <= 20 + self.player_width):
                diff = self.ball_y_position - self.player1_y_position
                rad = math.radians(45)
                angle = self.map_value(diff, 0, self.player_height, -rad, rad)
                self.ball_x_speed = self.ball_speed * math.cos(angle)
                self.ball_y_speed = self.ball_speed * math.sin(angle)
                self.ball_x_position = 20 + self.player_width

            if (self.ball_y_position + self.ball_size > self.player2_y_position and
                self.ball_y_position < self.player2_y_position + self.player_height and
                self.ball_x_position + self.ball_size >= self.screen_width - 20):
                diff = self.ball_y_position - self.player2_y_position
                rad = math.radians(45)
                angle = self.map_value(diff, 0, self.player_height, -rad, rad)
                self.ball_x_speed = -self.ball_speed * math.cos(angle)
                self.ball_y_speed = self.ball_speed * math.sin(angle)
                self.ball_x_position = self.screen_width - 20 - self.ball_size

            if self.ball_x_position <= 0:
                self.score_player2 += 1
                self.ball_waiting = True
                self.waiting_player = 1
                self.check_game_over()

            if self.ball_x_position >= self.screen_width:
                self.score_player1 += 1
                self.ball_waiting = True
                self.waiting_player = 2
                self.check_game_over()
        else:
            self.reset_ball_position()

    def reset_ball_position(self):
        if self.waiting_player == 1:
            self.ball_x_position = 20 + self.ball_size
            self.ball_y_position = self.player1_y_position + self.player_height / 2 - self.ball_size / 2
        else:
            self.ball_x_position = self.screen_width - 20 - self.ball_size
            self.ball_y_position = self.player2_y_position + self.player_height / 2 - self.ball_size / 2

    def start_ball_movement(self):
        self.ball_waiting = False
        if self.waiting_player == 1:
            self.ball_x_speed = self.ball_speed
        else:
            self.ball_x_speed = -self.ball_speed

    def check_game_over(self):
        if self.score_player1 >= 3:
            self.game_over = True
            self.winner = 1
        elif self.score_player2 >= 3:
            self.game_over = True
            self.winner = 2