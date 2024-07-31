from django import template
from banner.models import Publicidad

register = template.Library()

@register.simple.tag

def get_publicidad():
    publicidades = Publicidad.objects.all()
    return publicidades