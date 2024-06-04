#
# models.py especialistas
#
from django.db import models
from tablas.models import *
from usuarios.models import UsuariosEspecialistas, UsuariosPersonas
from proximahora.funciones import uploaddocu_location

class EstadosConsultas:
    TERMINADA = '0'
    DISPONIBLE = '1'
    ESTADOS_CONSULTAS = [
        (TERMINADA, 'Terminada'),
        (DISPONIBLE, 'Disponible'),
        ]
           
class EspecialistasConsultas(models.Model):
    '''
    (14) Tabla con direcciones de atención del especialista en un rango de fechas
    '''  
    fdesde = models.DateField()   
    fhasta = models.DateField()  
    direccion = models.CharField(max_length=250)
    estado = models.CharField(max_length=1,choices=EstadosConsultas.ESTADOS_CONSULTAS,default=EstadosConsultas.DISPONIBLE)
    ciudad = models.ForeignKey(Ciudades,on_delete=models.SET_NULL,blank=True,null=True, related_name='consulta_ciudad')
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE, related_name='consulta_especialista')      
         
    class Meta:
        db_table = "especialistas_consultas"       
        ordering = ['fdesde','fhasta','direccion','estado','ciudad','especialista']
      
               
class EstadosAgendaEspecialista:
    ANULADA = '0'
    DISPONIBLE = '1'
    AGENDADA = '2'
    ESTADOS_AGENDA = [
        (ANULADA, 'Anulada'),
        (DISPONIBLE, 'Disponible'),
        (AGENDADA, 'Agendada'),
    ]
           
class EspecialistasAgendas(models.Model):
    '''
    (12) : Tabla con información de la agenda propuesta por el especialista, para posterior agendamiendo de usuarios
    '''
    fecha = models.DateField()    
    hinicio = models.DateField()    
    htermino = models.DateField()    
    estado = models.CharField(max_length=1,choices=EstadosAgendaEspecialista.ESTADOS_AGENDA,default=EstadosAgendaEspecialista.DISPONIBLE)              
    consulta = models.ForeignKey(EspecialistasConsultas, on_delete=models.SET_NULL,blank=True,null=True)                
    especialista = models.ForeignKey(UsuariosEspecialistas, on_delete=models.CASCADE)           
 
    class Meta:
        db_table = "especialistas_programas"      
        ordering = ['fecha','hinicio','htermino','estado','consulta','especialista']     
        
        
class EspecialistasFichas(models.Model):
    '''
    (13) Tabla con anotaciones del especialista sobre la atención del usuario
    '''  
    fecha = models.DateField()   
    archivo = models.FileField(max_length=250)
    observaciones = models.CharField(max_length=250)
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)      
    usuario = models.ForeignKey(UsuariosPersonas,on_delete=models.CASCADE)
             
    class Meta:
        db_table = "especialistas_fichas"       
        ordering = ['fecha','archivo','observaciones','especialista','usuario']

 
class EstadosContratos:
    ATRASADO = '0'
    ALDIA = '1'
    ESTADOS_CONTRATO = [
        (ATRASADO, 'Atrasado'),
        (ALDIA, 'Al Dia'),
    ]
                        
class EspecialistasContratos(models.Model):
    '''
    (15) Tabla con información de contratos realizado entre el especialista y la plataforma proximahora
    '''  
    rut_replegal = models.CharField(max_length=20)
    nombre_replegal = models.CharField(max_length=120)
    direccion = models.CharField(max_length=120)
    fono = models.CharField(max_length=20)
    estado = models.CharField(max_length=1,choices=EstadosContratos.ESTADOS_CONTRATO,default=EstadosContratos.ATRASADO)   
    finicio = models.DateField()   
    ftermino = models.DateField()  
    valor = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)
    region = models.ForeignKey(Regiones,on_delete=models.SET_NULL,blank=True,null=True, related_name='contrato_region')
    comuna = models.ForeignKey(Comunas,on_delete=models.SET_NULL,blank=True,null=True, related_name='contrato_comuna')
    ciudad = models.ForeignKey(Ciudades,on_delete=models.SET_NULL,blank=True,null=True, related_name='contrato_ciudad')
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE, related_name='contrato_especialista')      
    promocion = models.ForeignKey(Promociones,on_delete=models.SET_NULL,blank=True,null=True, related_name='contrato_promocion')
    plan = models.ForeignKey(Planes,on_delete=models.SET_NULL,blank=True,null=True, related_name='contrato_plan')
             
    class Meta:
        db_table = "especialistas_contratos"       
        ordering = ['rut_replegal','nombre_replegal','direccion','fono','estado','finicio','ftermino','valor',
                    'region','comuna','ciudad','especialista','promocion','plan']  
        
        
class EspecialistasPlanesSuscripcion(models.Model):
    '''
    (16) Tabla con planes comerciales de la plataforma para los especialistas.
    '''
    TERMINADO = '0'
    VIGENTE = '1' 
    ESTADOS_CHOICES = [
        (TERMINADO, 'Terminado'),
        (VIGENTE, 'Vigente'),
        ]
    fdesde = models.DateField()    
    fhasta = models.DateField()
    nombre = models.CharField(max_length=45)
    estado = models.CharField(max_length=1,choices=ESTADOS_CHOICES)
    periodicidad = models.PositiveIntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)
         
    class Meta:
        db_table = "especialistas_planessuscripcion"    
        ordering = ['fdesde','fhasta','nombre','estado','periodicidad','valor']


class EstadosPagos:
    PENDIENTE = '0'
    PAGADO = '1'
    ESTADOS_PAGOS = [
        (PENDIENTE, 'Atrasado'),
        (PAGADO, 'Al Dia'),
    ]
          
