import multiprocessing
import time
import numpy


from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Worker import Worker

from multiprocessing.managers import BaseManager


class RayTracer:

    def __init__(self, imageplane=Imageplane(), mainscene=Scene(), camera=Camera()):
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

            worker = manager.Worker(i*stepSize, (i+1)*stepSize, 0, self.imageplane.getWidth(), self.imageplane.getHeight(),self.imageplane.getWidth())
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

                minDist = -1
                minObjInter = None

                for obj in self.scene.getObjects():
                    objIntersection = obj.intersection(pixelRay)
                    if objIntersection:
                        if minDist < 0 or minDist > objIntersection.getDistance():
                            minDist = objIntersection.getDistance()
                            minObjInter = objIntersection

                if minObjInter:
                    worker.setColor(y, x, self.getColorForIntersection(minObjInter))



    def getColorForIntersection(self, intersection):

        colorBrightness = 0.0

        for light in self.scene.getLights():
            if type(light) is AmbientLight:
                colorBrightness += light.getBrightness()
            else:

                isShadow = self.getShadows(intersection, light)

                if not isShadow:
                    colorBrightness = self.diffuseAndSpecularReflection(light, intersection, colorBrightness)


        initialColor = intersection.getObject().getColor().getArray()
        redValue = initialColor[0]*colorBrightness
        if redValue > 1:
            redValue=1
        greenValue = initialColor[1] * colorBrightness
        if greenValue > 1:
            greenValue = 1
        blueValue = initialColor[2] * colorBrightness
        if blueValue > 1:
            blueValue = 1
        finalColor = [redValue, greenValue, blueValue]

        return finalColor

    def getShadows(self, intersection, light):
        isShadow = False
        for objectIter in self.scene.getObjects():
            if objectIter != intersection.getObject():

                lightToPoint = light.getLightRay(intersection.getPoint())
                shadowIntersection = objectIter.intersection(lightToPoint)
                if shadowIntersection:

                    if 0 < shadowIntersection.getComparableLength() <= 1:
                        isShadow = True

        return isShadow

    def diffuseAndSpecularReflection(self, light, intersection, colorBrightness):
        lightToPoint = light.getPosition().sub(intersection.getPoint())
        pointToCenter = intersection.getPoint().sub(intersection.getObject().getCenter())

        pointToCenter = pointToCenter.normalize()

        ptcDotltp = pointToCenter.dotProduct(lightToPoint)
        if ptcDotltp > 0:
            colorBrightness += light.getBrightness() * ptcDotltp / lightToPoint.calcLength()

        if intersection.getObject().getReflection() > 0:
            lightReflection = (pointToCenter.multiply(2 * ptcDotltp)).sub(lightToPoint)
            negativeCameraDirection = intersection.getRay().getDirection().getNegative()
            lightRDotCamera = lightReflection.dotProduct(negativeCameraDirection)

            if lightRDotCamera > 0:
                lRlength = lightReflection.calcLength()
                negCamlength = negativeCameraDirection.calcLength()
                s = intersection.getObject().getReflection()
                colorBrightness += light.getBrightness() * pow(lightRDotCamera / (lRlength * negCamlength), s)

        return colorBrightness
