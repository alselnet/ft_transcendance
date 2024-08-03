from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from authentication.utils import resize_image, crop_to_square
from PIL import Image
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


class Profile(models.Model):

    def user_avatar_path(instance, filename):
        ext = filename.split('.')[-1]
        filename = f'{instance.user.username}.{ext}'
        return os.path.join("avatars", filename)

    def save_avatar(self, *args, **kwargs):
        try:
            old_avatar = Profile.objects.get(pk=self.pk).avatar
            if old_avatar and old_avatar.name != 'default.png' and old_avatar != self.avatar:
                old_avatar.delete(save=False)
        except Profile.DoesNotExist:
            pass

        if self.avatar:
            img = Image.open(self.avatar)
            img = crop_to_square(img)
            img = resize_image(img, size=(300, 300))
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

    TWO_FA_METHOD_CHOICES = (
        ('none', 'None'),
        ('email', 'Email'),
        ('authenticator', 'Authenticator'),
    )

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='offline')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    # two_fa_status = models.BooleanField(default=True)
    two_fa_method = models.CharField(max_length=20, choices=TWO_FA_METHOD_CHOICES, default='none')
    mail_confirmation_status = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to=user_avatar_path, default='default.png')
    scored_points = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    conceded_points = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    played_games = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    won_games = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    perfect_wins = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    totp_secret = models.CharField(max_length=32, blank=True, null=True)
    tfa_token = models.CharField(max_length=32, blank=True, null=True)
    fortytwo_account = models.BooleanField(default=False)
    
    def __str__(self):
        return self.user.username

class Friend(models.Model):
    user = models.ForeignKey(User, related_name='friends', on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name='friend_of', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'friend')