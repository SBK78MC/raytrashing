import math
import types

import numpy
import matplotlib.pyplot as plt

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Camera import Camera

class RayTracer:

    def __init__(self, imageplane=Imageplane(), mainscene=Scene(), camera=Camera()):
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

                minDist = -1
                minObjInter = None

                for obj in self.scene.getObjects():
                    objIntersection = obj.intersection(pixelRay)
                    if objIntersection:
                        if minDist < 0 or minDist > objIntersection.getDistance():
                            minDist = objIntersection.getDistance()
                            minObjInter = objIntersection

                if minObjInter:
                    self.img[y, x] = self.getColorForIntersection(minObjInter)

        plt.imsave('FirstImages.png', self.img)

    def getColorForIntersection(self, intersection):

        colorBrightness = 0.0

        for light in self.scene.getLights():
            if type(light) is AmbientLight:
                colorBrightness += light.getBrightness()
            else:
                lightToPoint = light.getLightRay(intersection.getPoint())
                pointToCenter = intersection.getPoint().sub(intersection.getObject().getCenter())

                pointToCenter = pointToCenter.normalize()

                ptcDotltp = pointToCenter.dotProduct(lightToPoint)
                if ptcDotltp > 0:
                    colorBrightness += light.getBrightness() * ptcDotltp / lightToPoint.calcLength()

        initialColor = intersection.getObject().getColor().getArray()
        finalColor = [initialColor[0]*colorBrightness, initialColor[1]*colorBrightness, initialColor[2]*colorBrightness]

        return finalColor


if __name__ == "__main__":

    sCenter = Vector(2, 2, 15)
    sCenter1 = Vector(1, 1, 19)

    s1 = Sphere(sCenter, 1, [1.0, 0.0, 0.0])
    s2 = Sphere(sCenter1, 2, [0.0, 1.0, 0.0])
    light1 = Light(2, 15, 20, 0.7)
    light0 = AmbientLight(0.1)

    scene = Scene()
    scene.addLight(light0)
    scene.addLight(light1)
    scene.addObject3D(s1)
    scene.addObject3D(s2)

    imagepl = Imageplane(500, 500)

    camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

    raytrace = RayTracer(imagepl, scene, camera)
    raytrace.startRayTracing()
