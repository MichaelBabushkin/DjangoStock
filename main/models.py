from django.db import models
from django.contrib.auth.models import User
    # from django.core.urlresolvers import reverse
from datetime import date

# Create your models here.
class sp500(models.Model):
    value= models.FloatField(max_length=200)

    def __str__(self):
        return self.value
    