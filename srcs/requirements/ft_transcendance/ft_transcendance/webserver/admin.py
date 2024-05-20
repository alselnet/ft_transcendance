from django.contrib import admin
from .models import GameSummary

class GameSummaryAdmin(admin.ModelAdmin):
    list_display = ('winner', 'loser', 'score', 'date_time')

admin.site.register(GameSummary, GameSummaryAdmin)