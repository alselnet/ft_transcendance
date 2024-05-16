from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title


#A merge av la classe user de jules:
# 
# from django.contrib.auth.models import AbstractUser
# class Userwithhist(AbstractUser):
# 
#     history = models.ManyToManyField(GameSummary, related_name='players')
# 
#     def __str__(self):
#         return self.username

class GameSummary(models.Model):
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='won_games')
    loser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='lost_games')
    score = models.CharField(max_length=100)
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Winner: {self.winner}, Loser: {self.loser}, Score: {self.score}, Date: {self.date_time}"

# -------------------------
# Logique pour creer un résumé de partie et le link aux utilisateurs concernés
# 
# from django.utils import timezone
# 
# user1 = MyUser.objects.get(username='username1')
# user2 = MyUser.objects.get(username='username2')
# 
# game_summary = GameSummary.objects.create(
#     winner=user1,
#     loser=user2,
#     score='10-8',
#     date_time=timezone.now()
# )
# 
# user1.games_played.add(game_summary)
# user2.games_played.add(game_summary)
# 
# -------------------------------------------------
# 
# Implémentation de logique pour la suppression des résumés de partie, on veut que si les deux 
#utilisateurs soient supprimés le résumé soit supprimé, mais pas si un seul des deux l'est. Cette fonction
#est sensée être appelée au moment ou un utilisateur est supprimé.
#    
# @receiver(pre_delete, sender=User)
# def handle_user_deletion(sender, instance, **kwargs):
#     game_summaries = GameSummary.objects.filter(models.Q(winner=instance) | models.Q(loser=instance))
# 
#     for summary in game_summaries:
#         if summary.winner_id != instance.id and summary.winner_id is not None:
#             summary.winner = None
#             summary.save()
#         if summary.loser_id != instance.id and summary.loser_id is not None:
#             summary.loser = None
#             summary.save()
#         if summary.winner_id is None and summary.loser_id is None:
#             summary.delete()