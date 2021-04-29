from django.urls import path
from FileExplorerAPI import views

urlpatterns = [
    path('', views.TestAPI.as_view()),
]
