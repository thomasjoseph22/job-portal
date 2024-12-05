# views.py
from jsonschema import ValidationError
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Job,JobApplication
from .serializers import JobSerializer, JobApplicationSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Job, JobApplication
from .serializers import JobApplicationSerializer, JobSerializer
from django.core.mail import send_mail


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_job_viewed_status(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        job.viewed = True  # Mark the job as viewed
        job.save()
        return Response({'message': 'Job marked as viewed.'})
    except Job.DoesNotExist:
        return Response({'error': 'Job not found'}, status=404)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def company_applied_jobs(request):

    company_name = request.user.company_name  # Assuming company is linked to user profile
    applications = JobApplication.objects.filter(job__company_name=company_name)
    serializer = JobApplicationSerializer(applications, many=True)
    return Response(serializer.data)



@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_job_application_status(request, application_id):
    try:
        job_application = JobApplication.objects.get(id=application_id)
        status = request.data.get('status')

        if status not in dict(JobApplication.STATUS_CHOICES):
            return Response({'error': 'Invalid status'}, status=400)

        job_application.status = status
        job_application.save()

        send_status_update_email(job_application, status)

        return Response({'message': f'Status updated to {status} and email sent.'})

    except JobApplication.DoesNotExist:
        return Response({'error': 'Job application not found'}, status=404)



def send_status_update_email(job_application, status):
    email = job_application.email
    if status == 'interview':
        subject = 'Interview Invitation'
        message = f'Dear {job_application.first_name},\n\nYou have been selected for an interview for the position of {job_application.job.title}.'
    elif status == 'hired':
        subject = 'Congratulations! You are Hired'
        message = f'Dear {job_application.first_name},\n\nWe are pleased to inform you that you have been hired for the position of {job_application.job.title}. The offer letter will be sent to you by the company.'
    else:
        subject = 'Application Rejected'
        message = f'Dear {job_application.first_name},\n\nWe regret to inform you that your application for {job_application.job.title} has been rejected.'

    send_mail(subject, message, 'no-reply@company.com', [email], fail_silently=False)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applied_jobs(request):
    applications = JobApplication.objects.filter(user=request.user)
    serializer = JobApplicationSerializer(applications, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_for_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)

        # Check if the user has already applied for this job
        if JobApplication.objects.filter(user=request.user, job=job).exists():
            return Response({'error': 'You have applied for this job.'}, status=400)

        # Create job application instance
        application = JobApplication(
            user=request.user,
            job=job,
            first_name=request.data.get('first_name'),
            last_name=request.data.get('last_name'),
            email=request.data.get('email'),
            experience=request.data.get('experience'),
            highest_education=request.data.get('highest_education')
        )

        # Validate and save
        application.full_clean()  # This checks for validation errors
        application.save()

        # Send application email
        send_application_email(
            first_name=application.first_name,
            last_name=application.last_name,
            email=application.email,
            job=job
        )

        return Response({'message': 'Application submitted successfully.'}, status=201)

    except Job.DoesNotExist:
        return Response({'error': 'Job not found'}, status=404)
    except ValidationError as e:
        return Response({'error': str(e)}, status=400)





def send_application_email(first_name, last_name, email, job):
    subject = 'Application Received for ' + job.title
    message = f'Dear {first_name} {last_name},\n\nYour application for the position of {job.title} has been received successfully. After reviewing you resume and profile, company will be in touch with you.\n\nBest Regards,\n{job.company_name}'

    send_mail(
        subject,
        message,
        'no-reply@company.com',  # Sender email
        [email],
        fail_silently=False
    )



@api_view(['GET'])
def get_job_post(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        serializer = JobSerializer(job)
        return Response({'job': serializer.data})
    except Job.DoesNotExist:
        return Response({'error': 'Job not found'}, status=404)


class PublicJobListView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [AllowAny]  # Allows unauthenticated access

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data = {
            "jobs": response.data
        }
        return response


class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # Get the jobs
        response = super().list(request, *args, **kwargs)

        # Calculate total jobs for the logged-in user's company
        company_name = request.user.company_name
        total_jobs = Job.objects.filter(company_name=company_name).count()

        # Add total_jobs to the response
        response.data = {
            "total_jobs": total_jobs,
            "jobs": response.data
        }

        return response

    def perform_create(self, serializer):
        company_name = self.request.user.company_name
        serializer.save(job_poster=self.request.user, company_name=company_name)

 

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Job

class TotalJobsView(APIView):
    permission_classes = [IsAuthenticated]  # Adjust permissions as needed

    def get(self, request):
        # Calculate total jobs for the logged-in user's company
        total_jobs = Job.objects.filter(company_name=request.user.company_name).count()
        return Response({'total_jobs': total_jobs})
