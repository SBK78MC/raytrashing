import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from RayTracing.Classes.Utils.JSONParser import JSONParser


@csrf_exempt
def raytrace(request):

    if(request.method == "POST"):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        parser = JSONParser()
        raytracer = parser.deserializeRayTracingTask(body)
    else:
        return HttpResponse("Method not Allowed", status=405)

    return HttpResponse("Hello World!")