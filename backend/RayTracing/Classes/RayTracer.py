import math
import types

import numpy
import matplotlib.pyplot as plt

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Camera import Camera

class RayTracer:

    def __init__(self, imageplane=Imageplane(), mainscene=Scene(), camera=Camera()):
        self.recursionLimit = 1
        self.backgroundColor = Color(0., 0., 0.)

        self.imageplane = imageplane
        self.scene = mainscene
        self.camera = camera
        self.imageAspectRatio = imageplane.width/imageplane.height
        self.img = numpy.zeros((imageplane.getHeight(), imageplane.getWidth(), 3))

    def startRayTracing(self):

        for y in range(0, self.imageplane.getHeight()):
            for x in range(0, self.imageplane.getWidth()):
                px = (2 * ((x + 0.5) / self.imageplane.getWidth()) - 1) * self.camera.angle * self.imageAspectRatio
                py = (1 - 2 * ((y + 0.5) / self.imageplane.getHeight())) * self.camera.angle

                pixelDirection = Vector(px, py, self.camera.pointOfView.getZ())

                pixelRay = Ray(self.camera.position, pixelDirection)

                self.img[y, x] = self.traceRay(pixelRay, 0).getArray()

        return self.img

    def traceRay(self, pixelRay, recursionDepth):

        minDist = -1
        minObjInter = None

        returnColor = self.backgroundColor

        for obj in self.scene.getObjects():
            objIntersection = obj.intersection(pixelRay, 1, math.inf)
            if objIntersection:
                if (minDist < 0 or minDist > objIntersection.getDistance()): #and objIntersection.getComparableLength() > 1e-4:
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
            negativeCameraDirection = intersection.getRay().getDirection().getNegative()
            pointToCenter = intersection.getPoint().sub(intersection.getObject().getCenter())

            pointToCenter = pointToCenter.normalize()

            ptcDotNCD = pointToCenter.dotProduct(cameraDirection)

            reflectionDirection = cameraDirection.sub(pointToCenter.multiply(2 * ptcDotNCD))
            reflectionDirection = reflectionDirection.normalize()

            reflectionRay = Ray(intersection.getPoint(), reflectionDirection)
            reflectedColor = self.traceRay(reflectionRay, recursionDepth + 1)

        return reflectedColor

    def diffuseAndSpecularReflection(self, light, intersection, colorBrightness):
        lightToPoint = light.getPosition().sub(intersection.getPoint())
        pointToCenter = intersection.getPoint().sub(intersection.getObject().getCenter())

        pointToCenter = pointToCenter.normalize()

        ptcDotltp = pointToCenter.dotProduct(lightToPoint)
        if ptcDotltp > 0:
            colorBrightness += light.getBrightness() * ptcDotltp / lightToPoint.calcLength()

        if intersection.getObject().getSpecular() > 0:
            lightReflection = (pointToCenter.multiply(2 * ptcDotltp)).sub(lightToPoint)
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
                isShadow = True

        return isShadow
