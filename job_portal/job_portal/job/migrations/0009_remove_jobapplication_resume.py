# Generated by Django 5.0.3 on 2024-10-22 08:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0008_jobapplication_resume'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jobapplication',
            name='resume',
        ),
    ]