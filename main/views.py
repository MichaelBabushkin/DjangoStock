from django.shortcuts import render
from .models import Sp500 as sp
import json
from django.http import JsonResponse

# Create your views here.
class Views:
    def index(self, request):
        return render(request,'index.html')

    def stock_data(self, request):
        stats = sp.load_data(self)
        print(stats)

        jsonStr = json.dumps(stats)
        return JsonResponse(jsonStr, safe=False)
