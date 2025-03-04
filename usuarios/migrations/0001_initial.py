# Generated by Django 5.0.3 on 2024-05-22 17:25

import django.db.models.deletion
import usuarios.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tablas', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UsuariosEspecialistas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foto', models.ImageField(blank=True, null=True, upload_to=usuarios.models.uploadfoto_location)),
                ('upload_to', models.CharField(blank=True, max_length=120, null=True)),
                ('descripcion', models.CharField(blank=True, max_length=250, null=True)),
                ('estado_suscripcion', models.CharField(choices=[('0', 'Bloqueada'), ('1', 'Vigente')], default='0', max_length=1)),
                ('promedio_evaluacion', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
                ('tiempo_consulta', models.PositiveSmallIntegerField()),
                ('reg_especialista', models.CharField(blank=True, max_length=120, null=True)),
                ('ctr_altadctos', models.CharField(choices=[('0', 'Pendiente'), ('1', 'Revisados')], default='0', max_length=1)),
                ('categoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tablas.categorias')),
                ('plan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tablas.planes')),
                ('rubro', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tablas.rubros')),
                ('subcategoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tablas.subcategorias')),
            ],
            options={
                'db_table': 'usuarios_especialistas',
                'ordering': ['foto', 'descripcion', 'estado_suscripcion', 'promedio_evaluacion', 'tiempo_consulta', 'reg_especialista', 'ctr_altadctos', 'categoria', 'subcategoria', 'rubro', 'persona'],
            },
        ),
        migrations.CreateModel(
            name='UsuariosPersonas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rut', models.CharField(max_length=20)),
                ('estado', models.CharField(choices=[('0', 'Bloqueado'), ('1', 'Habilitado'), ('2', 'En Proceso'), ('3', 'En Revision')], default='0', max_length=1)),
                ('perfil', models.CharField(choices=[('0', 'root'), ('1', 'Administrador'), ('2', 'Especialista'), ('3', 'Registrado'), ('4', 'Invitado'), ('5', 'Relacionado')], default='3', max_length=1)),
                ('fnacimiento', models.DateField()),
                ('telefono', models.CharField(max_length=20)),
                ('ciudad', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tablas.ciudades')),
                ('comuna', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tablas.comunas')),
                ('region', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tablas.regiones')),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'usuarios_personas',
                'ordering': ['rut', 'estado', 'perfil', 'fnacimiento', 'telefono', 'region', 'comuna', 'ciudad', 'usuario'],
            },
        ),
        migrations.CreateModel(
            name='UsuariosEvaluacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('mensaje', models.CharField(max_length=120)),
                ('evaluacion', models.PositiveSmallIntegerField(default=0)),
                ('especialista', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.usuariosespecialistas')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.usuariospersonas')),
            ],
            options={
                'db_table': 'usuarios_evaluaciones',
                'ordering': ['fecha', 'mensaje', 'evaluacion', 'usuario', 'especialista'],
            },
        ),
        migrations.AddField(
            model_name='usuariosespecialistas',
            name='persona',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='usuarios.usuariospersonas'),
        ),
    ]
