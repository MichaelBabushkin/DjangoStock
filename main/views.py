from django.shortcuts import render

# Create your views here.
class Views:
    def index(self, request):
        return render(request,'index.html')