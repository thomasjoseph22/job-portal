from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ApplicantRegistrationSerializer, CompanyRegistrationSerializer, UpdatePasswordSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from .serializers import ApplicantRegistrationSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from rest_framework import serializers



class UpdatePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = UpdatePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({"detail": "Old password is not correct."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_password'])
            user.save()
            update_session_auth_hash(request, user)  # Keep the user logged in after password change
            return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class ApplicantDetailsView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.filter(is_applicant=True)
    serializer_class = ApplicantRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(self.object, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            # Print the errors to the console
            print(serializer.errors)  # Log the errors to the console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    



class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'company_name': user.company_name,
            'name': user.name,
            'position': user.position,
            'phone_number': user.phone_number,
            'company_profile_image': user.company_profile_image.url if user.company_profile_image else None
        }
        return Response(user_data)



class ApplicantRegistrationView(APIView):
    def post(self, request):
        serializer = ApplicantRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'is_applicant': user.is_applicant,
            }, status=status.HTTP_201_CREATED)
        
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CompanyRegistrationView(APIView):
    def post(self, request):
        serializer = CompanyRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'is_company': user.is_company,
            }, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['is_applicant'] = user.is_applicant
        token['is_company'] = user.is_company
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.get_user(attrs['username'])
        
        # Include user type in the response
        data['is_applicant'] = user.is_applicant
        data['is_company'] = user.is_company
        return data

    def get_user(self, username):
        return get_user_model().objects.get(username=username)  # Use your user model

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer