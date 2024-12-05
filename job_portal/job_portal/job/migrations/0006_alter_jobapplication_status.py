# Generated by Django 5.0.3 on 2024-10-21 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0005_jobapplication_email_jobapplication_experience_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplication',
            name='status',
            field=models.CharField(choices=[('applied', 'Applied'), ('interview', 'Interview'), ('hired', 'Hired'), ('rejected', 'Rejected')], default='applied', max_length=50),
        ),
    ]