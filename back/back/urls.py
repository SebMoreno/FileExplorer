from django.urls import path, re_path
from FileExplorerAPI import views
from django.views.generic import TemplateView

urlpatterns = [
    path('doc-handler', views.DocHandler.as_view()),
    path('permissions', views.Permissions.as_view()),
    re_path(r'^.*', TemplateView.as_view(template_name="../templates/home.html"), name="home")
]
