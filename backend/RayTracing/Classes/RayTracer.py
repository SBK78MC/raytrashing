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
    """This is the main class that is used to ray trace a scene and returns the array of the image"""

    def __init__(self, imageplane=Imageplane(), mainscene=Scene(), camera=Camera(), antialiasing=False):
        self.recursionLimit = 3
        self.backgroundColor = Color(0, 0, 0)
        self.imageplane = imageplane
        self.scene = mainscene
        self.camera = camera
        self.imageAspectRatio = imageplane.width/imageplane.height
        self.img = numpy.zeros((imageplane.getHeight(), imageplane.getWidth(), 3))
        self.antialiasing = antialiasing


    def startRayTracing(self):
        """In this function we calculate the number of processes we can use to ray trace an image.
        It creates the necessary number of workers that start the ray tracing and then waits until they finish
        to join their outputs to create the final image"""

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
        """ In this function each worker initiates the ray trace through each pixel, in the case of
        antialiasing we use supersampling and trace 5 rays per pixel"""

        if self.antialiasing:
            samplingdistanceX = 1/self.imageplane.getWidth()
            samplingdistanceY = 1 / self.imageplane.getHeight()

        for y in worker.getYRange():
            for x in worker.getXRange():
                pixelX = 2 * x / self.imageplane.getWidth() - 1
                pixelY = 1 - 2 * y / self.imageplane.getHeight()

                pixelRay = self.camera.getRay(pixelX, pixelY)

                if self.antialiasing:
                    pixelRayAntialiasing0 = self.camera.getRay(pixelX + samplingdistanceX, pixelY + samplingdistanceY)
                    pixelRayAntialiasing1 = self.camera.getRay(pixelX + samplingdistanceX, pixelY - samplingdistanceY)
                    pixelRayAntialiasing2 = self.camera.getRay(pixelX - samplingdistanceX, pixelY + samplingdistanceY)
                    pixelRayAntialiasing3 = self.camera.getRay(pixelX - samplingdistanceX, pixelY - samplingdistanceY)
                    worker.setColorAntialiasing(y, x, self.traceRay(pixelRay, 0), self.traceRay(pixelRayAntialiasing0, 0), self.traceRay(pixelRayAntialiasing1, 0), self.traceRay(pixelRayAntialiasing2, 0), self.traceRay(pixelRayAntialiasing3, 0))
                else:
                    worker.setColor(y, x, self.traceRay(pixelRay, 0).getArray())

    def traceRay(self, pixelRay, recursionDepth):
        """ Calculates if a ray intersects the objects in the scene and returns the closest intersection"""

        minDist = -1
        minObjInter = None

        returnColor = self.backgroundColor

        for obj in self.scene.getObjects():
            objIntersection = obj.intersection(pixelRay, 0.0001, math.inf)
            if objIntersection:
                if (minDist < 0 or minDist > objIntersection.getDistance()) and objIntersection.getObject().getTransparency() < 1:
                    minDist = objIntersection.getDistance()
                    minObjInter = objIntersection

        if minObjInter:
            returnColor = self.getColorForIntersection(minObjInter, recursionDepth)

        return returnColor

    def getColorForIntersection(self, intersection, recursionDepth):
        """ Calculates the color that a point on an object has """

        colorBrightness = 0.0

        """Calculate the brightness that one object receives from the lights in the scene"""
        for light in self.scene.getLights():
            if type(light) is AmbientLight:
                colorBrightness += light.getBrightness()


            else:
                isShadow = self.getShadows(intersection, light)
                """If the point is in shadow and if it is calculates how little light it gets depending on the 
                    transparency of the object that casts the shadow"""
                if isShadow is not None:
                    colorBrightnessFromDiffuse = self.diffuseAndSpecularReflection(light, intersection)
                    colorBrightness += colorBrightnessFromDiffuse * isShadow
                else:
                    colorBrightness += self.diffuseAndSpecularReflection(light, intersection)



        initialColor = intersection.getObject().getColor()
        brightColor = initialColor.multiply(colorBrightness)

        reflectionColor = self.getReflection(intersection, recursionDepth)
        refractionColor = self.getRefraction(intersection, recursionDepth)

        #surfaceNormal = intersection.getObject().getSurfaceNormal(intersection.getPoint())
        #viewDirection = intersection.getRay().getDirection()
        """ Calculate Fresnel to see how much a object reflects or is transparent based on the angle 
         (not used right now since it was hard to combine it with the degree of reflectivity and transparency)"""
        #fresnelEffect = self.getFresnel(viewDirection, surfaceNormal, intersection.getObject().getRefractiveIndex())

        if refractionColor and reflectionColor:
            """If the object is both reflective and transparent(refractive) calculate the color using both values"""

            reflectionColorWithFresnel = reflectionColor.multiply(intersection.getObject().getReflection())
            refractionColorWithFresnel = refractionColor.multiply(intersection.getObject().getTransparency())
            if 1 - intersection.getObject().getTransparency() - intersection.getObject().getReflection() > 0:
                """ If the sum of reflectiveness and transparency is less than one, then add diffusion color"""
                brightColorWithInverseRate = initialColor.multiply(1 - intersection.getObject().getTransparency() - intersection.getObject().getReflection())
                finalColor = (reflectionColorWithFresnel.add(refractionColorWithFresnel).add(brightColorWithInverseRate)).multiply(colorBrightness)

            else:
                """ Else just add the reflected color and the transparent color"""
                finalColor = (reflectionColorWithFresnel.add(refractionColorWithFresnel))

        elif reflectionColor:
            """ In the case that we have only reflection or only transparency, calculate the final color
                        as diffusion color plus reflection/refraction color accordingly"""

            reflectionColorWithRate = reflectionColor.multiply(intersection.getObject().getReflection())
            brightColorWithInverseRate = initialColor.multiply(1 - intersection.getObject().getReflection())
            finalColor = reflectionColorWithRate.add(brightColorWithInverseRate).multiply(colorBrightness)

        elif refractionColor:
            refractionColorWithRate = refractionColor.multiply(intersection.getObject().getTransparency())
            brightColorWithInverseRate = initialColor.multiply(1 - intersection.getObject().getTransparency())
            finalColor = refractionColorWithRate.add(brightColorWithInverseRate).multiply(colorBrightness)

        else:
            finalColor = brightColor

        #finalColor = finalColor.multiply(colorBrightness)

        return finalColor

    def getReflection(self, intersection, recursionDepth):
        """ Cast a new ray to calculate reflections from a point of an object"""
        if intersection.getObject().getReflection() <= 0:
            return None

        reflectedColor = self.backgroundColor
        if intersection.getObject().getReflection() > 0 and recursionDepth < self.recursionLimit:
            originalDirection = intersection.getRay().getDirection()
            surfaceNormal = intersection.getObject().getSurfaceNormal(intersection.getPoint())

            surfNormDotNCD = surfaceNormal.dotProduct(originalDirection)

            reflectionDirection = originalDirection.sub(surfaceNormal.multiply(2 * surfNormDotNCD))
            reflectionDirection = reflectionDirection.normalize()

            reflectionRay = Ray(intersection.getPoint(), reflectionDirection)
            reflectedColor = self.traceRay(reflectionRay, recursionDepth + 1)

        return reflectedColor

    def getRefraction(self, intersection, recursionDepth):
        """ Cast a new ray to calculate refraction from a point of an object """
        if intersection.getObject().getTransparency() <= 0:
            return None

        refractedColor = self.backgroundColor
        if intersection.getObject().getTransparency() > 0 and recursionDepth < self.recursionLimit:
            refractedColor = self.backgroundColor

            originalDirection = intersection.getRay().getDirection()
            surfaceNormal = intersection.getObject().getSurfaceNormal(intersection.getPoint())

            ior = intersection.getObject().getRefractiveIndex()

            cosi = originalDirection.dotProduct(surfaceNormal)
            etai = 1
            etat = ior

            if cosi < -1:
                cosi = -1
            elif cosi > 1:
                cosi = 1

            if cosi >= 0:
                etai = ior
                etat = 1
                surfaceNormal = surfaceNormal.getNegative()
            else:
                cosi = -cosi

            eta = etai / etat

            k = 1 - eta * eta *(1 - cosi * cosi)
            if k < 0:
                return refractedColor
            else:
                refractionDirection = originalDirection.multiply(eta).add(surfaceNormal.multiply(eta * cosi - math.sqrt(k)))
                refractionDirection = refractionDirection.normalize()

                refractionRay = Ray(intersection.getPoint(), refractionDirection)
                refractedColor = self.traceRay(refractionRay, recursionDepth + 1)

        return refractedColor

    def diffuseAndSpecularReflection(self, light, intersection):
        """ Calculate the diffusion color of a certain object based on the angle of the light"""

        lightToPoint = light.getPosition().sub(intersection.getPoint())
        surfaceNormal = intersection.getObject().getSurfaceNormal(intersection.getPoint())

        colorBrightness = 0

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
        """ Locate intersections from a point to the light to locate if an object casts a shadow"""
        isShadow = None
        for objectIter in self.scene.getObjects():
            lightToPoint = light.getLightRay(intersection.getPoint().sub(light.getPosition()))

            shadowIntersection = objectIter.intersection(lightToPoint, 0.001, 0.9999)
            if shadowIntersection and objectIter != intersection.getObject():
                """ Locates the object that intersects the ray that is least transparent"""
                if isShadow is not None:
                    if isShadow > objectIter.getTransparency():
                        isShadow = objectIter.getTransparency()
                else:
                    isShadow = objectIter.getTransparency()

        return isShadow

    def getFresnel(self, viewDirection, surfaceNormal, ior):
        """Calculates the Fresnel effect of a point based on the angle of the ray that hits it and the refractive index
        of the object. """
        cosi = viewDirection.dotProduct(surfaceNormal)
        etai = 1
        etat = ior

        if cosi < -1:
            cosi = -1
        elif cosi > 1:
            cosi =1
        if cosi > 0:
            etai = ior
            etat = 1

        sint = etai / etat * math.sqrt(max(0, 1 - cosi*cosi))

        if sint >= 1:
            kr = 1
        else:
            cost = math.sqrt(max(0,1 - sint*sint))
            cosi = abs(cosi)
            Rs = ((etat * cosi) - (etai * cost)) / ((etat * cosi) + (etai * cost))
            Rp = ((etai * cosi) - (etat * cost)) / ((etai * cosi) + (etat * cost))
            kr = (Rs * Rp + Rp * Rp) / 2

        return kr
