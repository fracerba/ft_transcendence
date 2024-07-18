from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from django.http import JsonResponse

def user_list(request):
    users = list(User.objects.values())
    return JsonResponse(users, safe=False)

# implement the default loginview
