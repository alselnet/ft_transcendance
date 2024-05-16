from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework import viewsets
from .serializers import GameSummarySerializer
from .models import GameSummary

class GameSummaryView(viewsets.ModelViewSet):
    serializer_class = GameSummarySerializer
    queryset = GameSummary.objects.all()

def home(request):
    return render(request, 'ft_transcendance/home.html')