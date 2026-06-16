# Gives pre-built CBV for common API operations

from rest_framework import generics
from contacts.models import Contact
from .serializers import ContactSerializer

# Supports GET and POST
class ContactListCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
  
# GET, PUT, PATCH and DELETE of individual contacts
# PUT can be used when you want to update all fields of a particular contact, and PATCH can be used when you want to update one or two fields. 
class ContactDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
    

