from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title


class User(models.Model):

    class Status(models.TextChoices):
        ONLINE = 'OL'
        OFFLINE = 'OF'
        IN_GAME = 'IG'

    username = models.CharField(max_length=20)
    mail = models.EmailField()
    status = models.fields.CharField(choices=Status.choices, max_length=10)
    win_count = models.IntegerField(default=0)
    loose_count = models.IntegerField(default=0)
    # avatar = models.FileField() ?
    # avatar televersable, un avatar par defaut existe
    # autres stats ?
    # mot de passe chiffre dans la base de donnees
    # nom unique pour jouer en tournoi
    # historique des parties avec dates et autres details
    # liste d'amis ?
