from django.urls import path, re_path
from FileExplorerAPI import views

urlpatterns = [
    # re_path(r'^actions/(?P<action>(mv)|(cp))$', views.Actions.as_view()),
    # re_path(r'^actions/create/(?P<dtype>(dir)|(file))/(?P<name>\w+)$', views.Actions.as_view()),
    # path('actions/delete/', views.Actions.as_view()),
    path('info', views.Info.as_view()),
    path('permissions', views.Permissions.as_view())
]
