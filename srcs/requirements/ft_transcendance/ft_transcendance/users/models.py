from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.files.storage import default_storage
from phonenumber_field.modelfields import PhoneNumberField
from PIL import Image
from django.core.files.base import ContentFile
from io import BytesIO
import logging
import os

logger = logging.getLogger(__name__)


class GameSummary(models.Model):
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='won_games') #cote user, user.won_games.all() retournerait toutes les games gagnées par l'utilisateur
    loser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='lost_games')
    winner_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(9)]
    )
    loser_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(9)]
    )
    perfect = models.BooleanField(default=False)
    local_game = models.BooleanField(default=False)
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Winner: {self.winner}, Loser: {self.loser}, Winner_score: {self.winner_score}, Loser_score: {self.loser_score}, Perfect: {self.perfect}, Local_game: {self.local_game}, Date: {self.date_time}"


def resize_image(image, size=(300, 300)):
    img = Image.open(image)
    img = img.resize(size, Image.ANTIALIAS)
    return img


class Profile(models.Model):

    def user_avatar_path(instance, filename):
        # Extract the file extension
        ext = filename.split('.')[-1]
        # Define the directory and file name based on the username
        filename = f'{instance.user.username}.{ext}'
        # Return the full path
        return os.path.join("avatars", filename)

    def save_avatar(self, *args, **kwargs):
        if self.avatar:
            img = resize_image(self.avatar, size=(300, 300))
            buffer = BytesIO()
            img.save(fp=buffer, format='PNG')
            filebuffer = ContentFile(buffer.getvalue())
            self.avatar.save(f"{self.user.username}.png", filebuffer, save=False)
        super(Profile, self).save(*args, **kwargs)

    STATUS_CHOICES = (
        ('online', 'Online'),
        ('offline', 'Offline'),
        ('in game', 'in game'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='offline')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    two_factors_auth_status = models.BooleanField(default=True)
    mail_confirmation_status = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to=user_avatar_path, default='avatars/default.png')
    phone_number = PhoneNumberField(blank=True, null=True, default='+0000000000')
    scored_points = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    conceded_points = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    played_games = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    won_games = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    perfect_wins = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    totp_secret = models.CharField(max_length=32, blank=True, null=True)
    
    def __str__(self):
        return self.user.username
    


class Friend(models.Model):
    user = models.ForeignKey(User, related_name='friends', on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name='friend_of', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'friend')

 
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
