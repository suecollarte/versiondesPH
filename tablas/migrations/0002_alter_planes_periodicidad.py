# Generated by Django 5.0.3 on 2024-06-13 01:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tablas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planes',
            name='periodicidad',
            field=models.CharField(choices=[(0, 'Trimestral'), (1, 'Semestral'), (2, 'Anual')], max_length=1),
        ),
    ]
