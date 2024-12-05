from rest_framework import serializers
from .models import Job, JobApplication

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'category', 'description', 'eligibility', 
                  'experience', 'location', 'date_of_issue', 'end_date', 
                  'immediate_joiner', 'job_poster', 'job_image', 'company_name','viewed']
        read_only_fields = ['job_poster', 'company_name']


class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    resume = serializers.FileField(source='user.resume', read_only=True)
    class Meta:
        model = JobApplication
        fields = ['id', 'job', 'applied_on', 'status', 'first_name', 'last_name', 'email', 'experience', 'highest_education','resume']
