# Generated by Django 3.1.14 on 2022-11-20 04:43

from django.db import migrations, models
import mathesar.models.query


class Migration(migrations.Migration):

    dependencies = [
        ('mathesar', '0007_auto_20221115_0627'),
    ]

    operations = [
        migrations.AddField(
            model_name='table',
            name='display_options',
            field=models.JSONField(default=None, null=True),
        ),
    ]
