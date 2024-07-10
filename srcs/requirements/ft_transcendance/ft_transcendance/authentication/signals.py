from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import TwoFactorsCode
# from django.core.mail import send_mail

@receiver(post_save, sender=User)
def post_save_generate_code(sender, instance, created, *args, **kwargs):
    if created:
        TwoFactorsCode.objects.create(user=instance)