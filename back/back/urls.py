from django.urls import path
from FileExplorerAPI import views

urlpatterns = [
    path('info', views.Info.as_view()),
    path('permissions', views.Permissions.as_view())
]
