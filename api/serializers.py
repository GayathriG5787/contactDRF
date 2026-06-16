from rest_framework import serializers
from contacts.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    # Instructions about how to generate the serializer automatically
    class Meta:
        model = Contact
        fields = '__all__'
        