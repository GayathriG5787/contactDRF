from django.urls import path
from .views import ContactListCreateView, ContactDetailView

urlpatterns = [
    path('contacts/', ContactListCreateView.as_view()),
    path('contacts/<uuid:pk>/', ContactDetailView.as_view()),
]