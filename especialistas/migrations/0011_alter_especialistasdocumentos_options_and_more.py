# Generated by Django 5.0.3 on 2024-05-28 22:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('especialistas', '0010_especialistasdocumentos'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='especialistasdocumentos',
            options={'ordering': ['fecha', 'titulo', 'archivo', 'imagen', 'especialista', 'usuario']},
        ),
        migrations.RemoveField(
            model_name='especialistasdocumentos',
            name='upload_to',
        ),
    ]
