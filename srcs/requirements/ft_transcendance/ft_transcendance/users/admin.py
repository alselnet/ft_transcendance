from django.contrib import admin
from .models import GameSummary, Profile, Friend

class GameSummaryAdmin(admin.ModelAdmin):
    list_display = ('winner', 'loser', 'winner_score', 'loser_score', 'perfect', 'local_game', 'date_time')
    

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('status', 'user', 'mail_confirmation_status', 'two_fa_method', 'avatar', 'scored_points', 'conceded_points', 'played_games', 'won_games', 'perfect_wins')
    def user(self, obj):
        return obj.user.username
    

class FriendAdmin(admin.ModelAdmin):
    list_display = ('user', 'friend')
    def user(self, obj):
        return obj.user.username
    
    def friend(self, obj):
        return obj.friend.username

admin.site.register(GameSummary, GameSummaryAdmin) 
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Friend, FriendAdmin)