from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    is_applicant= models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)



    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50,null=True,blank=True)
    address = models.CharField(max_length=225,null=True,blank=True)
    phone_number = models.CharField(max_length=15,null=True,blank=True)
    working_or_studying = models.CharField(max_length=100,null=True,blank=True)
    profile_image = models.ImageField(upload_to='profile_images/',null=True,blank=True)



   
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)  # Resume file
    skills = models.CharField(max_length=500, null=True, blank=True)  
    experience = models.IntegerField(null=True, blank=True) 
    highest_education = models.CharField(max_length=100, null=True, blank=True)


    #company details
    company_name = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    position = models.CharField(max_length=50, null=True, blank=True)
    company_profile_image = models.ImageField(upload_to='company_images/', null=True, blank=True)

    def __str__(self):
        return self.username