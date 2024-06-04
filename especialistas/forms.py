#
#   forms.py Especialistas
#
from django import forms
from .models import EspecialistasDocumentos, EspecialistasImagenes
from usuarios.models import UsuariosEspecialistas

class UploadFileForm(forms.ModelForm):
    class Meta:
        model = EspecialistasDocumentos
        fields = ['archivo']

class UploadPhotoForm(forms.ModelForm):
    class Meta:
        model = UsuariosEspecialistas
        fields = ['foto']
        
class UploadImageForm(forms.ModelForm):
    class Meta:
        model = EspecialistasImagenes
        fields = ['imagen']        
        