from django.urls import path
from contacts.views import hello

urlpatterns = [
    path('', hello)
]