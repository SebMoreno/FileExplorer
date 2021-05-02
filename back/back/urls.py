from django.urls import path
from FileExplorerAPI import views

urlpatterns = [
    path('', views.Info.as_view()),
]
