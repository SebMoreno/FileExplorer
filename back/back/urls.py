from django.urls import path, re_path
from FileExplorerAPI import views

urlpatterns = [
    path('doc-handler', views.DocHandler.as_view()),
    path('permissions', views.Permissions.as_view())
]
