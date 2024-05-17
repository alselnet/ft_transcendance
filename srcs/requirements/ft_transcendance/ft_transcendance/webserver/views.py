from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import GameSummarySerializer, UserRegistrationSerializer
from .models import GameSummary

class GameSummaryView(viewsets.ModelViewSet):
    serializer_class = GameSummarySerializer
    queryset = GameSummary.objects.all()

class UserRegistration(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return render(request, 'ft_transcendance/home.html')