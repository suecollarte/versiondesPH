from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
#orm mapea a la bd relacional

class Post(models.Model):
    image= models.ImageField(verbose_name='Imagen', upload_to='noticias')
    title=models.CharField(max_length=200)
    des =models.TextField(verbose_name='Descripcion')
    content = RichTextField()
    creacion =models.DateTimeField(
        auto_now=True,
        verbose_name ='Fecha creacion'
    ) #captura inmediatamente
    modifica =models.DateTimeField(auto_now=True)


    class Meta:
        verbose_name = "Noticia"
        verbose_name_plural ="Noticias"
        ordering = ['-creacion']


    def __str__(self):
        return self.title