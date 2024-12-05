# Generated by Django 5.0.3 on 2024-10-26 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0011_job_viewed_delete_jobview'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='viewed',
        ),
        migrations.RemoveField(
            model_name='jobapplication',
            name='status',
        ),
        migrations.AddField(
            model_name='jobapplication',
            name='viewed',
            field=models.BooleanField(default=False),
        ),
    ]
