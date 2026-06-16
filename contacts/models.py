import uuid

from django.db import models

# model name starts with capital letters (PascalCase)
class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # For CharField, max_length is mandatory, but for TextField, it is optional
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    # This field allowed to be empty when user submits a form or when Django validates a model  
    email = models.EmailField(blank=True)
    
    def __str__(self):
        return self.name
    
