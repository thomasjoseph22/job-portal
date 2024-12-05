from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth import get_user_model

User = get_user_model()

class Job(models.Model):
    title = models.CharField(max_length=255,null=True, blank=True)
    category = models.CharField(max_length=100,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    eligibility = models.CharField(max_length=255,null=True, blank=True)
    experience = models.CharField(max_length=100,null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True) 
    date_of_issue = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    immediate_joiner = models.BooleanField(default=False)
    job_poster = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    job_image = models.ImageField(upload_to='job_images/', null=True, blank=True)
    company_name = models.CharField(max_length=255,null=True, blank=True)
    viewed = models.BooleanField(default=False) 

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('hired', 'Hired'),
        ('rejected', 'Rejected'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    experience = models.TextField(null=True, blank=True)  
    highest_education = models.CharField(max_length=100, null=True, blank=True)
    applied_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='applied')  

    @property
    def resume(self):
        return self.user.resume

    def __str__(self):
        return f"{self.user.username} - {self.job.title} ({self.status})"