class EspecialistasPagos(models.Model):
    '''
    (17) Tabla con información de pagos realizados por los especialistas a la plataforma; es decir su cta.cte.
    '''
    fdesde = models.DateField()   
    fhasta = models.DateField()
    fpago = models.DateField()
    estado = models.CharField(max_length=1,choices=EstadosPagos.ESTADOS_PAGOS,default=EstadosPagos.PENDIENTE)   
    monto = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)
    numero_dcto = models.CharField(max_length=120)
    formapago = models.ForeignKey(FormaPagoGral,on_delete=models.SET_NULL,blank=True,null=True, related_name='pagos_fpago')
    contrato = models.ForeignKey(EspecialistasContratos,on_delete=models.SET_NULL,blank=True,null=True, related_name='pagos_contrato')
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE, related_name='pagos_especialista')      
             
    class Meta:
        db_table = "especialistas_pagos"       
        ordering = ['fdesde','fhasta','fpago','estado','monto','numero_dcto','formapago','contrato','especialista']    
        

class EspecialistasRSaludPagos(models.Model):
    '''
    (18) Tabla con información de formas de pago que recibe un especialista de la salud.
    '''
    valor = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True) 
    bono = models.CharField(max_length=120)
    formapagosalud = models.ForeignKey(FormaPagoSalud,on_delete=models.SET_NULL,blank=True,null=True)
    prevision = models.ForeignKey(TipoPrevision,on_delete=models.SET_NULL,blank=True,null=True)
    modatencion = models.ForeignKey(ModalidadAtencion,on_delete=models.SET_NULL,blank=True,null=True)
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)      
             
    class Meta:
        db_table = "especialistas_rsaludpagos"       
        ordering = ['valor','bono','formapagosalud','prevision','modatencion','especialista']      
        

class EspecialistasHorasAgendadas(models.Model):
    '''
    (22) Tabla de registro de las horas agendadas por un usuario a un especialista. Eventualmente un usuario puede tomar hora a nombre de un tercero, 
    pero debe de estar debidamente registrado    
    '''
    fecha = models.DateField()    
    hora = models.CharField(max_length=5)
    mensaje = models.CharField(max_length=120)              
    relacionado = models.BigIntegerField(default=0)
    usuario = models.ForeignKey(UsuariosPersonas,on_delete=models.CASCADE)
    esp_agenda = models.ForeignKey(EspecialistasAgendas,on_delete=models.SET_NULL,blank=True,null=True)      
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)      
         
    class Meta:
        db_table = "especialistas_horasagendadas"       
        ordering = ['fecha','hora','mensaje','usuario','relacionado','esp_agenda','especialista']
        

class EstadosAgendaUsuarios:
    ANULADA = '0'
    VIGENTE = '1'
    ESTADOS_AGENDA = [
        (ANULADA, 'Anulada'),
        (VIGENTE, 'Vigente'),
    ]
     
class UsuariosAgendas(models.Model):
    '''
    (19) : Tabla de registro de las horas agendadas por un usuario a un especialista. 
            Eventualmente un usuario puede tomar hora a nombre de un tercero, pero debe 
            de estar debidamente registrado
    '''
    fingreso = models.DateField(auto_now_add=True)    
    fecha = models.DateField()    
    hora = models.TimeField() 
    mensaje = models.CharField(max_length=250)
    estado = models.CharField(max_length=1,choices=EstadosAgendaUsuarios.ESTADOS_AGENDA,default=EstadosAgendaUsuarios.VIGENTE)       
    usuariorel = models.PositiveBigIntegerField()          
    usuario = models.ForeignKey(UsuariosPersonas, on_delete=models.SET_NULL,blank=True,null=True)                
    especialista = models.ForeignKey(UsuariosEspecialistas, on_delete=models.SET_NULL,blank=True,null=True)           
    agendaespecialista = models.ForeignKey(EspecialistasAgendas,on_delete=models.SET_NULL,blank=True,null=True)           
 
    class Meta:
        db_table = "usuarios_agendas"      
        ordering = ['fingreso','fecha','hora','mensaje','estado','usuariorel','usuario','especialista','agendaespecialista']  


class EspecialistasDocumentos(models.Model):
    '''
    (23) Tabla de registro de documentos guardados por los especialistas.
    '''      
    fecha = models.DateTimeField(auto_now_add=True)    
    titulo = models.CharField(max_length=120)
    archivo = models.FileField(upload_to=uploaddocu_location, null=True, blank=True)
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)
    cliente = models.ForeignKey(UsuariosPersonas,on_delete=models.SET_NULL,blank=True,null=True)    
    
    class Meta:
        db_table = "especialistas_documentos"       
        ordering = ['fecha','titulo','archivo','especialista','cliente']
         
    def __str__(self):
        return self.titulo if hasattr(self, 'titulo') else 'Documento sin título'

    
class EspecialistasImagenes(models.Model):
    '''
    (24) Tabla de registro de imagenes guardadas por los especialistas.
    '''      
    fecha = models.DateTimeField(auto_now_add=True)    
    titulo = models.CharField(max_length=120)
    imagen = models.ImageField(upload_to=uploaddocu_location, null=True, blank=True)
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)
    cliente = models.ForeignKey(UsuariosPersonas,on_delete=models.SET_NULL,blank=True,null=True)    
    
    class Meta:
        db_table = "especialistas_imagenes"       
        ordering = ['fecha','titulo','imagen','especialista','cliente']
         
    def __str__(self):
        return self.titulo if hasattr(self, 'titulo') else 'Imagen sin título'

       