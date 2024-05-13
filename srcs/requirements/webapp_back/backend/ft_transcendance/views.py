from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

def home(request):
    return render(request, 'ft_transcendance/home.html')