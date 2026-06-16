import uuid
from django.core.validators import RegexValidator

from django.db import models

# model name starts with capital letters (PascalCase)
class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # For CharField, max_length is mandatory, but for TextField, it is optional
    name = models.CharField(max_length=100)
    phone = models.CharField(
        max_length=10,
        unique= True,
        validators= [
            RegexValidator(
                # r = raw string (don't treat backslashes special)
                # ^ is start of string, \d is digit (0-9), {10} is exactly 10 digits and $ is end of string
                regex=r'^[6-9]\d{9}$', 
                message='Kindly enter a valid phone number.'
            )
        ]
        )
    # This field allowed to be empty when user submits a form or when Django validates a model  
    email = models.EmailField(blank=True)
    
    def __str__(self):
        return self.name
    
