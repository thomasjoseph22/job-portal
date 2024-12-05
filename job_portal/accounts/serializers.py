from rest_framework import serializers
from django.contrib.auth import get_user_model

from rest_framework import serializers
from django.contrib.auth import get_user_model

class ApplicantRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    # Accept skills as a comma-separated string
    skills = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = get_user_model()
        fields = [
            'username', 'email', 'password', 'first_name', 'last_name', 'address',
            'phone_number', 'working_or_studying', 'profile_image', 'resume',
            'skills', 'experience', 'highest_education'
        ]

    def create(self, validated_data):
        skills_data = validated_data.pop('skills', '')  # Default to empty string if not provided
        skills_list = [skill.strip() for skill in skills_data.split(',')] if skills_data else []

        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            address=validated_data.get('address'),
            phone_number=validated_data.get('phone_number'),
            working_or_studying=validated_data.get('working_or_studying'),
            profile_image=validated_data.get('profile_image'),
            resume=validated_data.get('resume'),
            skills=','.join(skills_list),  # Save skills as a comma-separated string
            experience=validated_data.get('experience'),
            highest_education=validated_data.get('highest_education'),
            is_applicant=True,
            is_company=False
        )
        return user



class CompanyRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password', 'company_name', 'name', 'position', 
                  'phone_number', 'company_profile_image']

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            company_name=validated_data.get('company_name'),
            name=validated_data.get('name'),
            position=validated_data.get('position'),
            phone_number=validated_data.get('phone_number'),
            company_profile_image=validated_data.get('company_profile_image'),
            is_applicant=False,
            is_company=True
        )
        return user


class UpdatePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)