from django.db import models

class Regiones(models.Model):
    '''
    (1) Tabla Normalizada de Regiones
    ''' 
    nombre = models.CharField(max_length=45)
    numero = models.CharField(max_length=4)
    
    class Meta:
        ordering = ['nombre', 'numero']
   
    def __str__(self):
        return (self.nombre)

class Comunas(models.Model):
    '''
    (2) Tabla Normalizada de Comunas
    ''' 
    nombre = models.CharField(max_length=45)
    region = models.ForeignKey(Regiones, on_delete=models.CASCADE)

    class Meta:
        ordering = ['nombre']
        
    def __str__(self):
        return (self.nombre)
    

class Ciudades(models.Model):
    '''
    (3) Tabla Normalizada de Ciudades
    ''' 
    nombre = models.CharField(max_length=45)
    region = models.ForeignKey(Regiones, on_delete=models.CASCADE)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return (self.nombre)
    
    
class Rubros(models.Model):
    '''
    (4) Tabla Normalizada de Rubros de Especialistas
    ''' 
    NO = '0'
    SI = '1'
    AREASALUD_CHOICES = [
        (NO, 'No'),
        (SI, 'Si'),
        ]
    nombre = models.CharField(max_length=45)
    areasalud = models.CharField(max_length=1,choices=AREASALUD_CHOICES)
    
    class Meta:
        ordering = ['nombre', 'areasalud']

    def __str__(self):
        return (self.nombre)   
        
class Categorias(models.Model):
    '''
    (5) Tabla Normalizada de Categorias de Especialistas
    ''' 
    nombre = models.CharField(max_length=45)
    rubro = models.ForeignKey(Rubros, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['nombre']
 
    def __str__(self):
        return (self.nombre)   

        
class SubCategorias(models.Model):
    '''
    (6) Tabla Normalizada de SubCategorias de Especialistas
    '''
    nombre = models.CharField(max_length=45)
    categoria  = models.ForeignKey(Categorias, on_delete=models.CASCADE)
    rubro = models.ForeignKey(Rubros, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return (self.nombre)   

 
class FormaPagoSalud(models.Model):
    '''
    (7) Tabla Normalizada de Formas de Pago a Especialistas Area Salud
    '''
    nombre = models.CharField(max_length=45)
        
    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return (self.nombre)   


class FormaPagoGral(models.Model):
    '''
    (8) Tabla Normalizada de Formas de Pago en General y excluye a Especialistas Area Salud
    '''
    nombre = models.CharField(max_length=45)
        
    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return (self.nombre)   

        
class TipoPrevision(models.Model):
    '''
    (9) Tabla Normalizada de Tipos de Prevision
    '''
    nombre = models.CharField(max_length=45)
            
    class Meta:
        ordering = ['nombre']
        

class ModalidadAtencion(models.Model):
    '''
    (10) Tabla Normalizada de Modalidades de Atención
    '''
    nombre = models.CharField(max_length=45)
        
    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return (self.nombre)   


class EstadosPromociones:
    TERMINADA = '0'
    VIGENTE = '1'
    ESTADOS_PROMOCIONES = [
        (TERMINADA, 'Terminada'),
        (VIGENTE, 'Vigente'),
        ]

class Promociones(models.Model):
    '''
    (11) Tabla Normalizada de Promociones
    '''
    nombre = models.CharField(max_length=45)
    fdesde = models.DateField()    
    fhasta = models.DateField()
    pclave = models.CharField(max_length=45)
    dcto_porcentaje = models.DecimalField(max_digits=10, decimal_places=2)
    dcto_cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=1,choices=EstadosPromociones.ESTADOS_PROMOCIONES,default=EstadosPromociones.VIGENTE)                
                    
    class Meta:
        ordering = ['nombre','fdesde','fhasta','pclave','dcto_porcentaje','dcto_cantidad']
        
    def __str__(self):
        return (self.nombre)   


class EstadosPlanes:
    TERMINADO = '0'
    VIGENTE = '1'
    ESTADOS_PLANES = [
        (TERMINADO, 'Terminado'),
        (VIGENTE, 'Vigente'),
        ]

class PeriodicidadPlanes:
    TRIMESTRAL = 0
    SEMESTRAL = 1
    ANUAL = 2
    PERIODICIDAD_PLANES = [
        (TRIMESTRAL, 'Trimestral'),
        (SEMESTRAL, 'Semestral'),
        (ANUAL, 'Anual'),
        ]
    MESES_PLANES = [
        (TRIMESTRAL, 3),
        (SEMESTRAL, 6),
        (ANUAL, 12),
        ]

class Planes(models.Model):
    '''
    (16) Tabla de registro planes ofrecidos a especialistas.
    '''  
    fdesde = models.DateField()
    fhasta = models.DateField()    
    nombre = models.CharField(max_length=45)
    estado = models.CharField(max_length=1,choices=EstadosPlanes.ESTADOS_PLANES)                
    periodicidad = models.CharField(max_length=1,choices=PeriodicidadPlanes.PERIODICIDAD_PLANES)
    valor = models.DecimalField(max_digits=8, decimal_places=2,blank=True,null=True)           
             
    class Meta:
        db_table = "tablas_planes"       
        ordering = ['fdesde','fhasta','nombre','estado','periodicidad','valor']
        
        