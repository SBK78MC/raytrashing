import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from RayTracing.Classes.RayTracer import RayTracer
from RayTracing.Classes.Utils.JSONParser import JSONParser
import matplotlib.pyplot as plt

@csrf_exempt
def raytrace(request):
    response = HttpResponse(content_type="image/png")

    if(request.method == "POST"):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        parser = JSONParser()

        raytracer = parser.deserializeRayTracingTask(body)
        img = raytracer.startRayTracing()

        plt.imsave(response, img)
    else:
        return HttpResponse("Method not Allowed", status=405)

    return response