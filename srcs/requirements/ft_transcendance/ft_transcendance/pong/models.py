from django.db import models

class Player(models.Model):
    alias = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.alias

class Game(models.Model):
    room_name = models.CharField(max_length=255, unique=True, default='default_room')
    player1 = models.ForeignKey(Player, related_name='player1_games', on_delete=models.CASCADE, null=True, blank=True)
    player2 = models.ForeignKey(Player, related_name='player2_games', on_delete=models.CASCADE, null=True, blank=True)
    winner = models.ForeignKey(Player, related_name='won_games', on_delete=models.SET_NULL, null=True, blank=True)
    player1_score = models.IntegerField(default=0)
    player2_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class Tournament(models.Model):
    name = models.CharField(max_length=100)
    players = models.ManyToManyField(Player)
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name
