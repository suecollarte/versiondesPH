# Generated by Django 5.0.3 on 2024-06-16 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0007_alter_usuariosregisterrequest_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='usuariosregisterrequest',
            options={'ordering': ['fregistro', 'rut', 'nombre', 'apellido', 'email', 'telefono', 'fnacimiento', 'token', 'solicita', 'plan', 'fpago']},
        ),
        migrations.RemoveField(
            model_name='usuariosregisterrequest',
            name='perfil',
        ),
        migrations.AddField(
            model_name='usuariosregisterrequest',
            name='solicita',
            field=models.CharField(choices=[(0, 'Usuario'), (1, 'Suscriptor'), (2, 'Clave')], default=0, max_length=1),
        ),
    ]
