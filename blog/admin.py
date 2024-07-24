from django.contrib import admin

#models
from .models import Post

# Register your models here.
#admin.site.register(Post)

@admin.register(Post)

class PostAdmin(admin.ModelAdmin):
    list_display = ('id','image','title','des','creacion')
    list_display_links = ('id','title',)
    list_filter = ('creacion',)
    search_fields =('title','des',)

    readonly_fields =('creacion','modifica',)