# Gives pre-built CBV for common API operations

from rest_framework import generics
from contacts.models import Contact
from .serializers import ContactSerializer

# Supports GET and POST
class ContactListCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
    

