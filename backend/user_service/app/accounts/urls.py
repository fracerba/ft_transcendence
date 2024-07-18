from django.urls import path
from .views import user_list
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('users/', user_list, name='user_list'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
]