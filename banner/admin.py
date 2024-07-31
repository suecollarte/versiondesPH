from django.contrib import admin

#models
from .models import Banner, Category


# Register your models here.
#admin.site.register(Post)


class CategoryAdmin(admin.ModelAdmin):
    readonly_fields=('created','modifica')

class BannerAdmin(admin.ModelAdmin):
    list_display = ('id','image','title','rubro','creacion')
    list_display_links = ('id','title',)
    list_filter = ('creacion',)
    search_fields =('title','rubro',)
    readonly_fields =('creacion','modifica',)

""" @admin.register(Banner)
@admin.register(Category) """
admin.site.register(Category, CategoryAdmin)
admin.site.register(Banner, BannerAdmin)