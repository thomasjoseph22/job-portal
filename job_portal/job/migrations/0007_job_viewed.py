# Generated by Django 5.0.3 on 2024-10-21 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0006_alter_jobapplication_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='viewed',
            field=models.BooleanField(default=False),
        ),
    ]
