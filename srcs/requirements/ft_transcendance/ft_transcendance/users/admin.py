from django.contrib import admin
from .models import GameSummary, Profile, Friend

class GameSummaryAdmin(admin.ModelAdmin):
    list_display = ('winner', 'loser', 'score', 'date_time')
    

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('status', 'user', 'two_factors_auth_status', 'mail_confirmation_status', 'avatar', 'phone_number')
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