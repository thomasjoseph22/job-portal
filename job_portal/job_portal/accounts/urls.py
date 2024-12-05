from django.urls import path
from .views import ApplicantDetailsView, ApplicantRegistrationView, CompanyRegistrationView, CustomTokenObtainPairView, UpdatePasswordView, UserDetailView

urlpatterns = [
    path('register/applicant/', ApplicantRegistrationView.as_view(), name='applicant-register'),
    path('register/company/', CompanyRegistrationView.as_view(), name='company-register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user-details/',UserDetailView.as_view(), name='userdetails'),
    path('api/applicant-details/', ApplicantDetailsView.as_view(), name='applicant-details'),
    path('api/update-password/', UpdatePasswordView.as_view(), name='update-password'),
]
