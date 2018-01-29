import json

from django.http import HttpResponse

def raytrace(request):

    if(request.method == "POST"):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

    else:
        return HttpResponse("Method not Allowed", status=405)

    return HttpResponse("Hello World!")