import math
import numpy
import matplotlib.pyplot as plt

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

        for x in range(0, self.imageplane.getWidth()):
            for y in range(0, self.imageplane.getHeight()):
                px = (2 * ((x + 0.5) / self.imageplane.getWidth()) - 1) * self.camera.angle * self.imageAspectRatio
                py = (2 * ((y + 0.5) / self.imageplane.getHeight()) - 1) * self.camera.angle

                pixelDirection = Vector(px, py, self.camera.position.getZ() + 1)

                pixelRay = Ray(self.camera.position, pixelDirection)

                for obj in self.scene.getObjects():
                    if obj.intersection(pixelRay):
                        self.img[x, y] = [1, 0, 0]

        return self.img


    def getColorForIntersection(self, intersection):
        return 0


if __name__ == "__main__":

    sCenter = Vector(1, 1, 15)
    s1 = Sphere(sCenter, 1)
    light1 = Light(2, 4, 5, 0.4)

    scene = Scene()
    scene.addLight(light1)
    scene.addObject3D(s1)

    imagepl = Imageplane(500, 500)

    camera = Camera(Vector(0,0,0), Vector(0,0,0), 30)

    raytrace = RayTracer(imagepl, scene, camera)
    raytrace.startRayTracing()
