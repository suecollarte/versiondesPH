# Generated by Django 5.0.3 on 2024-07-02 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('especialistas', '0021_alter_especialistaspagos_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='especialistaspagos',
            name='uname',
            field=models.CharField(blank=True, max_length=45, null=True),
        ),
    ]
