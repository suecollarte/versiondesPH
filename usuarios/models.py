#
#   models.py usuarios
#
""" En este modulo se definen los modelos de Usuarios (UsuariosPersonas) y
    Especialistas (UsuariosEspecialistas)  y tablas relacionadas a especialistas
"""
    
    
from django.db import models
from django.contrib.auth.models import User
from tablas.models import *
from proximahora.funciones import uploadfoto_location


class AppsUsuarios:
    ROOT = 0
    ADMINISTRADOR = 1
    ESPECIALISTA = 2
    REGISTRADO = 3
    INVITADO = 4
    RELACIONADO = 5
    APPS_USUARIOS = [
        (ROOT, 'administrador/'),
        (ADMINISTRADOR, 'administrador/'),
        (ESPECIALISTA, 'especialista/'),
        (REGISTRADO, 'registrado/'),
        (INVITADO, 'home/'),
        (RELACIONADO, 'home/'),
        ]
    
class EstadosUsuarios:
    BLOQUEADO = '0'
    HABILITADO = '1'
    ENPROCESO = '2'   # Confirmacion del correo
    ENREVISION = '3'  # revision del admin de datos del especialista
    ESTADOS_USUARIOS = [
        (BLOQUEADO, 'Bloqueado'),
        (HABILITADO, 'Habilitado'),
        (ENPROCESO, 'En Proceso'),
        (ENREVISION, 'En Revision'),
        ]        
    
class PerfilesUsuarios:
    ROOT = '0'
    ADMINISTRADOR = '1'
    ESPECIALISTA = '2'
    REGISTRADO = '3'
    INVITADO = '4'
    RELACIONADO = '5'
    PERFILES_USUARIOS = [
        (ROOT, 'root'),
        (ADMINISTRADOR, 'Administrador'),
        (ESPECIALISTA, 'Especialista'),
        (REGISTRADO, 'Registrado'),
        (INVITADO, 'Invitado'),
        (RELACIONADO, 'Relacionado'),
        ]

class UsuariosPersonas(models.Model):
    '''
    (20.b) Tabla de registro de usuarios del sistema. 
    '''
    rut = models.CharField(max_length=20)
    estado = models.CharField(max_length=1,choices=EstadosUsuarios.ESTADOS_USUARIOS,default=EstadosUsuarios.BLOQUEADO)
    perfil = models.CharField(max_length=1,choices=PerfilesUsuarios.PERFILES_USUARIOS,default=PerfilesUsuarios.REGISTRADO)
    fnacimiento = models.DateField()    
    telefono = models.CharField(max_length=20)  
    cclave = models.PositiveSmallIntegerField(default=1)  
    region = models.ForeignKey(Regiones,on_delete=models.SET_NULL,blank=True,null=True)
    comuna = models.ForeignKey(Comunas,on_delete=models.SET_NULL,blank=True,null=True)
    ciudad = models.ForeignKey(Ciudades,on_delete=models.SET_NULL,blank=True,null=True)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        db_table = "usuarios_personas"        
        ordering = ['rut','estado','perfil','fnacimiento','telefono','cclave','region','comuna','ciudad','usuario']  


class EstadosSuscripcion:
    BLOQUEADA = '0'
    VIGENTE = '1'
    ESTADOS_SUSCRIPCION = [
        (BLOQUEADA, 'Bloqueada'),
        (VIGENTE, 'Vigente'),
        ]


class EstadosDocumentos:
    PENDIENTE = '0'
    VIGENTE = '1'
    ESTADOS_DOCUMENTOS = [
        (PENDIENTE, 'Pendiente'),
        (VIGENTE, 'Revisados'),
        ]
   
         
class UsuariosEspecialistas(models.Model):
    '''
    (21) Tabla de registro de los especialistas que han contratado servicios de la plataforma y que por medio de ésta ofrecen sus propios servicios
    '''
    foto = models.ImageField(upload_to=uploadfoto_location, blank=True, null=True)
    descripcion = models.CharField(max_length=250,blank=True,null=True)
    estado_suscripcion = models.CharField(max_length=1,choices=EstadosSuscripcion.ESTADOS_SUSCRIPCION,default=EstadosSuscripcion.BLOQUEADA)
    promedio_evaluacion = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    tiempo_consulta = models.PositiveSmallIntegerField(default=0)   
    reg_especialista = models.CharField(max_length=120,blank=True,null=True)
    ctr_altadctos = models.CharField(max_length=1,choices=EstadosDocumentos.ESTADOS_DOCUMENTOS,default=EstadosDocumentos.PENDIENTE)
    categoria = models.ForeignKey(Categorias, on_delete=models.SET_NULL,blank=True,null=True)                
    subcategoria = models.ForeignKey(SubCategorias,on_delete=models.SET_NULL,blank=True,null=True)                
    rubro = models.ForeignKey(Rubros, on_delete=models.SET_NULL,blank=True,null=True)           
    persona = models.OneToOneField(UsuariosPersonas, on_delete=models.CASCADE)
    plan = models.ForeignKey(Planes,on_delete=models.SET_NULL,blank=True,null=True)     
       
    class Meta:
        db_table = "usuarios_especialistas"      
        ordering = ['foto','descripcion','estado_suscripcion','promedio_evaluacion','tiempo_consulta','reg_especialista',
                    'ctr_altadctos','categoria','subcategoria','rubro','persona','plan']                  

         
class UsuariosEvaluacion(models.Model):
    '''
    (22) Tabla de registro de evaluaciones de los especialistas realizadas por los 
    usuarios, toda vez que éstos hayan hecho uso de los servicios del especialista.
    '''  
    fecha = models.DateField()    
    mensaje = models.CharField(max_length=120)
    evaluacion = models.PositiveSmallIntegerField(default=0)                
    usuario = models.ForeignKey(UsuariosPersonas,on_delete=models.CASCADE)
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)      
         
    class Meta:
        db_table = "usuarios_evaluaciones"       
        ordering = ['fecha','mensaje','evaluacion','usuario','especialista']


class SolicitudEstados:
    RECHAZADA = '0'
    ACEPTADA = '1'
    
class SolicitudRegister:
    USUARIO = '0'
    ESPECIALISTA = '1'
    REVISARPAGO = '2'
    SOLICITUD = [
        (USUARIO, 'Usuario'),
        (ESPECIALISTA, 'Suscriptor'),
        (REVISARPAGO, 'Revisar Pago'),
        ]
   
class UsuariosRegisterRequest(models.Model):
    
    from especialistas.models import EspecialistasPagos
    
    fregistro = models.DateField(auto_now_add=True)   
    rut = models.CharField(max_length=45)
    nombre = models.CharField(max_length=150)
    apellido = models.CharField(max_length=150)
    email = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20)  
    fnacimiento = models.DateField(blank=True,null=True)  
    token = models.CharField(max_length=64)
    solicita = models.CharField(max_length=1,choices=SolicitudRegister.SOLICITUD,default=SolicitudRegister.USUARIO)
    plan = models.BigIntegerField(default=0,blank=True,null=True)
    fpago = models.BigIntegerField(default=0,blank=True,null=True)
    epago = models.ForeignKey(EspecialistasPagos,on_delete=models.SET_NULL,blank=True,null=True)   
        
    class Meta:
        db_table = "usuarios_registros"       
#        ordering = ['fregistro','rut','nombre','apellido','email','telefono','fnacimiento','token','solicita','plan','fpago','epago']
        