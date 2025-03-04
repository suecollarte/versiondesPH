# Generated by Django 5.0.3 on 2024-05-29 04:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('especialistas', '0014_alter_especialistasdocumentos_options_and_more'),
        ('usuarios', '0003_alter_usuariosespecialistas_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='especialistasdocumentos',
            options={'ordering': ['fecha', 'titulo', 'archivo', 'especialista', 'cliente']},
        ),
        migrations.AlterModelOptions(
            name='especialistasimagenes',
            options={'ordering': ['fecha', 'titulo', 'imagen', 'especialista', 'cliente']},
        ),
        migrations.AddField(
            model_name='especialistasdocumentos',
            name='cliente',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='usuarios.usuariospersonas'),
        ),
        migrations.AddField(
            model_name='especialistasimagenes',
            name='cliente',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='usuarios.usuariospersonas'),
        ),
    ]
