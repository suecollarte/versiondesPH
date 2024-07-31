from django.shortcuts import render, HttpResponse
from .models import Banner

# Create your views here.
def banners(request):
        Primer_banner = Banner.objects.first()
        lista = Banner.objects.all()
        #return HttpResponse(blogs)
        return render(request, 'banners.html',{'banner':lista,'Primer_banner':Primer_banner})
        #return render(request, 'noticiahome.html',{'posts':blogs})

def banner(request, id):
        banner= Banner.objects.get(id=id)
        #content = f'{blog.title} - {blog.des}'
        #return HttpResponse(content)
        return render(request, 'banner.html', {'banner':banner})



