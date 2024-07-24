from django.shortcuts import render, HttpResponse
from .models import Post

# Create your views here.
def posts(request):
        Primer_post = Post.objects.first()
        blogs = Post.objects.all()
        #return HttpResponse(blogs)
        return render(request, 'noticias.html',{'posts':blogs,'Primer_post':Primer_post})
        #return render(request, 'noticiahome.html',{'posts':blogs})

def post(request, id):
        blog= Post.objects.get(id=id)
        #content = f'{blog.title} - {blog.des}'
        #return HttpResponse(content)
        return render(request, 'noticia.html', {'post':blog})



