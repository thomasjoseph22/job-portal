from rest_framework import serializers
from .models import Job, JobApplication, JobView


class JobViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobView
        fields = ['user', 'job', 'viewed']  # Explicitly include 'viewed'
        read_only_fields = ['user', 'job']


class JobSerializer(serializers.ModelSerializer):
    viewed = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = ['id', 'title', 'category', 'eligibility', 'experience', 'job_image', 'viewed']

    def get_viewed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Use 'viewed_by' ManyToManyField to check if the current user has viewed the job
            return obj.viewed_by.filter(id=request.user.id).exists()
        return False



class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    resume = serializers.FileField(source='user.resume', read_only=True)
    class Meta:
        model = JobApplication
        fields = ['id', 'job', 'applied_on', 'status', 'first_name', 'last_name', 'email', 'experience', 'highest_education','resume']
