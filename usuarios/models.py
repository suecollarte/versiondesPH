from django.db import models
from django.contrib.auth.models import User
from tablas.models import *

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
        (VIGENTE, 'Revisado'),
        ]
              
class UsuariosPersonas(models.Model):
    '''
    (20.b) Tabla de registro de usuarios del sistema. 
    '''
    rut = models.CharField(max_length=20)
    estado = models.CharField(max_length=1,choices=EstadosUsuarios.ESTADOS_USUARIOS)
    perfil = models.CharField(max_length=1,choices=PerfilesUsuarios.PERFILES_USUARIOS)
    fnacimiento = models.DateField()    
    telefono = models.CharField(max_length=20)  
    region = models.ForeignKey(Regiones,on_delete=models.SET_NULL,blank=True,null=True)
    comuna = models.ForeignKey(Comunas,on_delete=models.SET_NULL,blank=True,null=True)
    ciudad = models.ForeignKey(Ciudades,on_delete=models.SET_NULL,blank=True,null=True)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        db_table = "usuarios_personas"        
#    @property 
#   def rut_formateado(self):
#        numero, digito = self.rut[:-1], self.rut[-1].upper()
#        numero_formateado = "{:,}".format(int(numero)).replace(",", ".")
#        return f"{numero_formateado}-{digito}"
#
#    @property 
#    def rut_sin_formato(self):
#        numero, digito = self.rut[:-1], self.rut[-1].upper()
#        numero_formateado = "{:,}".format(int(numero)).replace(",", ".")
#        return f"{numero_formateado}-{digito}"


class UsuariosEspecialistas(models.Model):
    '''
    (21) Tabla de registro de los especialistas que han contratado servicios de la plataforma y que por medio de ésta ofrecen sus propios servicios
    '''

    foto = models.ImageField('Foto para tu perfil', upload_to='fotos/', blank=True, null=True)
    descripcion = models.CharField(max_length=250)
    estado_suscripcion = models.CharField(max_length=1,choices=EstadosSuscripcion.ESTADOS_SUSCRIPCION)
    promedio_evaluacion = models.DecimalField(max_digits=4, decimal_places=2)
    tiempo_consulta = models.PositiveSmallIntegerField()   
    reg_especialista = models.CharField(max_length=120)
    ctr_altadctos = models.CharField(max_length=1,choices=EstadosDocumentos.ESTADOS_DOCUMENTOS)
    categoria = models.ForeignKey(Categorias, on_delete=models.SET_NULL,blank=True,null=True)                
    subcategoria = models.ForeignKey(SubCategorias,on_delete=models.SET_NULL,blank=True,null=True)                
    rubro = models.ForeignKey(Rubros, on_delete=models.SET_NULL,blank=True,null=True)           
    usuario = models.OneToOneField(UsuariosPersonas, on_delete=models.CASCADE)
    
    class Meta:
        db_table = "usuarios_especialistas"      
        ordering = ['foto','descripcion','estado_suscripcion','promedio_evaluacion','tiempo_consulta','reg_especialista',
                    'ctr_altadctos','categoria','subcategoria','rubro','usuario']       
        
             
class UsuariosEvaluacion(models.Model):
    '''
    (22) Tabla de registro de evaluaciones de los especialistas realizadas por los usuarios, toda vez que éstos hayan hecho uso de los servicios del especialista.
    '''  
    fecha = models.DateField()    
    mensaje = models.CharField(max_length=120)
    evaluacion = models.PositiveSmallIntegerField()                
    usuario = models.ForeignKey(UsuariosPersonas,on_delete=models.CASCADE)
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.SET_NULL,blank=True,null=True)      
         
    class Meta:
        db_table = "usuarios_evaluaciones"       
        ordering = ['fecha','mensaje','evaluacion','usuario','especialista']
    
     