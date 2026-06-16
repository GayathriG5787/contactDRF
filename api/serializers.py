from rest_framework import serializers
from contacts.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    # Instructions about how to generate the serializer automatically
    class Meta:
        model = Contact
        fields = '__all__'
    
    # field level validator, format should be validate_<field_name>
    # value parameter contains the value of the name field
    def validate_name(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Name must contain at least 3 characters."
            )
        return value