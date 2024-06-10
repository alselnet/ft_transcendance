import random
from django.db import models
from django.contrib.auth.models import User
import logging, requests

logger = logging.getLogger(__name__)

class GameSummary(models.Model):
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='won_games') #cote user, user.won_games.all() retournerait toutes les games gagnées par l'utilisateur
    loser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='lost_games')
    score = models.CharField(max_length=100)
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Winner: {self.winner}, Loser: {self.loser}, Score: {self.score}, Date: {self.date_time}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    game_history = models.ManyToManyField(GameSummary, related_name='players')
    two_factors_auth_status = models.BooleanField(default=False)
    mail_confirmation_status = models.BooleanField(default=False)
    #avatar = models.ImageField(null=True) need to install a dep called Pillow ?
    
    def __str__(self):
        return self.user.username

class TwoFactorsCode(models.Model):
    number = models.CharField(max_length=5, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)  

    def __str__(self):
        return str(self.number)

    def save(self, *args, **kwargs):
        number_list = [x for x in range(10)]
        code_items = []

        for i in range(5):
            num = random.choice(number_list)
            code_items.append(num)

        code_string = "".join(str(item) for item in code_items)
        self.number = code_string
        super().save(*args, **kwargs)

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