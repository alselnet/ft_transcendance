from django.contrib import admin
from .models import GameSummary, Profile, Code

class GameSummaryAdmin(admin.ModelAdmin):
    list_display = ('winner', 'loser', 'score', 'date_time')

admin.site.register(GameSummary, GameSummaryAdmin)

admin.site.register(Code)

admin.site.register(Profile)