# Generated by Django 5.0.3 on 2024-07-01 22:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('especialistas', '0020_alter_especialistaspagos_options'),
        ('usuarios', '0013_alter_usuariosregisterrequest_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='especialistaspagos',
            options={},
        ),
        migrations.AlterField(
            model_name='especialistaspagos',
            name='especialista',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pagos_especialista', to='usuarios.usuariosespecialistas'),
        ),
    ]
