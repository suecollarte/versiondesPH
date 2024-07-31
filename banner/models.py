from django.db import models
from ckeditor.fields import RichTextField
from tablas.models import Rubros
# Create your models here.
#orm mapea a la bd relacional

class Category(models.Model):
    name = models.CharField(max_length=20, verbose_name="Tipo")
    created = models.DateTimeField(
        auto_now=True,
        verbose_name ='Fecha creacion'
    ) #captura inmediatamente
    modifica =models.DateTimeField(auto_now=True)

    class Meta:
            verbose_name= "categoria"
            verbose_name_plural = "categorias"
            ordering= ['created']
    def __str__(self):
        return self.name


class Banner(models.Model):
    image= models.ImageField(verbose_name='Imagen', upload_to='banner')
    title=models.CharField(max_length=200)
    cliente=models.CharField(verbose_name='RUT',max_length=20)
    rubro=models.ForeignKey(Rubros, on_delete=models.SET_NULL, null=True)
    categories = models.ManyToManyField(Category, verbose_name="Categoria")
    estado = models.CharField(max_length=20)
    creacion =models.DateTimeField(
        auto_now=True,
        verbose_name ='Fecha creacion'
    ) #captura inmediatamente
    modifica =models.DateTimeField(auto_now=True)


    class Meta:
        verbose_name = "Banner"
        verbose_name_plural ="Banners"
        ordering = ['-creacion']


    def __str__(self):
        return self.title