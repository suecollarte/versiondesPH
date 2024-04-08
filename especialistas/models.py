from django.db import models
from tablas.models import *
from usuarios.models import UsuariosEspecialistas, UsuariosPersonas


class EspecialistasConsultas(models.Model):
    '''
    (14) Tabla direcciones de atención del especialista en un rango de fechas
    ''' 
    fdesde = models.DateField()    
    fhasta = models.DateField()
    direccion = models.CharField(max_length=250)
    ciudad = models.ForeignKey(Ciudades,on_delete=models.SET_NULL,blank=True,null=True)
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)    
                        
    class Meta:
        db_table = "especialistas_consultas"
        ordering = ['fdesde','fhasta','direccion','ciudad','especialista']
        
        
class EspecialistaAgendas(models.Model):
    ''' 
    (12) Tabla con información de la agenda propuesta por el especialista, para posterior agendamiendo de usuarios.
    '''
    AGENDADA = '0'
    DISPONIBLE = '1' 
    ESTADOS_CHOICES = [
        (AGENDADA, 'Agendada'),
        (DISPONIBLE, 'Disponible'),
        ]
 
    fecha = models.DateField()    
    hora_inicio = models.CharField(max_length=5)
    hora_termino = models.CharField(max_length=5)
    estado = models.CharField(max_length=1,choices=ESTADOS_CHOICES)
    esp_consultas = models.ForeignKey(EspecialistasConsultas,on_delete=models.SET_NULL,blank=True,null=True)    
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)    
                        
    class Meta:
        db_table = "especialistas_agendas"    
        ordering = ['fecha','hora_inicio','hora_termino','estado','esp_consultas','especialista']
        

class EspecialistaFichas(models.Model):
    '''
    (13) Tabla con anotaciones del especialista sobre la atención del usuario
    '''    
    fecha = models.DateField()    
    archivo_dcto = models.CharField(max_length=45)
    observaciones = models.CharField(max_length=250)
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)    
    usuario = models.ForeignKey(UsuariosPersonas,on_delete=models.SET_NULL,blank=True,null=True)
                        
    class Meta:
        db_table = 'especialistas_fichas'    
        ordering = ['fecha','archivo_dcto','observaciones','especialista','usuario']
        
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
        db_table = "especialistas_planessucripcion"    
        ordering = ['fdesde','fhasta','nombre','estado','periodicidad','valor']
        
                
class EspecialistasContratos(models.Model):
    '''
    (15) Tabla con información de contratos realizado entre el especialista y la plataforma proximahora
    '''
    ATRASADO = '0'
    ALDIA = '1' 
    PAGOS_CHOICES = [
        (ATRASADO, 'Atrasado'),
        (ALDIA, 'Al Dia'),
        ]
    rut_replegal = models.CharField(max_length=20)
    nombre_replegal = models.CharField(max_length=120)
    direccion = models.CharField(max_length=250)
    fono = models.CharField(max_length=20)
    ctr_pagos = models.CharField(max_length=1,choices=PAGOS_CHOICES)
    finicio = models.DateField()    
    ftermino = models.DateField()
    monto_contrato = models.DecimalField(max_digits=10, decimal_places=2)
    region = models.ForeignKey(Regiones, on_delete=models.SET_NULL,blank=True,null=True)               
    comuna = models.ForeignKey(Comunas, on_delete=models.SET_NULL,blank=True,null=True)             
    ciudad = models.ForeignKey(Ciudades, on_delete=models.SET_NULL,blank=True,null=True)          
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)    
    promocion = models.ForeignKey(Promociones,on_delete=models.CASCADE)    
    plansuscripcion = models.ForeignKey(EspecialistasPlanesSuscripcion,on_delete=models.SET_NULL,blank=True,null=True)  
         
    class Meta:
        db_table = "especialistas_contratos"    
        ordering = ['rut_replegal','nombre_replegal','direccion','fono','ctr_pagos','finicio',
                    'ftermino','monto_contrato','region','comuna','ciudad','especialista','promocion','plansuscripcion']
        

class EspecialistasPagos(models.Model):
    '''
    (17) Tabla con información de pagos realizados por los especialistas a la plataforma; es decir su cta.cte.
    '''
    PENDIENTE = '0'
    PAGADO = '1' 
    ESTADOS_CHOICES = [
        (PENDIENTE, 'Pendiente'),
        (PAGADO, 'Pagado'),
        ]
    fdesde = models.DateField()    
    fhasta = models.DateField()
    estado = models.CharField(max_length=1,choices=ESTADOS_CHOICES)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    numero_pago = models.CharField(max_length=120)
    fpago = models.DateField()
    formapago = models.ForeignKey(FormaPagoGral, on_delete=models.SET_NULL,blank=True,null=True)               
    plansuscripcion = models.ForeignKey(EspecialistasPlanesSuscripcion, on_delete=models.SET_NULL,blank=True,null=True)             
    contrato = models.ForeignKey(EspecialistasContratos, on_delete=models.SET_NULL,blank=True,null=True)          
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)    
         
    class Meta:
        db_table = "especialistas_pagos"    
        ordering = ['fdesde','fhasta','estado','numero_pago','fpago','formapago','plansuscripcion','contrato','especialista']
        

class EspecialistasRubroSaludPagos(models.Model):
    '''
    (18) Tabla con información de formas de pago que recibe un especialista de la salud
    '''
    valor_atencion = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.CharField(max_length=120)
    formapagosalud = models.ForeignKey(FormaPagoSalud, on_delete=models.SET_NULL,blank=True,null=True)               
    prevision = models.ForeignKey(TipoPrevision, on_delete=models.SET_NULL,blank=True,null=True)             
    modatencion = models.ForeignKey(ModalidadAtencion, on_delete=models.SET_NULL,blank=True,null=True)          
    rubro = models.ForeignKey(Rubros,on_delete=models.CASCADE)    
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)   
              
    class Meta:
        db_table = "especialistas_rsaludpagos"    
        ordering = ['valor_atencion','descripcion','formapagosalud','prevision','modatencion','rubro','especialista']    
        

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
    esp_agenda = models.ForeignKey(EspecialistaAgendas,on_delete=models.CASCADE)      
    especialista = models.ForeignKey(UsuariosEspecialistas,on_delete=models.CASCADE)      
         
    class Meta:
        db_table = "especialistas_horasagendadas"       
        ordering = ['fecha','hora','mensaje','usuario','relacionado','esp_agenda','especialista']
        
        