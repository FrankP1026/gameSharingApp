# Generated by Django 2.0.6 on 2018-07-28 17:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0003_auto_20180721_1904'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(blank=True, max_length=30, null=True)),
                ('birthday', models.DateField()),
                ('gender', models.CharField(choices=[('N', ''), ('M', 'Male'), ('F', 'Female'), ('O', 'Other')], default='N', max_length=1)),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=30)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='games', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='games',
            name='owner_id',
        ),
    ]
