from django.urls import path
from .views import JobListCreateView, JobDetailView, MarkJobViewed, PublicJobListView, TotalJobsView, applied_jobs, apply_for_job, company_applied_jobs, get_user_details, send_application_email, update_job_application_status, update_job_viewed_status
from . import views

urlpatterns = [
    path('jobs/', JobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', JobDetailView.as_view(), name='job-detail'),
    path('jobs/total/', TotalJobsView.as_view(), name='total-jobs'),
    path('publicpost/',PublicJobListView.as_view(),name='public-post'),
    path('publicpost/<int:job_id>/', views.get_job_post, name='get_job_post'),
    path('apply/<int:job_id>/', send_application_email, name='apply-job'),
    path('apply-job/<int:job_id>/', apply_for_job, name='apply-job'),
    path('applied-jobs/', applied_jobs, name='applied-jobs'), 
    path('job-applications/<int:application_id>/',update_job_application_status, name='update-job-application-status'),
    path('company-applied-jobs/', company_applied_jobs, name='company-applied-jobs'),
    path('jobs/<int:job_id>/viewed/', MarkJobViewed.as_view(), name='mark-job-viewed'),
    path('api/user/', get_user_details, name='get-user-details'),    
    
]
