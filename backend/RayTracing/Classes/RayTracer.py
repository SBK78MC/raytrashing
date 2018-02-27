import multiprocessing
import time
import numpy
import math


from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Plane import Plane
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Worker import Worker

from multiprocessing.managers import BaseManager


class RayTracer:

    def __init__(self, imageplane=Imageplane(), mainscene=Scene(), camera=Camera()):
        self.recursionLimit = 3
        self.backgroundColor = Color(0., 0., 0.)
        self.imageplane = imageplane
        self.scene = mainscene
        self.camera = camera
        self.imageAspectRatio = imageplane.width/imageplane.height
        self.img = numpy.zeros((imageplane.getHeight(), imageplane.getWidth(), 3))


    def startRayTracing(self):

        final = numpy.zeros((self.imageplane.getHeight(), self.imageplane.getWidth(), 3))

        cpu_count = multiprocessing.cpu_count()

        stepSize = int(self.imageplane.getHeight()/cpu_count)

        processes = []
        managers = []
        workers = []

        for i in range(0, cpu_count):
            manager = BaseManager()
            manager.register('Worker', Worker)
            manager.start()

            managers.append(manager)

            worker = manager.Worker(i*stepSize, (i+1)*stepSize, 0, self.imageplane.getWidth(), self.imageplane.getHeight(), self.imageplane.getWidth())
            workers.append(worker)

            process = multiprocessing.Process(target=self.trace, args=[worker])
            process.start()
            processes.append(process)

        for i in range(0, cpu_count):
            processes[i].join()

        for i in range(0, cpu_count):
            final[i*stepSize:(i+1)*stepSize, :] = workers[i].getImg()

        return final

    def trace(self, worker):
        for y in worker.getYRange():
            for x in worker.getXRange():
                px = (2 * ((x + 0.5) / self.imageplane.getWidth()) - 1) * self.camera.angle * self.imageAspectRatio
                py = (1 - 2 * ((y + 0.5) / self.imageplane.getHeight())) * self.camera.angle

                pixelDirection = Vector(px, py, self.camera.pointOfView.getZ())

                pixelRay = Ray(self.camera.position, pixelDirection)

                worker.setColor(y, x, self.traceRay(pixelRay, 0).getArray())

    def traceRay(self, pixelRay, recursionDepth):

        minDist = -1
        minObjInter = None

        returnColor = self.backgroundColor

        for obj in self.scene.getObjects():
            objIntersection = obj.intersection(pixelRay, 1, math.inf)
            if objIntersection:
                if minDist < 0 or minDist > objIntersection.getDistance():
                    minDist = objIntersection.getDistance()
                    minObjInter = objIntersection

        if minObjInter:
            returnColor = self.getColorForIntersection(minObjInter, recursionDepth)

        return returnColor

    def getColorForIntersection(self, intersection, recursionDepth):

        colorBrightness = 0.0

        for light in self.scene.getLights():
            if type(light) is AmbientLight:
                colorBrightness += light.getBrightness()
            else:
                isShadow = self.getShadows(intersection, light)

                if not isShadow:
                    colorBrightness = self.diffuseAndSpecularReflection(light, intersection, colorBrightness)

        initialColor = intersection.getObject().getColor()
        brightColor = initialColor.multiply(colorBrightness)

        reflectionColor = self.getReflection(intersection, recursionDepth)

        if reflectionColor:
            reflectionColorWithRate = reflectionColor.multiply(intersection.getObject().getReflection())

            brightColorWithInverseRate = brightColor.multiply(1 - intersection.getObject().getReflection())

            finalColor = reflectionColorWithRate.add(brightColorWithInverseRate)

        else:
            finalColor = brightColor

        return finalColor

    def getReflection(self, intersection, recursionDepth):
        reflectedColor = None
        if intersection.getObject().getReflection() > 0 and recursionDepth < self.recursionLimit:
            cameraDirection = intersection.getRay().getDirection()
            surfaceNormal = intersection.getObject().getSurfaceNormal(intersection.getPoint())

            surfNormDotNCD = surfaceNormal.dotProduct(cameraDirection)

            reflectionDirection = cameraDirection.sub(surfaceNormal.multiply(2 * surfNormDotNCD))
            reflectionDirection = reflectionDirection.normalize()

            reflectionRay = Ray(intersection.getPoint(), reflectionDirection)
            reflectedColor = self.traceRay(reflectionRay, recursionDepth + 1)

        return reflectedColor

    def diffuseAndSpecularReflection(self, light, intersection, colorBrightness):
        lightToPoint = light.getPosition().sub(intersection.getPoint())
        surfaceNormal = intersection.getObject().getSurfaceNormal(intersection.getPoint())

        surfNormDotLTP = surfaceNormal.dotProduct(lightToPoint)
        if surfNormDotLTP > 0:
            colorBrightness += light.getBrightness() * surfNormDotLTP / lightToPoint.calcLength()

        if intersection.getObject().getSpecular() > 0:
            lightReflection = (surfaceNormal.multiply(2 * surfNormDotLTP)).sub(lightToPoint)
            negativeCameraDirection = intersection.getRay().getDirection().getNegative()
            lightRDotCamera = lightReflection.dotProduct(negativeCameraDirection)

            if lightRDotCamera > 0:
                lRlength = lightReflection.calcLength()
                negCamlength = negativeCameraDirection.calcLength()
                s = intersection.getObject().getSpecular()
                colorBrightness += light.getBrightness() * pow(lightRDotCamera / (lRlength * negCamlength), s)

        return colorBrightness

    def getShadows(self, intersection, light):
        isShadow = False
        for objectIter in self.scene.getObjects():

            lightToPoint = light.getLightRay(intersection.getPoint().sub(light.getPosition()))

            shadowIntersection = objectIter.intersection(lightToPoint, 0.001, 0.9999)
            if shadowIntersection:
                #print("Found Shadow", shadowIntersection.getObject(), "item ", intersection.getObject())
                isShadow = True

        return isShadow
